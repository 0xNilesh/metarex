// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./AuctionManager.sol";
import "./SolverRegistry.sol";
import "./libraries/DataTypes.sol";

contract SwapExecutor is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    mapping(uint256 => DataTypes.Order) public orders;
    uint256 public nextOrderId;
    uint256 public protocolFeePercent;
    uint256 public constant MAX_FEE = 50; // Max 0.5% fee
    
    SolverRegistry public solverRegistry;
    AuctionManager public auctionManager;
    
    event OrderCreated(
        uint256 indexed orderId,
        address indexed creator,
        address sourceToken,
        uint256 sourceAmount,
        address targetToken,
        uint256 minTargetAmount
    );
    
    event OrderExecuted(
        uint256 indexed orderId,
        address indexed executor,
        uint256 sourceAmount,
        uint256 targetAmount,
        uint256 fee
    );

    constructor(address _solverRegistry, uint256 _protocolFeePercent, uint256 _auctionDuration) Ownable(msg.sender) {
        require(_protocolFeePercent <= MAX_FEE, "Fee too high");
        solverRegistry = SolverRegistry(_solverRegistry);
        auctionManager = new AuctionManager(msg.sender, _auctionDuration);
        protocolFeePercent = _protocolFeePercent;
    }

    function createOrder(
        address sourceToken,
        uint256 sourceAmount,
        address targetToken,
        uint256 minTargetAmount
    ) external whenNotPaused returns (uint256) {
        require(sourceAmount > 0, "Invalid amount");
        
        IERC20(sourceToken).safeTransferFrom(msg.sender, address(this), sourceAmount);
        
        uint256 orderId = nextOrderId++;
        
        orders[orderId] = DataTypes.Order({
            creator: msg.sender,
            sourceToken: sourceToken,
            sourceAmount: sourceAmount,
            targetToken: targetToken,
            minTargetAmount: minTargetAmount,
            executed: false
        });

        auctionManager.createAuction(orderId);

        emit OrderCreated(
            orderId,
            msg.sender,
            sourceToken,
            sourceAmount,
            targetToken,
            minTargetAmount
        );

        return orderId;
    }

    function executeOrder(
        uint256 orderId,
        uint256 bidAmount,
        bytes[] calldata callData,
        address[] calldata targets
    ) external nonReentrant whenNotPaused {
        DataTypes.Order storage order = orders[orderId];
        (, address winner, bytes memory strategy, bool finalized, ) = auctionManager.auctions(orderId);
        
        require(!order.executed, "Order already executed");
        require(finalized, "auction not finalized");
        require(msg.sender == winner, "Not winner");
        require(bidAmount >= order.minTargetAmount, "Below min amount");
        require(targets.length == callData.length, "Length mismatch");
        (,,bool isActive) = solverRegistry.solvers(msg.sender);
        require(isActive, "Not registered solver");

        // Verify the execution strategy matches the winning strategy
        bytes memory executionStrategy = abi.encode(msg.sender, targets, callData, bidAmount);
        require(keccak256(executionStrategy) == keccak256(strategy), "Invalid strategy");

        uint256 targetBalanceBefore = IERC20(order.targetToken).balanceOf(address(this));

        // Execute swaps
        for(uint256 i = 0; i < targets.length; i++) {
            (bool success, ) = targets[i].call(callData[i]);
            require(success, "Execution failed");
        }

        // Verify execution results
        uint256 targetBalanceAfter = IERC20(order.targetToken).balanceOf(address(this));
        require(targetBalanceAfter - targetBalanceBefore >= bidAmount, "Insufficient output");

        order.executed = true;

        // Transfer fee (total - 0.5%, 0.15% to protocol, 0.35% to solver)
        uint256 fee = (targetBalanceAfter * protocolFeePercent) / 10000;
        IERC20(order.targetToken).safeTransfer(order.creator, targetBalanceAfter - fee);
        IERC20(order.targetToken).safeTransfer(msg.sender, fee * 7000 / 10000);

        emit OrderExecuted(
            orderId,
            msg.sender,
            order.sourceAmount,
            targetBalanceAfter - fee,
            fee
        );
    }

    function setProtocolFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_FEE, "Fee too high");
        protocolFeePercent = _newFee;
    }

    function emergencyWithdraw(
        address token,
        address to,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).safeTransfer(to, amount);
    }
}
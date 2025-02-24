// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SolverRegistry is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Solver {
        address solverAddress;
        uint256 deposit;
        bool isActive;
    }

    mapping(address => Solver) public solvers;
    uint256 public minDeposit;
    
    event SolverRegistered(address indexed solver, uint256 deposit);
    event SolverDeregistered(address indexed solver, uint256 deposit);
    event MinDepositUpdated(uint256 oldDeposit, uint256 newDeposit);

    constructor(uint256 _minDeposit) Ownable(msg.sender) {
        minDeposit = _minDeposit;
    }

    function registerSolver() external payable whenNotPaused {
        require(msg.value >= minDeposit, "Insufficient deposit");
        require(!solvers[msg.sender].isActive, "Solver already registered");

        solvers[msg.sender] = Solver({
            solverAddress: msg.sender,
            deposit: msg.value,
            isActive: true
        });

        emit SolverRegistered(msg.sender, msg.value);
    }

    function deregisterSolver() external nonReentrant {
        require(solvers[msg.sender].isActive, "Solver not registered");
        uint256 deposit = solvers[msg.sender].deposit;
        solvers[msg.sender].isActive = false;
        
        (bool success, ) = payable(msg.sender).call{value: deposit}("");
        require(success, "Transfer failed");

        emit SolverDeregistered(msg.sender, deposit);
    }

    function updateMinDeposit(uint256 _newDeposit) external onlyOwner {
        uint256 oldDeposit = minDeposit;
        minDeposit = _newDeposit;
        emit MinDepositUpdated(oldDeposit, _newDeposit);
    }
}
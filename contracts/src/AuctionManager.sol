// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/DataTypes.sol";

contract AuctionManager is Ownable {
    address public swapExecutor;
    mapping(uint256 => DataTypes.Auction) public auctions;
    uint256 auctionDuration;

    event AuctionCreated(uint256 indexed orderId);
    event AuctionFinalized(
        uint256 indexed orderId, 
        address indexed winner,
        bytes strategy
    );

    constructor(address _swapExecutor, uint256 _auctionDuration) Ownable(msg.sender) {
        swapExecutor = _swapExecutor;
        auctionDuration = _auctionDuration;
    }

    function createAuction(uint256 orderId) public {
        require(msg.sender == swapExecutor, "Unauthorized");
        require(!auctions[orderId].finalized, "Auction exists");

        auctions[orderId] = DataTypes.Auction({
            orderId: orderId,
            winner: address(0),
            strategy: "",
            finalized: false,
            endTime: block.timestamp + auctionDuration
        });

        emit AuctionCreated(orderId);
    }

    function finalizeAuction(
        uint256 orderId,
        address winner,
        bytes calldata strategy
    ) external onlyOwner {
        DataTypes.Auction storage auction = auctions[orderId];
        require(!auction.finalized, "Already finalized");
        require(block.timestamp >= auction.endTime, "Auction not ended");
        
        auction.winner = winner;
        auction.strategy = strategy;
        auction.finalized = true;

        emit AuctionFinalized(orderId, winner, strategy);
    }

    function setAuctionDuration(uint256 _newAuctionDuration) external onlyOwner {
        auctionDuration = _newAuctionDuration;
    }

    function setSwapExecutor(address _newSwapExecutor) external onlyOwner {
        swapExecutor = _newSwapExecutor;
    }
}
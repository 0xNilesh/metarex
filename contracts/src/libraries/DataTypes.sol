// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library DataTypes {
    struct Solver {
        address solverAddress;
        uint256 deposit;
        bool isActive;
    }

    struct Order {
        address creator;
        address sourceToken;
        uint256 sourceAmount;
        address targetToken;
        uint256 minTargetAmount;
        // uint256 deadline;
        bool executed;
    }

    struct Auction {
        uint256 orderId;
        address winner;
        bytes strategy;
        bool finalized;
        uint256 endTime;
    }
}
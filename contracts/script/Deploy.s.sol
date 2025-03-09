// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SolverRegistry} from "../src/SolverRegistry.sol";
import {SwapExecutor} from "../src/SwapExecutor.sol";
import {AuctionManager} from "../src/AuctionManager.sol";

contract DeployScript is Script {
    SolverRegistry public solverRegistry;
    SwapExecutor public swapExecutor;
    AuctionManager public auctionManager;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy SolverRegistry with minDeposit of 0.01 ether
        solverRegistry = new SolverRegistry(0.1 ether);
        console.log("SolverRegistry deployed at:", address(solverRegistry));

        // protocol fee percent set to 0.5% (50 bps), and auction duration of 1 minute (60 seconds)
        auctionManager = new AuctionManager(address(solverRegistry), 60);

        // Deploy SwapExecutor with the deployed SolverRegistry address,
        swapExecutor = new SwapExecutor(address(solverRegistry), address(auctionManager), 50);
        console.log("SwapExecutor deployed at:", address(swapExecutor));

        vm.stopBroadcast();
    }
}

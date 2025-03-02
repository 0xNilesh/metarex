// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SolverRegistry} from "../src/SolverRegistry.sol";
import {SwapExecutor} from "../src/SwapExecutor.sol";

contract DeployScript is Script {
    SolverRegistry public solverRegistry;
    SwapExecutor public swapExecutor;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy SolverRegistry with minDeposit of 0.01 ether
        solverRegistry = new SolverRegistry(0.01 ether);
        console.log("SolverRegistry deployed at:", address(solverRegistry));

        // Deploy SwapExecutor with the deployed SolverRegistry address,
        // protocol fee percent set to 0.5% (50 bps), and auction duration of 1 minute (60 seconds)
        swapExecutor = new SwapExecutor(address(solverRegistry), 50, 60);
        console.log("SwapExecutor deployed at:", address(swapExecutor));

        vm.stopBroadcast();
    }
}

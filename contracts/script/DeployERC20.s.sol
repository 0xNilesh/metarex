// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TempERC20} from "../src/TempERC20.sol";

contract DeployScript is Script {
    TempERC20 public tempErc20;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        tempErc20 = new TempERC20();
        console.log("TempERC20 deployed at:", address(tempErc20));

        vm.stopBroadcast();
    }
}

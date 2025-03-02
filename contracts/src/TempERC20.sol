// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TempERC20 is ERC20 {
    constructor() ERC20("TempToken", "TEMP") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}
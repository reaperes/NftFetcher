// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract TestCoin is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Test coin", "TEST") {
        mint(msg.sender, 100000000e18);
    }
}

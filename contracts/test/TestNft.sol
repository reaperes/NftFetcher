// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract TestNft is ERC721PresetMinterPauserAutoId {
    constructor() ERC721PresetMinterPauserAutoId("TestNft", "TEST", "") {
    }
}

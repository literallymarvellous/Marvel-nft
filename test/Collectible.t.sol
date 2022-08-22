// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "../contracts/Collectible.sol";

contract CollectibleTest is Collectible {
    constructor() Collectible(msg.sender) {}

    function echidna_test_mint() public view returns (bool) {
        return totalSupply() <= 100;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

/**
 * @title Marvels NFT
 * @author Ahiara Ikechukwu Marvellous
 * @notice A 100 NFT token that can be collected by anyone
 */

import "solmate/src/tokens/ERC721.sol";
import "solmate/src/auth/Owned.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Collectible is ERC721, Owned {
    using Strings for uint8;
    uint8 private constant _maxSupply = 100;
    uint256 private constant MINT_PRICE = 0.01 ether;

    uint8 private _counter;

    constructor(address _owner)
        ERC721("Marvels NFT", "MARVELS")
        Owned(_owner)
    {}

    function _baseURI() internal view returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function totalSupply() public view returns (uint8) {
        return _counter;
    }

    function mint() external payable {
        require(_counter < _maxSupply, "No more tokens to mint");
        require(msg.value == 0.01 ether, "Require 0.01 ether to mint");

        uint8 id = _counter++;

        _mint(msg.sender, id);
    }

    function mint(uint8 _amount) external payable {
        require(_counter < _maxSupply, "No more tokens to mint");
        require(msg.value == 0.01 ether, "Require 0.01 ether to mint");

        for (uint8 i = 0; i < _amount; i++) {
            uint8 id = _counter++;

            _mint(msg.sender, id);
        }
    }

    function tokenURI(uint8 tokenId) public view returns (string memory) {
        return
            string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }
}

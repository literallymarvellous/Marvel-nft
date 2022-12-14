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
    using Strings for uint256;
    uint8 private constant _maxSupply = 100;
    uint256 private constant MINT_PRICE = 0.01 ether;

    uint8 private _counter;

    modifier notMaxSupply() {
        require(_counter < _maxSupply, "No more tokens to mint");
        _;
    }

    modifier correctFee(uint256 quantity) {
        require(quantity * MINT_PRICE == msg.value, "Fee is incorrect");
        _;
    }

    constructor(address _owner) ERC721("Marvels", "MARV") Owned(_owner) {}

    function _baseURI() internal pure returns (string memory) {
        return
            "https://bafybeibhqislilo36kh2bhepzilr44hgfzpkngnf2x3tbuhopg4qb3fuha.ipfs.dweb.link/metadata/";
    }

    function totalSupply() public view returns (uint8) {
        return _counter;
    }

    function mint()
        external
        payable
        notMaxSupply
        correctFee(1)
        returns (uint8)
    {
        uint8 id = _counter++;
        _mint(msg.sender, id);
        return id;
    }

    function mint(uint256 _quantity)
        external
        payable
        notMaxSupply
        correctFee(_quantity)
        returns (uint256[] memory)
    {
        uint256[] memory ids = new uint256[](_quantity);

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 id = _counter++;

            _mint(msg.sender, id);
            ids[i] = id;
        }

        return ids;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        return string(abi.encodePacked(_baseURI(), tokenId.toString()));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "withdrawal failed");
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract NftFetcher {
    bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE = type(IERC721Enumerable).interfaceId;

    function getTokenIdsOf(address erc721Enumerable, address owner, uint256 offset, uint256 limit) public view returns (uint256[] memory) {
        require(owner != address(0), "Fetcher: query for zero address");

        IERC721Enumerable token = IERC721Enumerable(erc721Enumerable);
        require(token.supportsInterface(_INTERFACE_ID_ERC721_ENUMERABLE), "Fetcher: token does not support ERC721Enumerable");

        uint256[] memory results;

        uint256 balance = token.balanceOf(owner);

        if (balance <= offset || balance == 0) {
            return results;
        }

        uint256 resultsCount = _resultCount(balance, offset, limit);
        results = new uint256[](resultsCount);

        for (uint256 index=0; index<resultsCount; index++) {
            uint256 tokenId = token.tokenOfOwnerByIndex(owner, index + offset);
            results[index] = tokenId;
        }

        return results;
    }

    function _resultCount(uint256 max, uint256 offset, uint256 limit) private pure returns (uint256) {
        uint256 resultsCount;

        if (limit == 0) {
            resultsCount = max - offset;
        } else {
            resultsCount = Math.min(max - offset, limit);
        }

        return resultsCount;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;
    mapping(string => string) public ipfsUrls;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function register(string calldata name) public {
        require(domains[name] == address(0));
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setIpfsUrl(string calldata name, string calldata ipfsUrl) public {
        require(domains[name] == msg.sender);
        ipfsUrls[name] = ipfsUrl;
    }

    function getIpfsUrl(string calldata name) public view returns (string memory){
        return ipfsUrls[name];
    }
}

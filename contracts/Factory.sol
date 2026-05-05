// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Property.sol";

contract Factory {
    address[] public properties;

    function createProperty(address usdc) external {
        Property p = new Property(msg.sender, usdc);
        properties.push(address(p));
    }

    function getProperties() external view returns (address[] memory) {
        return properties;
    }
}
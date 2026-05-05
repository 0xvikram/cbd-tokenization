// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Property {
    address public admin;
    IERC20 public usdc;

    uint public totalContribution;
    uint public totalProfit;

    mapping(address => uint) public contributions;
    address[] public investors;

    constructor(address _admin, address _usdc) {
        admin = _admin;
        usdc = IERC20(_usdc);
    }

    // -------------------------------
    // STEP 1: Users deposit USDC
    // -------------------------------
    function deposit(uint amount) external {
        require(amount > 0, "Invalid amount");

        // Transfer USDC from user to contract
        usdc.transferFrom(msg.sender, address(this), amount);

        // Add new investor if first time
        if (contributions[msg.sender] == 0) {
            investors.push(msg.sender);
        }

        contributions[msg.sender] += amount;
        totalContribution += amount;
    }

    // -------------------------------
    // STEP 2: Admin deposits profit
    // -------------------------------
    function depositProfit(uint amount) external {
        require(msg.sender == admin, "Not admin");
        require(amount > 0, "Invalid amount");

        usdc.transferFrom(msg.sender, address(this), amount);

        totalProfit += amount;
    }

    // -------------------------------
    // STEP 3: Distribute ONLY profit
    // -------------------------------
    function distribute() external {
        require(msg.sender == admin, "Not admin");
        require(totalProfit > 0, "No profit to distribute");

        uint profit = totalProfit;

        // Reset profit BEFORE loop (important safety)
        totalProfit = 0;

        for (uint i = 0; i < investors.length; i++) {
            address user = investors[i];
            uint userContribution = contributions[user];

            if (userContribution > 0) {
                uint share = (profit * userContribution) / totalContribution;

                if (share > 0) {
                    usdc.transfer(user, share);
                }
            }
        }
    }

    // -------------------------------
    // View helpers (for UI/demo)
    // -------------------------------
    function getInvestors() external view returns (address[] memory) {
        return investors;
    }
}
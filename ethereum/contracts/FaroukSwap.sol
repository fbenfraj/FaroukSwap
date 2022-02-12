// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FaroukCoin.sol";

contract FaroukSwap {
    IERC20 public contractReserve;
    // 1 ETH = 100 FRKC
    uint256 public conversionRate = 100;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        contractReserve = new FaroukCoin();
    }

    function buy() public payable {
        uint256 amountToBuy = msg.value;
        uint256 dexBalance = contractReserve.balanceOf(address(this));
        require(amountToBuy > 0, "You need to send some ether.");
        require(amountToBuy <= dexBalance, "Not enough tokens in the reserve.");
        contractReserve.transfer(
            msg.sender,
            amountToBuy * conversionRate
        );
        emit Bought(amountToBuy * conversionRate);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens.");
        uint256 allowance = contractReserve.allowance(
            msg.sender,
            address(this)
        );
        require(allowance >= amount, "Check the token allowance.");
        contractReserve.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }
}

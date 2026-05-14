// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract GigDrop {
    uint256 public constant JOB_POST_FEE = 0.00001 ether;
    uint256 public totalJobsPosted;
    address public owner;

    event JobPosted(address indexed poster, uint256 fee);
    event Withdrawn(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function createJobPost() external payable {
        require(msg.value >= JOB_POST_FEE, "Must send exactly 0.00001 ETH");
        totalJobsPosted++;
        emit JobPosted(msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner");
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
        emit Withdrawn(owner, balance);
    }

    receive() external payable {}
}

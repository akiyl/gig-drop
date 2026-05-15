// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract GigDrop {
    uint256 public constant JOB_POST_FEE = 0.00001 ether;
    uint256 public totalJobsPosted;
    address public owner;

    struct Escrow {
        address client;
        address freelancer;
        uint256 amount;
        bool released;
        bool refunded;
    }

    mapping(bytes32 => Escrow) public escrows;

    event JobPosted(address indexed poster, uint256 fee);
    event EscrowDeposited(bytes32 indexed jobId, address indexed client, address indexed freelancer, uint256 amount);
    event PaymentReleased(bytes32 indexed jobId, address indexed client, address indexed freelancer, uint256 amount);
    event EscrowRefunded(bytes32 indexed jobId, address indexed client, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function createJobPost() external payable {
        require(msg.value >= JOB_POST_FEE, "Must send at least 0.00001 ETH");
        totalJobsPosted++;
        emit JobPosted(msg.sender, msg.value);
    }

    function depositEscrow(bytes32 jobId, address freelancer) external payable {
        require(msg.value > 0, "Must send ETH");
        require(escrows[jobId].client == address(0), "Escrow already exists for this job");
        require(freelancer != address(0), "Invalid freelancer address");

        escrows[jobId] = Escrow({
            client: msg.sender,
            freelancer: freelancer,
            amount: msg.value,
            released: false,
            refunded: false
        });

        emit EscrowDeposited(jobId, msg.sender, freelancer, msg.value);
    }

    function releasePayment(bytes32 jobId) external {
        Escrow storage escrow = escrows[jobId];
        require(escrow.client == msg.sender, "Only client can release");
        require(!escrow.released, "Already released");
        require(!escrow.refunded, "Already refunded");

        escrow.released = true;
        uint256 amount = escrow.amount;
        (bool sent, ) = payable(escrow.freelancer).call{value: amount}("");
        require(sent, "Failed to send ETH");

        emit PaymentReleased(jobId, escrow.client, escrow.freelancer, amount);
    }

    function refundEscrow(bytes32 jobId) external {
        Escrow storage escrow = escrows[jobId];
        require(escrow.client == msg.sender, "Only client can refund");
        require(!escrow.released, "Already released");
        require(!escrow.refunded, "Already refunded");

        escrow.refunded = true;
        uint256 amount = escrow.amount;
        (bool sent, ) = payable(escrow.client).call{value: amount}("");
        require(sent, "Failed to refund ETH");

        emit EscrowRefunded(jobId, escrow.client, amount);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner");
        uint256 balance = address(this).balance;
        (bool sent, ) = payable(owner).call{value: balance}("");
        require(sent, "Failed to withdraw ETH");
        emit Withdrawn(owner, balance);
    }

    receive() external payable {}
}

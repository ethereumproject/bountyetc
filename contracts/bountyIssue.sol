pragma solidity ^0.4.11;

contract BountyIssue {
    struct Donation {
        uint amount;
        uint timestamp;
    }

    mapping(address => Donation) donations;

    struct Claim {
        uint amount;
        uint timestamp;
    }

    mapping(address => Claim) claims;

    string issueUrl;

    function BountyIssue(string url) {
        issueUrl = url;
    }

    function getIssueUrl() returns(string) {
        return issueUrl;
    }

    function donate() payable {
        donations[msg.sender].amount += msg.value;
        donations[msg.sender].timestamp = block.timestamp;
    }

    function getMyDonations() returns(uint) {
        return donations[msg.sender].amount;
    }

    function claim() {
        claims[msg.sender].timestamp = block.timestamp;
    }

    function approveClaim(address recipientAddress, uint amount) {
        if (donations[msg.sender].amount < amount) {
            throw;
        }
        donations[msg.sender].amount -= amount;
        claims[recipientAddress].amount += amount;
    }

    function withdrawClaim() {
        var amount = claims[msg.sender].amount;
        claims[msg.sender].amount = 0;
        msg.sender.transfer(amount);
    }
}

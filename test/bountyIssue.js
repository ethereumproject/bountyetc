'use strict';

var BountyIssue = artifacts.require('./bountyIssue.sol');

var issueUrl = 'https://github.com/ethereumproject/bountyetc/issues/1';

contract('BountyIssue', accounts => {
  var bounty;

  beforeEach(() => {
    return BountyIssue.new(issueUrl).then(instance => {
      bounty = instance;
    });
  });

  it('should allow us to set and get the issue URL', () => {
    return bounty.getIssueUrl.call()
      .then(instanceIssueUrl => {
        assert.equal(instanceIssueUrl, issueUrl);
      });
  });

  it('should allow us to post a bounty', () => {
    return bounty.donate({from: accounts[0], value: 100})
      .then(() => {
        return bounty.getMyDonations.call();
      }).then(amount => {
        assert.equal(amount, 100);
      });
  });

  it('should allow us to submit a claim, approve it, and withdraw it', () => {
    return bounty.donate({from: accounts[0], value: 100})
      .then(() => {
        return bounty.claim({from: accounts[1]});
      }).then(() => {
        return bounty.approveClaim.call(accounts[1], 100, {from: accounts[0]});
      }) .then(() => {
        return bounty.withdrawClaim({from: accounts[1]});
      });
  });

  // it should not allow us to approve a claim beyond what we've donated

});

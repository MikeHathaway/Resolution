const ReviewCoin = artifacts.require("./ReviewCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ReviewCoin, "Review Coin", "RDAO", 18)
    // .then(call minterrole contract)
};


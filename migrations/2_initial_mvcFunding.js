//var kcc = artifacts.require("./KccToken.sol");
//var mvc = artifacts.require("./MoveCrowd.sol");
var mvcfunding = artifacts.require("./MvcFunding.sol");

//var owner = "0xf1aB0355bF07C5F91f008f705F3581b8AE2a7b54";

module.exports = function(deployer) {
//  deployer.deploy(kcc,200000,owner)
//           .then(function() {
 //              return deployer.deploy(mvc,20000,"TaiTan",owner,kcc.address);  
 //          });
    deployer.deploy(mvcfunding,30);
};

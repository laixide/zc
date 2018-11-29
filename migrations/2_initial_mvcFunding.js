//var kcc = artifacts.require("./KccToken.sol");
//var mvc = artifacts.require("./MoveCrowd.sol");
var mvcfunding = artifacts.require("./MvcFunding.sol");

var owner = "0x75e054e44be8a09678789d794cd8afd3b084463c";

module.exports = function(deployer) {
//  deployer.deploy(kcc,200000,owner)
//           .then(function() {
 //              return deployer.deploy(mvc,20000,"TaiTan",owner,kcc.address);  
 //          });
    deployer.deploy(mvcfunding,1000,100,{from: owner});
};

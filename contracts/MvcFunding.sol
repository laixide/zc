pragma solidity ^0.4.24;

import "./kccToken.sol";
import "./MoveCrowd.sol";

contract MvcFunding {
    KccToken kcc;
    MoveCrowd mc;

    address public owner;

    constructor (uint endTime) public {
        owner = msg.sender;
        kcc = new KccToken(200000,msg.sender);
        mc = new MoveCrowd(10000,"TaiTan",msg.sender, kcc, endTime);

    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function getAddr() public view returns(address _kcc, address _mc) {
        return (address(kcc), address(mc));
    }

    function setAddr(address kccAddr, address mcAddr) public onlyOwner {
        kcc = KccToken(kccAddr);
        mc = MoveCrowd(mcAddr);
    }
}

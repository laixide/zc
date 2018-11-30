pragma solidity ^0.4.24;

import "./math/SafeMath.sol";
import "./kccToken.sol";

contract MoveCrowd {
    using SafeMath for uint256;

    string public name = "mvc";
    string public desc;

    KccToken token;

    bool public isFinished = false;//是否结束
    uint public startTime;//开始时间
    uint public endTime;//结束时间

    uint public mvcPrice = 100;//mvc份额价格

    address public owner;

    uint public totalCrowd = 0;//已众筹数量
    uint public totalSupply = 0;//总众筹数量

    struct CrowdFundingInfo {
        address addr;
        uint amount;
        uint crowdTime;
    }

    uint userCount = 0;
    CrowdFundingInfo[1000] info;

    mapping(address => uint) userId;

    event AirDrop(address to, uint value, uint id);

    constructor(uint _totalSupply, string _desc, address _owner, KccToken _token, uint _endTime) public {
        totalSupply = _totalSupply;
        owner = _owner;
        desc = _desc;

        token = _token;

        startTime = now;
        endTime = now + _endTime.mul(1 days);

        userId[owner] = userCount++;
        info[0].addr = owner;
        info[0].amount = totalSupply * 10 / 100;
        info[0].crowdTime = now;
        totalCrowd = info[0].amount;
    }
    //空投mvc份额
    function airDrop(address to, uint value) external returns (bool) {
        require(msg.sender == owner, "Only owner can be oprator");
        return _drop(to, value);
    }
    //使用kcctoken购买份额
    function buyMvc(uint value) external returns (bool) {
        require(!isFinished, "the crowd is ended");

        if(now >= endTime) {
            isFinished = true;
            revert("the crowd is ended");
        }


        uint number = value.div(mvcPrice);
        require(number > 0);
        require(token.transferToOwner(msg.sender, value));

        return _drop(msg.sender, number);
    }
    //份额空投
    function _drop(address to, uint value) private returns (bool) {

        require(to != address(0));
        require(totalCrowd + value <= totalSupply);

        uint id;
        if(userId[to] > 0 && userId[to] < userCount) {
            id = userId[to];
            info[id].amount = info[id].amount.add(value);
            info[id].crowdTime = now;
        } else {
            id = userCount++;
            userId[to] = id;
            info[id].amount = info[id].amount.add(value);
            info[id].addr = to;
            info[id].crowdTime = now;
        }
        totalCrowd.add(value);
        if( totalCrowd == totalSupply) {
            isFinished = true;
        }
        require( userCount <= 1000);
        emit AirDrop(to, value, id);

        return true;

    }
    //个人众筹信息
    function crowdInfo(address who) external view returns (uint amount, uint crowdTime) {
        uint id = userId[who];
        if(id == 0 && who != owner){
            return (0,0);
	}
        amount = info[id].amount;
        crowdTime = info[id].crowdTime;
        return (amount, crowdTime);
    }
    //购买电影票
    function ticketBooking() payable public {
        require( msg.value > 0);

        for(uint i = 0; i < info.length; i++) {
            info[i].addr.transfer( msg.value.mul(info[i].amount).div(totalSupply));
        }
    }
    //设置mvc价格
    function setMvcPrice(uint value) external returns(bool) {
        require(msg.sender == owner);
        mvcPrice = value;
        return true;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

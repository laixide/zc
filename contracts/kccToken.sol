pragma solidity^0.4.24;

import "./IERC20.sol";
import "./math/SafeMath.sol";

contract KccToken is IERC20 {
    
    using SafeMath for uint256;

    string public name = "kcc";
    string public symbol = "kcctoken";
    uint256 public price = 1000;
    uint256 public number = 10 ** 18;

    address manager;

    uint256 private _totalSupply;
    uint256 dropTotalSupply;

    mapping(address => uint256) _balances;

    mapping(address => mapping(address => uint256)) _allowed;
    
    event BuyToken(address indexed from, uint256 eth, uint256 buyNumber);

    constructor(uint totalSupply, address _manager) public {
        manager = _manager;
        _totalSupply = totalSupply;
        
        _balances[manager] = totalSupply.mul(20).div(100);
        dropTotalSupply = _balances[manager];
    }

    function totalSupply() external view returns(uint256) {
        return _totalSupply;
    }

    function balanceOf(address who) external view returns(uint256) {
        return _balances[who];
    }

    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowed[owner][spender];
    }

    function transfer(address to, uint value) external returns(bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address spender, uint value) external returns (bool) {
        require(_allowed[from][spender] >= value);
        
        _allowed[from][spender] = _allowed[from][spender].sub(value);
        _transfer(from, spender, value);

        return true;
    }

    function _transfer(address from, address to, uint value) internal {
        require(_balances[from] >= value);
        require(to != address(0));

        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);

        emit Transfer(from, to, value);
    }

    function approve(address spender, uint256 value) external returns (bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = value;
        
        emit Approval(msg.sender, spender, value);

        return true;
    }

    function increaseAllowance(address spender, uint256 value) external returns (bool) {
        require(spender != address(0));
        
        _allowed[msg.sender][spender] = _allowed[msg.sender][spender].add(value);
        
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }
    function decreaseAllowance(address spender, uint256 value) external returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = _allowed[msg.sender][spender].sub(value);
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    function _drop(address to, uint256 value) private returns(bool) {
        //require(msg.sender == manager, "Only manager can be oprator");
        require(to != address(0), "address can not be empty");
        require(dropTotalSupply + value <= _totalSupply, "sended end");

        dropTotalSupply = dropTotalSupply.add(value);
        _balances[to] = _balances[to].add(value);
        return true;

    }
    //购买kccToken 价格: 1 ether = 1000 kcc
    function buyKcc() external payable returns(bool) {
        require(msg.value >= 0,"Eth must be equal or greater than 0");
        uint value = msg.value.div(number.div(price));

        _drop(msg.sender, value);
        emit BuyToken(msg.sender, msg.value, value);
    }
    //给管理员发送token
    function transferToOwner(address from, uint value) public returns(bool) {
        _transfer(from, manager, value);
        return true;
    }
    
    function setPrice(uint value) external {
        price = value;
    }

}

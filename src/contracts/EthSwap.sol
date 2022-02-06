pragma solidity ^0.5.0;

import "./Token.sol";


contract EthSwap {
    //state var (in etherium blockchain)
    string public name = "EthSwap Instant Exchange";
    // make variable from Token smartcontract
    Token public token;
    uint public rate = 100;

    event tokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );


    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        //Redemption rate = #of tokens they receive for 1 ether
        //Amount of Etherium*Redemption rate
        //Calc number of tokens to buy
        uint tokenAmount = msg.value * rate;
        //msg - global var inside solidity , sender - address who call that function
        token.transfer(msg.sender, tokenAmount);

        //Emit an event
        emit tokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

}


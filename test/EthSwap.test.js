// import contracts
const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


//configure chai lib
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap', ([deployer, investor]) => {
    let token
    let ethSwap

    function tokens(n) {
        return web3.utils.toWei(n, 'ether');
    }

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        // Transfer all tokens to EthSwap (1 million)
        await token.transfer(ethSwap.address, tokens('1000000'))
    })
    describe('Token deployement', async () => {
        it('contract has a name ', async () => {
            const name = await token.name()
            assert.equal(name, 'DApp Token')
        })
    })
    describe('EthSwap deployement', async () => {
        it('contract has a name', async () => {
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })
        it('Contract has tokens', async () => {

            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async () => {
        //Purches tokens before each example
        let result
        before(async () => {
            result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
        })

        it('Allows users to instantly purches tokens for ethSwap for a fixed price', async () => {
            //check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))


            //Check ethSwap balance after purchase
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))
            //chekc balance in Etherium
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))


        })

    })

})
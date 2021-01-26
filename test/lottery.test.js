const Lottery = artifacts.require("Lottery");

contract("Lottery", ([owner, player1, player2, player3]) => {
    let lottery;

    before(async () => {
        lottery = await Lottery.deployed();
    })

    describe("Testing Lottery functions", async () => {
        it("Test contract owner", async () => {
            const _owner = await lottery.owner.call();
            assert.equal(_owner, owner);
        })

        it("Deposit to contract", async () => {
            await lottery.deposit({
                from: player1,
                value: 2e+18
            });
            await lottery.deposit({
                from: player2,
                value: 1e+18
            });
            await lottery.deposit({
                from: player3,
                value: 3e+18
            });
            balance = await web3.eth.getBalance(lottery.address)
            assert.equal(balance, 6e+18);
        });

        it("Pick Winner", async () => {
            await lottery.pickWinner();
            balance = await web3.eth.getBalance(lottery.address)
            assert.equal(balance, 0);
        });
    });
});
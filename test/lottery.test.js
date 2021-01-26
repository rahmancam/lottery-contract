const Lottery = artifacts.require("Lottery");

contract("Lottery", ([owner, player1, player2]) => {
    let lottery;

    before(async () => {
        lottery = await Lottery.deployed();
    })

    describe("Testing Lottery functions", async () => {
        it("Test contract owner", async () => {
            const _owner = await lottery.owner.call();
            assert.equal(_owner, owner);
        })

        it("Generate random number", async () => {
            const random_number = Number.parseInt(await lottery.generateRandomNumber());
            assert.isNumber(random_number);
        })

        it("Deposit to contract", async () => {
            await lottery.deposit({
                from: player1,
                value: 1e+18
            });
            balance = await web3.eth.getBalance(lottery.address)
            assert.equal(balance, 1e+18);
        })
    });
});
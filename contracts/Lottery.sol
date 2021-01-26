// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address public owner;
    address payable[] public players;

    constructor() public {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function deposit() public payable {
        require(msg.value >= 1 ether);
        players.push(msg.sender);
    }

    function generateRandomNumber() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        players.length
                    )
                )
            );
    }

    function pickWinner() public isOwner {
        uint256 randomNumber = generateRandomNumber();
        uint256 index = randomNumber % players.length;

        address payable winner = players[index];
        winner.transfer(address(this).balance); // transfer contract amount to winner

        players = new address payable[](0); // reset
    }
}

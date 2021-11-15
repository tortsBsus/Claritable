// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AlienPoll {

    uint totalWaves;
    uint face;
    uint ship;
    uint256 private seed;

    event VoteMessage(address indexed from, uint256 timestamp, string message, string X);

    struct Mess {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
        string who;//which side this message was sent from(ship ->0 or face -> 1)
    }

    Mess[] messes;

    mapping(address => uint256) public lastWavedAt;
    constructor() payable{
        console.log("Ayo! this is my smart contract ~~~~");
        seed = (block.timestamp + block.difficulty) % 100;
    }
       
    function getTotalWaves() public view returns (uint)
    {
        console.log("%d entities have waved at me!", totalWaves);
        return totalWaves;
    }
    function faceInc(string memory _message) public {
         
        require(lastWavedAt[msg.sender] + 120 seconds < block.timestamp, "Must wait 2 mins before voting again.");
        lastWavedAt[msg.sender] = block.timestamp;
        face += 1;
        totalWaves += 1;
        console.log("\nAlien face all the way! %s is face gang!", msg.sender);
        messes.push(Mess(msg.sender, _message, block.timestamp,"Alien face"));
        emit VoteMessage(msg.sender, block.timestamp, _message, "Alien face");

    }    
    function getFaceCount() public view returns (uint)
    {
        console.log("%d entities have chosen face!", face);
        return face;
    }
    function shipInc(string memory _message) public {

        require(lastWavedAt[msg.sender] + 120 seconds < block.timestamp, "Must wait 2 mins before voting again.");
        lastWavedAt[msg.sender] = block.timestamp;
        ship += 1;
        totalWaves += 1;
        console.log("\nAlien ship all the way! %s is ship gang!", msg.sender);
        messes.push(Mess(msg.sender, _message, block.timestamp,"Alien ship"));
        emit VoteMessage(msg.sender, block.timestamp, _message, "Alien ship");
    }    

    function bonus() public{
         seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

        uint256 prizeAmount = 0.0001 ether;
        require(
                    prizeAmount <= address(this).balance,
                    "Trying to withdraw more money than the contract has."
                );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }
    }

    function getAllMess() public view returns (Mess[] memory) {
        return messes;
    }
}
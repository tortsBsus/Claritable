// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Claritable {

    uint256 private seed;

    address payable GirlCharityAddress; 
    address payable UkraineCharityAddress;
    address payable EducationCharityAddress;

    struct GirlChildSponsors{
        address who_address;
        uint don_amount;
    }

    struct UkraineSponsors{
        
        address who_address;
        uint don_amount;
    }

    struct EducationSponsors{
        
        address who_address;
        uint don_amount;
    }
    
    
    EducationSponsors [] spon1;
    GirlChildSponsors [] spon2;
    UkraineSponsors [] spon3;
    

    constructor() payable{
        console.log("Smart Contract created");
        GirlCharityAddress = payable(0xDadAE8A1A200Fd9D6797E6b0B96ee35f40ad5ed5);
        UkraineCharityAddress = payable(0xd0750ace4F221dEa3B3523508a3Cb83C474d13c5);//account 1
        EducationCharityAddress = payable(0x1892D4A3cCE85DD4eaa269B052eFbFebd45BeC43);//account2

    }

    function donate(uint charID, uint amt, address add) payable public
    {
        if(charID == 0){
            console.log("You have sponsored Education");
            EducationCharityAddress.transfer(msg.value);
        }
        else if(charID == 1){
            console.log("You have sponsored Girl Empowerment");
            GirlCharityAddress.transfer(msg.value);
        }
        else {
            console.log("You have sponsored Ukraine");
            UkraineCharityAddress.transfer(msg.value);
        }
        console.log("Your donation is registered");
               
    }

   
}
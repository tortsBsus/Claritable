// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

import "hardhat/console.sol";

contract Claritable {


    //Stores the wallet address of different charities
    address payable private GirlChildCharityAddress; 
    address payable private UkraineCharityAddress;
    address payable private EducationCharityAddress;

    //Maps a donor to the amount they donated to a charity
    mapping(address => uint) public GirlChildDonors;
    mapping(address => uint) public UkraineDonors;
    mapping(address => uint) public EducationDonors;
    
    //maps a request to the donor whose donation satisfied the request
    mapping(address => Request[]) public GirlChildSpends;
    mapping(address => Request[]) public UkraineSpends;
    mapping(address => Request[]) public EducationSpends;

    //defines the structure of a request
    struct Request{
        string reason;
        uint amount_spent;
    }

    //gives the total number of donatons available for a Charity
    uint private totalDonationsGirlChild;
    uint private totalDonationsUkraine;
    uint private totalDonationsEducation;

    //stores the address of the donors of a charity whose donations have not been used yet
    address [] AvailableDonorsGirlChild;
    address [] AvailableDonorsUkraine;
    address [] AvailableDonorsEducation;

    event Donation(address donor, uint amount, string CharityName);
    event Spend(string reason, uint amount, address selected_donor, string CharityName);

    
    constructor() payable{
        console.log("Smart Contract created");

        //initializing the addresses of the charities
        GirlChildCharityAddress = payable(0x150A7908abF2738fA5162e1DF032dA041a2481ca);//address of WomenEmpowermentCharity
        UkraineCharityAddress = payable(0xedECC2e46f822c10e6c53996DEEfa8FC70F0a1de);//address of UkraineCharity
        EducationCharityAddress = payable(0x632746282E9387134F113cE217e39C844acdaCA4);//address of EducationCharity
       
       //initializing the number of donors as 0
        totalDonationsGirlChild = 0;
        totalDonationsUkraine = 0;
        totalDonationsEducation = 0;

    }











    //                                << DONATE FUNCTIONS >>

    //Donate to Education
    function donateEducation() public payable
    {        
       //emiting a event makes a log of it on the Blockchain
        emit Donation(msg.sender,msg.value,"Education");

        //checks if current donor has donated before
        //if new donor, add to list of donors
        //else donor already exists on Education Charity's list of donors
        if(EducationDonors[msg.sender]==0){ AvailableDonorsEducation.push(msg.sender);}

        //update the total amount available to charity with new donation received
        totalDonationsEducation +=msg.value;

        //update the amount donated by the individual donor
        EducationDonors[msg.sender] +=msg.value;        

                
    }
     
    //Donate to Ukraine
    function donateUkraine() public payable
    {
         //emiting a event makes a log of it on the Blockchain
        emit Donation(msg.sender,msg.value,"Ukraine");

        //checks if current donor has donated before
        //if new donor, add to list of donors
        //else donor already exists on Ukraine Charity's list of donors
        if(UkraineDonors[msg.sender]==0){ AvailableDonorsUkraine.push(msg.sender);}

        //update the total amount available to charity with new donation received
        totalDonationsUkraine +=msg.value;

        //update the amount donated by the individual donor
        UkraineDonors[msg.sender] +=msg.value; 
    }

    //Donate to GirlChild
    function donateGirlChild() public payable
    {
        //emiting a event makes a log of it on the Blockchain
        emit Donation(msg.sender,msg.value,"Girl Child");

        //checks if current donor has donated before
        //if new donor, add to list of donors
        //else donor already exists on GirlChild Charity's list of donors
        if(GirlChildDonors[msg.sender]==0){ AvailableDonorsGirlChild.push(msg.sender);}

        //update the total amount available to charity with new donation received
        totalDonationsGirlChild +=msg.value;

        //update the amount donated by the individual donor
        GirlChildDonors[msg.sender] +=msg.value;        
    }










    //                                << WITHDRAW FUNCTIONS >>
    
    function EducationRecords(string memory _reason, uint amount, address selected_donor) internal
    {
        emit Spend(_reason, amount,selected_donor,"Education");
        Request memory newRequest = Request({
                                                reason:_reason,
                                                amount_spent:amount
                                                    });
        EducationSpends[selected_donor].push(newRequest); //record of the amount dispensed with reason
        totalDonationsEducation -= amount; //update the sum available in reserve
        EducationDonors[selected_donor]-=amount; //update the amount left from a particular donor's donation
        
    }

     function UkraineRecords(string memory _reason, uint amount, address selected_donor) internal
    {
        emit Spend(_reason, amount,selected_donor,"Ukraine");
        Request memory newRequest = Request({
                                                reason:_reason,
                                                amount_spent:amount
                                                    });
        UkraineSpends[selected_donor].push(newRequest); //record of the amount dispensed with reason
        totalDonationsUkraine -= amount; //update the sum available in reserve
        UkraineDonors[selected_donor]-=amount; //update the amount left from a particular donor's donation
        
    }

    function GirlChildRecords(string memory _reason, uint amount, address selected_donor) internal
    {
        emit Spend(_reason, amount,selected_donor,"GirlChild");
        Request memory newRequest = Request({
                                                reason:_reason,
                                                amount_spent:amount
                                                    });
        GirlChildSpends[selected_donor].push(newRequest); //record of the amount dispensed with reason
        totalDonationsGirlChild -= amount; //update the sum available in reserve
        GirlChildDonors[selected_donor]-=amount; //update the amount left from a particular donor's donation
        
    }






    //functions for charity to request funds
    function spendEducation(string memory _reason, uint amount) public
    {
        require(amount < totalDonationsEducation, "Not enough funds!");
        uint donated = 0;
        while(donated<amount)
        {
            address donor = AvailableDonorsEducation[AvailableDonorsEducation.length-1];//store address of most recent donor
            AvailableDonorsEducation.pop();//remove most recent donor from array
            uint canDonate = EducationDonors[donor];//amount the donor under consideration has donated
            uint reqd = (amount-donated); //amount still has to be raised
            if(canDonate>reqd)
            {
                donated+= reqd;
                AvailableDonorsEducation.push(donor);//still a candidate
                EducationCharityAddress.transfer(reqd);
                EducationRecords(_reason, reqd, donor);
            }
            else 
            {
                donated+=canDonate;                
                EducationCharityAddress.transfer(canDonate);
                EducationRecords(_reason, canDonate, donor);
            }
        }
        console.log("You spent %d on %s!", amount,_reason);       
    }
    
    function spendUkraine(string memory _reason, uint amount) public
    {
        require(amount < totalDonationsUkraine, "Not enough funds!");
        uint donated = 0;
        while(donated<amount)
        {
            address donor = AvailableDonorsUkraine[AvailableDonorsUkraine.length-1];//store address of most recent donor
            AvailableDonorsUkraine.pop();//remove most recent donor from array
            uint canDonate = UkraineDonors[donor];//amount the donor under consideration has donated
            uint reqd = (amount-donated); //amount still has to be raised
            if(canDonate>reqd)
            {
                donated+= reqd;
                AvailableDonorsUkraine.push(donor);//still a candidate
                UkraineCharityAddress.transfer(reqd);
                UkraineRecords(_reason, reqd, donor);
            }
            else 
            {
                donated+=canDonate;                
                UkraineCharityAddress.transfer(canDonate);
                UkraineRecords(_reason, canDonate, donor);
            }
        }
        console.log("You spent %d on %s!", amount,_reason);       
    }


    function spendGirlChild(string memory _reason, uint amount) public
    {
        require(amount < totalDonationsGirlChild, "Not enough funds!");
        uint donated = 0;
        while(donated<amount)
        {
            address donor = AvailableDonorsGirlChild[AvailableDonorsGirlChild.length-1];//store address of most recent donor
            AvailableDonorsGirlChild.pop();//remove most recent donor from array
            uint canDonate = GirlChildDonors[donor];//amount the donor under consideration has donated
            uint reqd = (amount-donated); //amount still has to be raised
            if(canDonate>reqd)
            {
                donated+= reqd;
                AvailableDonorsGirlChild.push(donor);//still a candidate
                GirlChildCharityAddress.transfer(reqd);
                GirlChildRecords(_reason, reqd, donor);
            }
            else 
            {
                donated+=canDonate;                
                GirlChildCharityAddress.transfer(canDonate);
                GirlChildRecords(_reason, canDonate, donor);
            }
        }
        console.log("You spent %d on %s!", amount,_reason);       
    }










    //view is a function that only reads the value of a contract variable
    //pure functions do not alter the variables of contract as well. They also do not read from the contract. 
    //they perform calculations using the parameters passed to them. example add 2 numbers



    //                                << GET FUNCTIONS >>


    //get Charity Addresses
    function getEducationCharityAddress() public view returns(address payable) 
    {
        return EducationCharityAddress;
    }

    function getUkraineCharityAddress() public view returns(address payable)
    {
        return UkraineCharityAddress;
    }
    function getGirlChildCharityAddress() public view returns(address payable)
    {
        return GirlChildCharityAddress;
    }


    //get the totalDonations
    function getTotalDonationsEducation() public view returns(uint)
    {
        return totalDonationsEducation;
    }
    function getTotalDonationsUkraine() public view returns(uint)
    {
        return totalDonationsUkraine;
    }
    function getTotalDonationsGirlChild() public view returns(uint)
    {
        return totalDonationsGirlChild;
    }

    //To display Available donors and their addresses
    function getNumberOfAvailableDonorsEducation() public view returns(uint) 
    {
       return AvailableDonorsEducation.length;
    }

    function getAvailableDonorsEducation(uint position) public view returns(address) 
    {
       return AvailableDonorsEducation[position];
    }


     function getNumberOfAvailableDonorsUkraine() public view returns(uint) 
    {
       return AvailableDonorsUkraine.length;
    }

    function getAvailableDonorsUkraine(uint position) public view returns(address) 
    {
       return AvailableDonorsUkraine[position];
    }


     function getNumberOfAvailableDonorsGirlChild() public view returns(uint) 
    {
       return AvailableDonorsGirlChild.length;
    }

    function getAvailableDonorsGirlChild(uint position) public view returns(address) 
    {
       return AvailableDonorsGirlChild[position];
    }

    //check value of CharityDonors
    function getEducationDonors(address donor) public view returns(uint) 
    {
       return EducationDonors[donor];
    }

     function getUkraineDonors(address donor) public view returns(uint) 
    {
       return UkraineDonors[donor];
    }

     function getGirlChildDonors(address donor) public view returns(uint) 
    {
       return GirlChildDonors[donor];
    }

    //display Spends Data Structure
    function getNumberOfEducationSpendRequest(address donor) public view returns (uint)
    {
        return  EducationSpends[donor].length;
    }

    function getEducationSpendRequestReason(address donor, uint position) public view returns (string memory)
    {
        return EducationSpends[donor][position].reason;
    }

    function getEducationSpendRequestAmountSpent(address donor, uint position) public view returns (uint)
    {
        return EducationSpends[donor][position].amount_spent;
    }




     function getNumberOfUkraineSpendRequest(address donor) public view returns (uint)
    {
        return  UkraineSpends[donor].length;
    }

    function getUkraineSpendRequestReason(address donor, uint position) public view returns (string memory)
    {
        return UkraineSpends[donor][position].reason;
    }

    function getUkraineSpendRequestAmountSpent(address donor, uint position) public view returns (uint)
    {
        return UkraineSpends[donor][position].amount_spent;
    }



     function getNumberOfGirlChildSpendRequest(address donor) public view returns (uint)
    {
        return  GirlChildSpends[donor].length;
    }

    function getGirlChildSpendRequestReason(address donor, uint position) public view returns (string memory)
    {
        return GirlChildSpends[donor][position].reason;
    }

    function getGirlChildSpendRequestAmountSpent(address donor, uint position) public view returns (uint)
    {
        return GirlChildSpends[donor][position].amount_spent;
    }


}
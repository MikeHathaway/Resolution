pragma solidity ^0.5.7;

//https://github.com/porobov/charities-accepting-ether
contract Charities {

	address owner;

	struct Donation {
		address[] confirmedCharities;
	}
	
	constructor() public {
		owner = msg.sender;	
	}

	modifier onlyOwner {
		require(msg.sender == owner);	
		_;
	}

	function getCharities() public returns (memory) {
		return Donation;
	}

	/**
		* Add a new charity to the list of approved charities for withdrawal 
	   	* @param charity Wallet address of charity to add 
 		* @return address of created charity 
	*/
	function addCharity(address charity) onlyOwner returns (address) {
		return charity;	
	}
}

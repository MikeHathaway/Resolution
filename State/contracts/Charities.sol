pragma solidity ^0.5.7;

contract Charities {

	address owner;
	address[] confirmedCharities;
	
	struct Charity {
		address charityAddress;
		string charityName;
	}
	
	// TODO: add support for Charity struct to provide additional information on the address for compliance
	mapping (address => bool) public Charities;

	constructor() public {
		owner = msg.sender;	
	}

	modifier onlyOwner {
		require(msg.sender == owner);	
		_;
	}

	function getCharities() public view returns (address[] memory) {
		return confirmedCharities;
	}

	function isListed(address charityAddress) public view returns (bool) {
		return (Charities[charityAddress]);	
	}

	/**
		* Add a new charity to the list of approved charities for withdrawal 
	   	* @param charity Wallet address of charity to add 
 		* @return address of created charity 
	*/
	function addCharity(address charity) public onlyOwner returns (address) {
		Charities[charity] = true;
		//confirmedCharities.push(charity);
		return charity;	
	}

	function removeCharity(address charity) public onlyOwner returns (address) {
		Charities[charity] = false;
		return charity;
	}
}

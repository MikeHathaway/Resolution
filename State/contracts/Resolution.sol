pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/payment/escrow/ConditionalEscrow.sol";

contract Resolution is ConditionalEscrow {
	
	address payable resolutionEscrow;

	struct Resolution {
		string resolutionName;
		string resolutionId;
		address resolutionCreator;
		uint256 resolutionValue;
		uint256 duration;
		address payable resolutionEscrow;
		address validator;
		address payable donationTarget;	
		bool initialized;		
		bool usesValidator;

		// allow a given resolutionCreator to have many resolutionIds
		string[] resolutionIds;

		// TODO add multi participant Resolutions
		// address[] participants;	
		//mapping(uint256 => address) participants;
	}

	mapping(address => Resolution) private resolutions;

	event ResolutionCreated(string resolutionName, address resolutionCreator, string resolutionId, uint256 resolutionValue);
	event RejectCreate(address callingAccount, string uuid, string message);

	event WithdrawalFailed(address callingAccount, string resolutionId, string message);	

	event Burn(uint256 _goal, address indexed donationTarget);

	constructor(address payable _resolutionEscrow) public {
		ConditionalEscrow(msg.sender);

		resolutionEscrow = _resolutionEscrow;
	}

	function shouldCreate(string memory resolutionId) private returns (bool) {
    	if(resolutions[resolutionId].initialized) {
        	emit RejectCreate(msg.sender, resolutionId, "Resolution with this resolutionId already exists.");
        	return false;
      	}

		// Prevent creations greater than predefined limit
		if(msg.value > 1 ether){
        	emit RejectCreate(msg.sender, resolutionId, "Wagered amount too large");
			return false;
		}

		return true;
	}

	/**
		* Create a new Resolution
	   	* @param resolutionName Name of Resolution 
		* @param resolutionId UUID 
	   	* @param validator address who vouches for Resolution
		* @param donationTarget address who receives escrowed funds in the event of failure
 		* @return resolutionId UUID 
	*/

	function createResolution(string memory resolutionName, string memory resolutionId, address validator, address payable donationTarget, bool usesValidator) public payable returns (string memory) {
		require(shouldCreate(resolutionId));

		deposit(resolutionEscrow);	
	
		resolutions[resolutionId] = Resolution(resolutionName, resolutionId, msg.sender, msg.value, resolutionEscrow, validator, donationTarget, true, usesValidator);
	
		emit ResolutionCreated(resolutionName, resolutionId, msg.value);
		return resolutionId;
	}




	// https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3
	function isSigned(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) pure private returns (bool) {
		return ecrecover(msgHash, v, r, s) == _addr;
	}

	// TODO: Check to see if validator signed off && time period has elapsed
	// overrides withdrawalAllowed function in conditionalEscrow
	function withdrawalAllowed(address withdrawee) public view returns (bool) {
		if(msg.sender == ResolutionCreator) {
		// check input address to see that address's Resolutions block number has elapsed
			if(block.number <= resolutions[withdrawee].duration) {
				return false;
			}
			return true;
		}
		return false;	
	}

	// Use Escrow methods to return funds to depositor on request
	function completeResolution(string memory resolutionId, address payable withdrawalTarget, address validator) public returns (address, address) {
		require(withdrawalAllowed(msg.sender));
		require(resolutions[resolutionId].initialized == true);
		// require(isSigned(msg.sender, msgHash, v, r, s));	

		if(resolutions[resolutionId].usesValidator == true) {
			// require(isSigned());		
		}

		// each participant needs to call completeResolution seperately
		// seperately trigger withdraw 
		withdraw(withdrawalTarget);
		resolutions[resolutionId].initialized == false;
	
		return (withdrawalTarget, validator);
	}





	function shouldBurn(string memory resolutionId) private returns (bool) {
		// Resolution already burned or completed
    	if(!resolutions[resolutionId].initialized) {
        	return false;
      	}

		return true;	
	}

	/**
		* if validator does not sign message verifying conditions are met
		* send contract value to specified contract
	   	* @param donationTarget Charity address which will receive the wageredAmount 
		* @param wageredAmount amount staked on Resolution creation 
 		* @return bool
	*/
	// 
	function burnValue(string memory resolutionId, address payable donationTarget, uint256 wageredAmount) public returns (bool) {
		require(shouldBurn(resolutionId));		
		// log burn to blockchain for display to clients (TODO: Parameterize event fields)
		emit Burn(wageredAmount, donationTarget);	
	
		resolutions[resolutionId].initialized == false;
		// send to donation target
		return donationTarget.send(wageredAmount);
	}

	// fallback function to return sent eth back to sender minus gas
	function () external payable {
		msg.sender.call.value(msg.value)("");
	} 
}

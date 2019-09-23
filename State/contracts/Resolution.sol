pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/payment/escrow/ConditionalEscrow.sol";

contract Resolution is ConditionalEscrow {
	
	address payable resolutionEscrow;

	struct Resolution {
		string resolutionName;
		uint256 value;
		uint256 duration;
		address payable donationTarget;	
		bool initialized;		
		bool usesValidator;

		// allow a creator to have multiple resolutions with or without validators
		mapping(string => address) validator; // resolutionId => validatorAddress
	}
	
	// resolutionCreator => resolutionId => Resolution
	mapping(address => mapping(string => Resolution)) private resolutions; 

	event ResolutionCreated(string resolutionName, address resolutionCreator, string resolutionId, uint256 resolutionValue);
	event RejectCreate(address callingAccount, string uuid, string message);

	event WithdrawalFailed(address callingAccount, string resolutionId, string message);	

	event Burn(uint256 _goal, address indexed donationTarget);

	constructor(address payable _resolutionEscrow) public {
		ConditionalEscrow(msg.sender);

		resolutionEscrow = _resolutionEscrow;
	}

	function shouldCreate(address resolutionCreator, string memory resolutionId) private returns (bool) {
		if(resolutions[resolutionCreator][resolutionId].initialized) {
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
		* @param donationTarget address who receives escrowed funds in the event of failure
		* @param usesValidator  boolean to check if a validatable resolution is being created
 		* @return resolutionId UUID 
	*/

	function createResolution(string memory resolutionName, string memory resolutionId,  uint256 duration, address payable donationTarget, bool usesValidator, address validator) public payable returns (string memory) {
		require(shouldCreate(msg.sender, resolutionId));

		// validated resolution
		if(usesValidator){ 
			resolutions[msg.sender][resolutionId] = Resolution(resolutionName, msg.value, duration, donationTarget, true, true);

			deposit(resolutionEscrow);	

			emit ResolutionCreated(resolutionName, msg.sender, resolutionId, msg.value);
			return resolutionId;
		}
		
		// self signed resolution
		resolutions[msg.sender][resolutionId] = Resolution(resolutionName, msg.value, duration, donationTarget, true, false);
	
		deposit(resolutionEscrow);	

		emit ResolutionCreated(resolutionName, msg.sender, resolutionId, msg.value);
		return resolutionId;
	}




	// https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3
	function isSigned(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) pure private returns (bool) {
		return ecrecover(msgHash, v, r, s) == _addr;
	}

	// TODO: Check to see if validator signed off && time period has elapsed
	// overrides withdrawalAllowed function in conditionalEscrow
	function withdrawalAllowed(address withdrawee) public view returns (bool) {
		//if(msg.sender == ResolutionCreator) {
		// check input address to see that address's Resolutions block number has elapsed
		//	if(now < resolutions[withdrawee].duration) {
		//		return false;
		//	}
		//	return true;
		//}
		//return false;	
		return true;
	}

	/**
		* Use Escrow methods to return funds to depositor on request
	   	* @param resolutionId Id of resolution being burned 
	   	* @param withdrawalTarget address which will receive the wageredAmount 
 		* @return bool
	*/
	function completeResolution(string memory resolutionId, address payable withdrawalTarget) public returns (address) {
		require(withdrawalAllowed(msg.sender));
		require(resolutions[msg.sender][resolutionId].initialized == true);

		if(resolutions[msg.sender][resolutionId].usesValidator == true) {
			// require(isSigned(validator, msgHash, v, r, s));	
		}

		withdraw(withdrawalTarget);
		resolutions[msg.sender][resolutionId].initialized == false;
		return (withdrawalTarget);
	}





	function shouldBurn(address resolutionCreator, string memory resolutionId) private returns (bool) {
		// Resolution already burned or completed
		if(!resolutions[resolutionCreator][resolutionId].initialized) {
			return false;
		}

		if(now < resolutions[resolutionCreator][resolutionId].duration) {
			return false;
		}

		return true;	
	}

	/**
		* if amounts haven't been withdrawn by set date, make method callable for burning 
	   	* @param resolutionId Id of resolution being burned 
	   	* @param donationTarget Charity address which will receive the wageredAmount 
		* @param resolutionCreator owner address of resolution being burned 
 		* @return bool
	*/
	function burnResolution(string memory resolutionId, address payable donationTarget, address resolutionCreator) public returns (bool) {
		require(shouldBurn(resolutionCreator, resolutionId));		
		// log burn to blockchain for display to clients (TODO: Parameterize event fields)
		emit Burn(resolutions[resolutionCreator][resolutionId].value, donationTarget);	
	
		resolutions[resolutionCreator][resolutionId].initialized == false;

		// TODO: account for gas
		// send to donation target
		return donationTarget.send(resolutions[resolutionCreator][resolutionId].value);
	}



	// fallback function to return sent eth back to sender minus gas
	function () external payable {
		msg.sender.call.value(msg.value)("");
	} 
}

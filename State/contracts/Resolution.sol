pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/payment/escrow/ConditionalEscrow.sol";

// https://medium.freecodecamp.org/create-an-ethereum-token-using-open-source-contracts-open-zeppelin-1e132e6233ed
// https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2
// https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events

contract Resolution is ConditionalEscrow {
	
	address public maintainer;	

	struct Resolution {
		string resolutionName;
		string resolutionId;
		uint256 resolutionValue;
		address payable resolutionEscrow;
		address validator;
		address payable donationTarget;	
		bool initialized;		
		
		// TODO add multi participant Resolutions
		// address[] participants;	
		//mapping(uint256 => address) participants;
	}

	mapping(string => Resolution) private resolutions;
	bytes32[] public resolutionIndex;

	event ResolutionCreated(string resolutionName, string resolutionId, uint256 resolutionValue);
	event RejectCreate(address callingAccount, string uuid, string message);

	event WithdrawalFailed(address callingAccount, string resolutionId, string message);	

	event Burn(uint256 _goal, address indexed donationTarget);

	constructor() public {
		ConditionalEscrow(msg.sender);
	}





	function participantsOf(uint256 resolutionId) public view returns (address) {
		// return resolutions[resolutionId].participants;
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
	   	* @param resolutionEscrow address holding the resolutionFund
	   	* @param validator address who vouches for Resolution
		* @param donationTarget address who receives escrowed funds in the event of failure
 		* @return void 
	*/
	function createResolution(string memory resolutionName, string memory resolutionId, address payable resolutionEscrow, address validator, address payable donationTarget) public payable {
		require(shouldCreate(resolutionId));

		deposit(resolutionEscrow);	
	
		resolutions[resolutionId] = Resolution(resolutionName, resolutionId, msg.value, resolutionEscrow, validator, donationTarget, true);
	
		emit ResolutionCreated(resolutionName, resolutionId, msg.value);
	}




	//https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3
	function isSigned(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) private returns (bool) {
		return ecrecover(msgHash, v, r, s) == _addr;
	}

	// TODO: Check to see if validator signed off && time period has elapsed
	// overrides withdrawalAllowed function in conditionalEscrow
	function withdrawalAllowed(address validator) public view returns (bool) {
		//if(msg.sender == validator) {
			// check time elapsed
		//	if(block.number <= endDate) {
		//		return false;
		//	}
		//}
		return true;	
	}

	// Use Escrow methods to return funds to depositor on request
	function withdraw(string memory resolutionId, address payable withdrawalTarget, address validator) public {
		require(withdrawalAllowed(validator));
		require(resolutions[resolutionId].initialized == true);
		withdraw(withdrawalTarget);
	}

	// if validator sends signed message that terms are being met, lengthen period to escrow burn 
	function restartTimer() private view {
		require(msg.data.length != 0);
		
		// TODO: use block.number to identify time
	}

	function shouldBurn() private returns (bool) {
	
	}

	// if validator does not sign message verifying conditions are met, send contract value to specified contract
	function burnValue(address payable donationTarget, uint256 wageredAmount) public returns (bool) {
		require(shouldBurn());		
		// log burn to blockchain for display to clients (TODO: Parameterize event fields)
		emit Burn(123, 0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF);	
	
		// send to donation target
		return donationTarget.send(wageredAmount);
	}

	// fallback function to return sent eth back to sender minus gas
	function () external payable {
		msg.sender.transfer(msg.value);
	} 
}

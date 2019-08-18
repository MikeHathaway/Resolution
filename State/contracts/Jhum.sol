pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/payment/escrow/ConditionalEscrow.sol";

// https://medium.freecodecamp.org/create-an-ethereum-token-using-open-source-contracts-open-zeppelin-1e132e6233ed
// https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2
// https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events

contract Jhum is ConditionalEscrow {

	uint256 goal;
	bytes32 duration;
	address validator;
	address payable private donationTarget;

    mapping(uint256 => address) private _participants;
    
	constructor(uint256 _goal, address _validator, address payable _donationTarget) public {
		goal = _goal;
		validator = _validator;
		donationTarget = _donationTarget;
		ConditionalEscrow(msg.sender);
	}

	function participantsOf(uint256 _goal) public view returns (address) {
		return _participants[_goal];
	}

	// TODO: Check to see if validator signed off && time period has elapsed
	function withdrawalAllowed(address payee) public view returns (bool) {
		if(msg.sender == validator) {
			// check time elapsed
			return true;
		}	
	}

	// if validator sends signed message that terms have are being met, lengthen period to escrow burn 
	function restartTimer() private view {
		require(msg.data.length != 0);

	}

	// if validator does not sign message verifying conditions are met, send contract value to specified contract
	function burnValue() public {
		// send to donation target	
	}
}

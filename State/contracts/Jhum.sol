pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/payment/escrow/ConditionalEscrow.sol";

// https://medium.freecodecamp.org/create-an-ethereum-token-using-open-source-contracts-open-zeppelin-1e132e6233ed
// https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2
// https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events

contract Jhum is ConditionalEscrow {

	uint256 goal;
	uint256 wageredAmount;
	bytes32 duration;
	address validator;
	address payable donationTarget;

    mapping(uint256 => address) private _participants;

	event Burn(uint256 _goal, address indexed payable donationTarget);

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

	// if validator sends signed message that terms are being met, lengthen period to escrow burn 
	function restartTimer() private view {
		require(msg.data.length != 0);
		
		// TODO: use block.number to identify time
	}

	function shouldBurn() private returns (bool) {
	
	}

	// if validator does not sign message verifying conditions are met, send contract value to specified contract
	function burnValue(address payable _donationTarget) public returns (bool) {
		require(shouldBurn());		
		// log burn to blockchain for display to clients (TODO: Parameterize event fields)
		emit Burn(123, 0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF);	
	
		// send to donation target
		return donationTarget.send(wageredAmount);
	}
}

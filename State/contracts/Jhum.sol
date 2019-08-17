pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/payment/escrow/ConditionalEscrow.sol";

// https://medium.freecodecamp.org/create-an-ethereum-token-using-open-source-contracts-open-zeppelin-1e132e6233ed
// https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2
// https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events

contract Jhum is ConditionalEscrow {

	bytes32 name;
	address validator;

    struct Participants { mapping(address => uint) flags; }

    constructor(bytes32 _name, address _validator) public {
		name = _name;
		validator = _validator;
		ConditionalEscrow();
	}
	
	
	function withdrawalAllowed(address payee) public {
		if(msg.sender(payee) == validator) {
			return true;
		}	
	}

	// if validator sends signed message that terms have are being met, lengthen period to escrow burn 
	function restartTimer() private view {
		require(msg.data.length != 0);

	}

	function burnValue() public {
	
	}
}

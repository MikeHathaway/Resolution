# Getting Started

The first time you run this project, run `npm run start-init`. 

Thereaftore, you will have a consistent mnemonic stored in a .gitignored file. This constitutes poor security, and should only be used with throwaway development keys.

Start the Ganache local Blockchain with your mnemonic and compile contracts
`npm run start`

## Contract Architecture

1) CreateResolution
	- Creation of a new Resolution
```
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
```
	
2) CompleteResolution
	- Goal is met, all withdrawal conditions present
		- Both participants send signed message signaling success
		
3) FailResolution
	- Goal is unmet, and/or no signature recieved before endDate
	- Aion SC funded on Resolution creation used to dispatch funds
	- If you are lazy, and don't call CompleteResolution by the time periods end plus a buffer. Don't be lazy.	

## Read More
- https://docs.openzeppelin.com/sdk/2.5/pattern.html
- https://dzone.com/articles/implementing-a-simple-smart-contract-for-asset-tra
- https://ethereum.stackexchange.com/questions/8615/child-contract-vs-struct?rq=1
- https://medium.com/aztec-protocol/deploying-aztec-to-ganache-dc02d538b24f
- https://medium.com/@kctheservant/transactions-in-ethereum-e85a73068f74
- https://github.com/ETH-Pantheon/Aion

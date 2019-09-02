# Getting Started

The first time you run this project, run `npm run start-init`. 

Thereaftore, you will have a consistent mnemonic stored in a .gitignored file. This constitutes poor security, and should only be used with throwaway development keys.

Start the Ganache local Blockchain with your mnemonic and compile contracts
`npm run start`

## Contract Architecture

1) CreateResolution
	- Creation of a new goal
	- ` createResolution()`
	
2) CompleteResolution
	- Goal is met, all withdrawal conditions present
3) FailResolution
	- Goal is unmet, and/or no signature recieved before endDate

## Read More
- https://docs.openzeppelin.com/sdk/2.5/pattern.html
- https://dzone.com/articles/implementing-a-simple-smart-contract-for-asset-tra
- https://ethereum.stackexchange.com/questions/8615/child-contract-vs-struct?rq=1
- https://medium.com/aztec-protocol/deploying-aztec-to-ganache-dc02d538b24f
- https://medium.com/@kctheservant/transactions-in-ethereum-e85a73068f74

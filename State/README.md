# Resolution

Resolution is a Decentralized Application (dApp) that allows you to set goals, and stake value on that goals completion.


## Description 

MOTIVATION

Why do this? Why not just do the thing?

Well, it turns out some research[1]()[2]()[3]() shows that loss avoidance can be strongly motivating factor in determining behavior. This may or may not be news.


HOW IT WORKS

So you've decided to hack yourself, and are now wondering how it works. 

On creation of your goal, you will specify a charity that will receive your funds in the event that you fail to complete your Resolution, along with a set duration (specified in Ethereum Blocks), and a specified amount of Ethereum (` <1 ether` that you are will to stake on successful completion. Those funds will then be held in escrow, at the control of the [ResolutionDao](https://aragon.org/#/). [The terms of this escrow will be determined by OpenLaw]() This DAO's keys have in turn been burned, eliminating the possibility of malicious developers. Likewise, in order to prevent money laundering, all charities are on a immutable list of addresses controlled by a subsidiary Charity Smart Contract. 

Once Ethereum reaches the specified block height, you will then be able to send a message in a withdrawal transaction to the Resolution Smart Contract. Optionally, you can also specify a validating address, with the added requirement that the validating address signs off on successful completion of the Resolution in order for withdrawal from the ResolutionDAO to occur.


In the event that you fail to complete the Resolution you can either send a transaction causing 

This is because Ethereum Smart Contracts are not, bar using something like Aion[](), self executing. Someone needs to call it for a state change to take place. 

By default, Resolution relies on the honor system. The oracle problem restricts our ability to access real world data, and trustlessly verify your actions. Not to mention it might get creepy having a smart contract watch you in the shower. A brief pledge and recognition that the funds were supposed to have gone to charity should help provide some game theoretic stability. 



WHY USE ETHEREUM

Ethereum is a groundbreaking innovation - a global computation public commons that can be used to build [Unstoppable Applications](https://hackernoon.com/joe-lubin-on-the-future-of-blockchain-d058aa57641b)

It also removes some regulatory uncertainty,


### Getting Started

Building this project requires NodeJS. 

The first time you run this project, run `npm run start-init`. Thereaftore, you will have a consistent mnemonic stored in a .gitignored file. Storing private keys in memory, in unecrypted locations on internet connected devices constitutes poor security, and should only be done with throwaway development keys. With the outputted list of private keys and addresses, copy the private key to a file .key.txt, and replace the code block in truffle-config.js with the associated address.

With initialization complete, you can return to the project by simply running `npm run start`. 

You should now have a local Ganache Ethereum node, with your smart contracts compiled and deployed to it.

### Architecture

Resolution is a Web based dApp, consisting of a client (coded in JS and served up by IPFS), and the Ethereum Blockchain. People would then interact with that client via Metamask, or another web3 wallet that can sign and receive transactions. 

Resolution strives to be as secure, and lightweight as possible - reflective of the gravity of holding peoples money. Dependencies are chosen for their small size, and minimal attack surface. For example, Ethers.js (~84kb) is used as opposed to the relatively bloated Web3 library for client interactions with the contract.  


State/
Library/
View/

Project Structure

- Library/
	- NodeJS Typescript library interface for interacting with Smart Contract
- contracts/
	- Solidity Smart Contracts
- migrations/
	- JavaScript code for deploying contracts to the blockchain
- tests/
	- Tests using Mocha, Chai, and mocked contracts

		
Public Contract Functions (contracts/):

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
		- Both participants send signed message verifying successful completion of the Resolution.
			- https://docs.ethers.io/ethers.js/html/cookbook-signing.html#signing-a-string-message




3) FailResolution
	- Goal is unmet, and/or no signature recieved before endDate
	- Aion SC funded on Resolution creation used to dispatch funds
	- If you are lazy, and don't call CompleteResolution by the time periods end plus a buffer. Don't be lazy.	
	- Termiantion of resolution can then be called openly


### Read More
- https://docs.openzeppelin.com/sdk/2.5/pattern.html
- https://dzone.com/articles/implementing-a-simple-smart-contract-for-asset-tra
- https://ethereum.stackexchange.com/questions/8615/child-contract-vs-struct?rq=1
- https://medium.com/aztec-protocol/deploying-aztec-to-ganache-dc02d538b24f
- https://medium.com/@kctheservant/transactions-in-ethereum-e85a73068f74
- https://github.com/ETH-Pantheon/Aion
- https://github.com/ethereum-ts/TypeChain
- https://github.com/matiassingers/awesome-readme

# Resolution

Resolution is a Decentralized Application (dApp) that allows you to set goals (Resolution), and stake value on that Resolution's completion.



## Description 

Some research([1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2600530/), [2](https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/loss-aversion/)) shows that loss avoidance can be strongly motivating factor in determining behavior. Resolution brings Avoidance Motivation to the Blockchain by providing a Smart Contract you can use to easily "put your money where your mouth is" and stake funds on succesful completion of your next New Years Resolution. 

In order to create a Resolution, you will need to specify a charity that will receive your funds in the event that you fail to complete your Resolution, along with a set duration (specified in Ethereum Blocks), and a specified amount of Ethereum (`<1 ether`) to stake on successful completion. Those funds will then be held in escrow, at the control of the [ResolutionDao](https://wiki.aragon.org/archive/dev/apps/finance/). In order to prevent money laundering, all charities are on a immutable list of verified charity addresses controlled by a subsidiary Charity Smart Contract. [In a future release, the terms of this escrow will be determined by OpenLaw](https://www.openlaw.io/).

Once Ethereum reaches the specified block height, you will then be able to send a message in a withdrawal transaction to the Resolution Smart Contract. Optionally, you can also specify a validating address, with the added requirement that the validating address signs off on successful completion of the Resolution in order for withdrawal from the ResolutionDAO to occur.

In the event that you fail to complete the Resolution you can either send a transaction causing the staked funds to be transferred to your chosen charity, or wait until the post expiration buffer period expires. On expiration of the buffer period, either someone calls the burnValue method, or Resolution's integration with [Aion](https://github.com/ETH-Pantheon/Aion) kicks in and uses a portion of the staked funds to trigger the transfer to charity.

By default, Resolution relies on the honor system. The [Oracle Problem](https://hackernoon.com/a-discussion-of-the-oracle-problem-6cbec7872c10) restricts our ability to access real world data, and trustlessly verify your actions. Not to mention it might get creepy having a smart contract watch you in the shower. A brief pledge and recognition that the funds were supposed to have gone to charity should help provide some incentives to not cheat yourself, or others. 



### Getting Started

Building this project requires NodeJS. 

The first time you run this project, run `npm run start-init`. Thereaftore, you will have a consistent mnemonic stored in a .gitignored file. Storing private keys in memory, in unecrypted locations on internet connected devices constitutes poor security, and should only be done with throwaway development keys.

With initialization complete, you can return to the project by simply running `npm run start`. 

You should now have a local Ganache Ethereum node, with your smart contracts compiled and deployed to it.

Tests can be run with `npm test`


### Architecture

**Overview**

Resolution is a Web based dApp, consisting of a client (coded in JS and served up by IPFS), and the Ethereum Blockchain. People would then interact with that client via Metamask, or another web3 wallet that can sign and receive transactions. 

Resolution strives to be as secure, and lightweight as possible - reflective of the gravity of holding peoples money. Dependencies are chosen for their small size, and minimal attack surface. For example, Ethers.js (~84kb) is used as opposed to the comparatively bloated Web3 library for client interactions with the contract. 

A library module is used to centralize the set of functions that will be executed in the dApp. This single source of truth will ensure that tests are running against the same functions that will be executed on Mainnet. 

**Project Structure**
- State/
	- contracts/
		- Solidity Smart Contracts
	- migrations/
		- JavaScript code for deploying contracts to the blockchain
	- tests/
		- Tests using Mocha, Chai, and mocked contracts
- Library/
	- NodeJS Typescript library interface for interacting with Smart Contract
- View/
	- UI code

		
**Public Contract Functions (State/contracts/):**

1) *CreateResolution*
```
	/**
		* Create a new Resolution
	   	* @param resolutionName Name of Resolution 
		* @param resolutionId UUID 
		* @param duration specified block heigt the resolution will run through 
		* @param donationTarget address who receives escrowed funds in the event of failure
		* @param usesValidator  boolean to check if a validatable resolution is being created
 		* @return resolutionId UUID 
	*/

	function createResolution(string memory resolutionName, string memory resolutionId,  uint256 duration, address payable donationTarget, bool usesValidator, address validator) public payable returns (string memory) {
		require(shouldCreate(msg.sender, resolutionId));

		// validated resolution
		if(usesValidator){ 
			resolutions[msg.sender][resolutionId] = Resolution(resolutionName, msg.value, duration, donationTarget, true, true);
			validators[resolutionId] = Validator(validator, false);

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
```
	
2) *CompleteResolution*
```
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
```



3) *BurnResolution*
```
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

		// send to donation target
		return donationTarget.send(resolutions[resolutionCreator][resolutionId].value);
	}
```

### Read More

**Smart Contract Interations** 
- https://github.com/ethereum-ts/TypeChain
- https://github.com/ETH-Pantheon/Aion
- https://hack.aragon.org/docs/guides-use-agent	
- https://docs.ethers.io/ethers.js/html/cookbook-signing.html#signing-a-string-message

**Smart Contract Creation**
- https://docs.openzeppelin.com/sdk/2.5/pattern.html
- https://ethereum.stackexchange.com/questions/12611/solidity-filling-a-struct-array-containing-itself-an-array	
- https://dzone.com/articles/implementing-a-simple-smart-contract-for-asset-tra
- https://ethereum.stackexchange.com/questions/8615/child-contract-vs-struct?rq=1
- https://medium.com/aztec-protocol/deploying-aztec-to-ganache-dc02d538b24f
- https://medium.com/@kctheservant/transactions-in-ethereum-e85a73068f74
- https://medium.freecodecamp.org/create-an-ethereum-token-using-open-source-contracts-open-zeppelin-1e132e6233ed
- https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2
- https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events

**IPFS**
- https://medium.com/pinata/how-to-pin-to-ipfs-effortlessly-ba3437b33885
- https://withblue.ink/2018/11/14/distributed-web-host-your-website-with-ipfs-clusters-cloudflare-and-devops.html

**Market Research**
- https://www.stickk.com/

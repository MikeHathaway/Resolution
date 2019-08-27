const ethers = require('ethers');
const resolutionABI = require('./contractConfiguration/Resolution.json');
const fs = require('fs');

function connectToContract(){
	// Connect to the network
	const provider = new ethers.providers.JsonRpcProvider()

	const contractAddress = "0xB869DcA31a2817fa814B78c9c5cE6A52f6311782"

	// We connect to the Contract using a Provider, so we will only
	// have read-only access to the Contract
	const contract = new ethers.Contract(contractAddress, resolutionABI.abi, provider);

	const mnemonic = fs.readFileSync('./.secret', 'utf8');

	const privateKey = fs.readFileSync('./.key', 'utf8'); 
	const wallet = new ethers.Wallet(privateKey, provider);
	
	const contractWithSigner = contract.connect(wallet);

	async function callCreateResolution(){
		try {

			const resolutionParams = {
				resolutionName: "Dank", 
				resolutionId: "420", 
				resolutionEscrow: '0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				validator: '0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				donationTarget: '0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF'
			};

			const methodParams = [
				"Dank",
				"420",
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF'
			];
			const transactionParams = {
				// Required unless deploying a contract (in which case omit)
				to: '0xB869DcA31a2817fa814B78c9c5cE6A52f6311782',  // the target address or ENS name

				// These are optional/meaningless for call and estimateGas
				nonce: 0,           // the transaction nonce
				gasLimit: 0,        // the maximum gas this transaction may spend
				gasPrice: 0,        // the price (in wei) per unit of gas

				// These are always optional (but for call, data is usually specified)
				data: "0x",         // extra data for the transaction, or input for call
				value: .5,           // the amount (in wei) this transaction is sending
				chainId: 3          // the network ID; usually added by a signer	
			};

			const tx = await contractWithSigner.createResolution(
				"Dank", 
				Math.floor(Math.random()*1000).toString(), 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF'
			);

			tx.wait().then(receipt => {
				console.log("Transaction Receipt", receipt);
			});
		} catch(error) {
			console.error("ruh ro", error);
			throw error;
		}	
	}


	async function listenForDeposit(){
		try {
			contract.on('Deposited', (payee, weiAmount, event) => {			
				console.log("DEPOSITED: ");
				console.log("Payee: ", payee);
				console.log("Amount: ", weiAmount.toNumber());
			})
		} catch(error) {
			console.error("listen error", error);
			throw error;	
		}
	}

	async function listenForCreateResolution(){
		try {
		
			contract.on('ResolutionCreated', (resolutionName, resolutionId, event) => {			
				console.log("==================");
				console.log("RESOLUTION CREATED: ");
				console.log("resolutionName: ", resolutionName);
				console.log("blockNumber: ", event.blockNumber);
			})
		} catch(error) {
			console.error("listen error", error);
			throw error;	
		}
	}

	async function listenForCreateFailure(){
		try {
		
			contract.on('RejectCreate', (caller, resolutionId, event) => {			
				console.log("Create Resolution was rejected");
				console.log(caller);
				console.log(event.blockNumber);
			})
		} catch(error) {
			console.error("listen error", error);
			throw error;	
		}
	}
	
	listenForDeposit();
	listenForCreateFailure();
	listenForCreateResolution();
	callCreateResolution();
}


connectToContract();

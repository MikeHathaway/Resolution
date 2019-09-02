const ethers = require('ethers');
const resolutionABI = require('./contractConfiguration/Resolution.json');
const fs = require('fs');

function connectToContract(){
	const provider = new ethers.providers.JsonRpcProvider()

	const contractAddress = "0x2DeE1D4c4a632335e4f4b7Ca48a5b7686B20b439"

	const contract = new ethers.Contract(contractAddress, resolutionABI.abi, provider);

	const privateKey = fs.readFileSync('./.key.txt', 'utf8').replace(/[\n\r]/g, ''); 
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

			const tx = await contractWithSigner.createResolution(
				"Dank", 
				Math.floor(Math.random()*1000).toString(), 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF',
				{value: 100000}
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

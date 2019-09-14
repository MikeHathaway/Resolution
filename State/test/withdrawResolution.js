const ethers = require('ethers');
const contractConfiguration = require('../contractConfiguration/Resolution.json');
const fs = require('fs');

function connectToContract(){
	const provider = new ethers.providers.JsonRpcProvider()

	const contract = new ethers.Contract(contractConfiguration.address, contractConfiguration.abi, provider);

	const privateKey = fs.readFileSync('./.key.txt', 'utf8').replace(/[\n\r]/g, ''); 
	const wallet = new ethers.Wallet(privateKey, provider);
	
	const contractWithSigner = contract.connect(wallet);

	async function callCompleteResolution(){
		try {

			const tx = await contractWithSigner.completeResolution(
				"Dank", 
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


	async function listenForWithdrawal(){
		try {
			contract.on('Withdrawn', (payee, weiAmount, event) => {			
				console.log("DEPOSITED: ");
				console.log("Payee: ", payee);
				console.log("Amount: ", weiAmount.toNumber());
			})
		} catch(error) {
			console.error("listen error", error);
			throw error;	
		}
	}


	async function listenForWithdrawalFailure(){
		try {
		
			contract.on('WithdrawalFailed', (caller, resolutionId, event) => {			
				console.log("Withdrawal was unsucessful");
				console.log(caller);
				console.log(event.blockNumber);
			})
		} catch(error) {
			console.error("listen error", error);
			throw error;	
		}
	}
	
	listenForWithdrawal();
	listenForWithdrawalFailure();
	callCompleteResolution();
}


connectToContract();

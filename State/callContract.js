const ethers = require('ethers');
const resolutionABI = require('./contractConfiguration/Resolution.json');
const fs = require('fs');

function connectToContract(){
	// Connect to the network
	const provider = new ethers.providers.JsonRpcProvider()

	const contractAddress = "0xCC5152B799CB494e642c4C2B12739dc00eee8e12"

	// We connect to the Contract using a Provider, so we will only
	// have read-only access to the Contract
	const contract = new ethers.Contract(contractAddress, resolutionABI.abi, provider);
	console.log("succesfully connected to contract", contract);

	const mnemonic = fs.readFileSync('./.secret', 'utf8');
	const privateKey = '0x558ccad067b247abf4c6001fa14cf5a0e8f9c80412078d756d74d3910ad9fc1e';
	const wallet = new ethers.Wallet(privateKey, provider);
	
	const contractWithSigner = contract.connect(wallet);

	async function callCreateResolution(){
		try {
			const tx = await contractWithSigner.createResolution("Dank", "424", '0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', '0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', '0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF');

			console.log(tx.hash);

			tx.wait().then(receipt => {
				console.log(receipt);
			});
		} catch(error) {
			console.error("ruh ro", error);
			throw error;
		}	
	}

	async function listenForCreateResolution(){
		try {
		
			contract.on('ResolutionCreated', (resolutionName, resolutionId, event) => {			
				console.log(resolutionName);
				console.log(event.blockNumber);
			})
		} catch(error) {
			console.error("listen error", error);
			throw error;	
		}
	}

	listenForCreateResolution();
	callCreateResolution();
}


connectToContract();

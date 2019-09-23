const ethers = require('ethers');
const contractConfiguration = require('../State/contractConfiguration/Resolution.json');
const fs = require('fs');

export default function connectToContract(){
	const provider = new ethers.providers.JsonRpcProvider()

	const contract = new ethers.Contract(contractConfiguration.address, contractConfiguration.abi, provider);

	const privateKey = fs.readFileSync('../State/.key.txt', 'utf8').replace(/[\n\r]/g, ''); 
	const wallet = new ethers.Wallet(privateKey, provider);
	
	const contractWithSigner = contract.connect(wallet);

	return contractWithSigner;
}

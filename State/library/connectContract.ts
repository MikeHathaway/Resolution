const ethers = require('ethers');
const contractConfiguration = require('../contractConfiguration/Resolution.json');
const fs = require('fs');


// TODO: add connect wrapper 

export default function connectToContract(){
	const provider = new ethers.providers.JsonRpcProvider()

	const contract = new ethers.Contract(contractConfiguration.address, contractConfiguration.abi, provider);

	const privateKey = fs.readFileSync('./.key.txt', 'utf8').replace(/[\n\r]/g, ''); 
	const wallet = new ethers.Wallet(privateKey, provider);
	
	const contractWithSigner = contract.connect(wallet);

	return contractWithSigner;
}


export async function connectMethod(method: Function) {
	return await connectToContract(method);
}

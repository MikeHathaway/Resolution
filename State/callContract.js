const ethers = require('ethers');
const resolutionABI = require('./abi/Resolution.json');

function connectToContract(){
	// The Contract interface
	const abi = [
		"event ValueChanged(address indexed author, string oldValue, string newValue)",
		"constructor(string value)",
		"function getValue() view returns (string value)",
		"function setValue(string value)"
	];

	// Connect to the network
	const provider = ethers.getDefaultProvider("http://127.0.0.1:8545");

	const contractAddress = "0x2DeE1D4c4a632335e4f4b7Ca48a5b7686B20b439"
	// We connect to the Contract using a Provider, so we will only
	// have read-only access to the Contract
	const contract = new ethers.Contract(contractAddress, resolutionABI, provider);
}

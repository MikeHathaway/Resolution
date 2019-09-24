const bip39 = require('bip39');
const fs = require('fs');
const ethers = require('ethers');

const mnemonic = bip39.generateMnemonic();

// retreive 1st path private key and address
const Wallet = ethers.Wallet.fromMnemonic(mnemonic);
const privateKey = Wallet.privateKey;
const address = Wallet.address;

fs.writeFile(".secret", mnemonic, (error) => {
	if(error) {
		console.error("couldn't generate mnemonic", error);
	}

	console.log("The mnemonic was saved!", mnemonic);
}); 

fs.writeFile(".key", privateKey, (error) => {
	if(error) {
		console.error("couldnt write private key", error);
	}

	console.log("The key was saved!", privateKey);
});

fs.writeFile(".address", address, (error) => {
	if(error) {
		console.error("couldnt write private key", error);
	}

	console.log("The address was saved!", privateKey);
});

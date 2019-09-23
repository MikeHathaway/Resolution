const bip39 = require('bip39');
const fs = require('fs');

const mnemonic = bip39.generateMnemonic();

fs.writeFile(".secret", mnemonic, function(err) {
	if(err) {
		console.error(err);
	}

	console.log("The file was saved!");
}); 



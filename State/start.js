const bip39 = require('bip39');
const fs = require('fs');

const mnemonic = bip39.generateMnemonic()

fs.writeFile(".secret", mnemonic, function(err) {
	    if(err) {
			        return console.log(err);
			    }

	    console.log("The file was saved!");
}); 



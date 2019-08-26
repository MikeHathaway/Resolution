const fs = require('fs');
const Resolution = artifacts.require('./Resolution.sol');
const fileContent = require('../build/contracts/Resolution.json');

module.exports = function(deployer) {
    deployer.deploy(Resolution)
		.then(() => {
		    const contractConfiguration = {
		        abi: fileContent.abi,
		        address: Resolution.address
		    };
		
		    fs.writeFileSync('contractConfiguration/Resolution.json', JSON.stringify(contractConfiguration), { flag: 'w' });
		})
		.catch(error => {
			console.error("Error:" + error);
		})
};


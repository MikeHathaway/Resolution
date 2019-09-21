import { ethers }  from 'ethers';
import mocha from 'mocha';
import assert from 'assert';

const contractConfiguration = require('../contractConfiguration/Resolution.json');
import callCreateResolution from '../library/callCreateResolution';

//https://github.com/ethereum-ts/TypeChain/blob/master/test/integration/targets/ethers/DumbContract.spec.ts


describe('Events', async function() {
	it('triggers a Deposited event', async function() {

		const provider = new ethers.providers.JsonRpcProvider()

		const contract = new ethers.Contract(contractConfiguration.address, contractConfiguration.abi, provider);

		const depositEvent = new Promise((resolve, reject) => {
			
				contract.on('Deposited', (payee, weiAmount, event) => {			
					
					event.removeListener();


					console.log("DEPOSITED: ");
					console.log("Payee: ", payee);
		//			console.log("Amount: ", weiAmount.toNumber());
					
					resolve({
						payee,
						weiAmount,
						event
					});

				});

				setTimeout(() => {
					reject(new Error('timeout'));
				}, 60000);
		});

		callCreateResolution('dank-test', 10000);

		// const tx = await contract.transfer(accounts[1], 12345);

		const event = await depositEvent;

		//assert.equal(event.from, provider[0].address);
		//assert.equal(event.amount.toNumber(), weiAmount.toNumber());
		//assert.equal(event.amount.toNumber(), 12345);
	});

	it('triggers a CreateResolution event', function() {
	
	});
});


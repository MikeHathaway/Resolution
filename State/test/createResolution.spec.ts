import { ethers }  from 'ethers';
import mocha from 'mocha';
import assert from 'assert';
import fs from 'fs';

const contractConfiguration = require('../contractConfiguration/Resolution.json');
import callCreateResolution from '../../Library/callCreateResolution';

//https://github.com/ethereum-ts/TypeChain/blob/master/test/integration/targets/ethers/DumbContract.spec.ts


describe('CreateResolution', function() {
	it('should create a non validated Resolution', async function() {


		const testAddress = fs.readFileSync(".address").toString().trim();
		const validationStatus = false;
		const blockDuration = 10000;
		const wageredAmount = 1000000;

		const receipt = await callCreateResolution(
			'callCreationResolution-test', 
			'resolutionId-test',
			blockDuration,
			testAddress,
			wageredAmount,
			validationStatus,
			fs.readFileSync(".address").toString().trim()
		);


		//assert.equal(event.from, provider[0].address);
		//assert.equal(event.amount.toNumber(), weiAmount.toNumber());
		//assert.equal(event.amount.toNumber(), 12345);
	});

	it('triggers a CreateResolution event', function() {
	
	});
});


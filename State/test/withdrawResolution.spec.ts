import mocha from 'mocha';
import assert from 'assert';

import connectToContract  from "../library/connectContract";

describe('Events', async function() {

	it('triggers a CompleteResolution event', async function() {
		const contract = await connectToContract();	

		console.log("triggers CompleteResolution", contract);
	});
});

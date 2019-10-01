import connectToContract from './connectContract';

export default async function callCompleteResolution(resolutionId: string, withdrawalTarget: string){

	const contractWithSigner = connectToContract();

	try {
		const tx = await contractWithSigner.completeResolution(
			resolutionId, 
			withdrawalTarget 
		);

		return tx.wait().then(receipt => {
			return receipt;
		});

	} catch(error) {
		console.error("callCompleteResolution failed", error);
		throw error;
	}	
}


import connectToContract from './connectContract';

export default async function callBurnResolution(resolutionId: string  = Math.floor(Math.random()*1000).toString(), donationTarget: string, resolutionCreator: string){

	const contractWithSigner = connectToContract();

	try {
			const tx = await contractWithSigner.burnResolution(
				resolutionId, 
				donationTarget, 
				resolutionCreator, 
			);

			return tx.wait().then(receipt => {
				return receipt; 
			});

		} catch(error) {
			console.error("callBurnResolution Failed", error);
			throw error;
		}	
}


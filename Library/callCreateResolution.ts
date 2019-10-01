import connectToContract from './connectContract';

export default async function callCreateResolution(resolutionName: string, resolutionId = Math.floor(Math.random()*1000).toString(), duration: number, donationTarget: string, depositedAmount: number, usesValidator: boolean, validatorAddress: string){

	const contractWithSigner = connectToContract();

	try {
			const tx = await contractWithSigner.createResolution(
				resolutionName, 
				resolutionId, 
				duration,
				donationTarget, 
				{value: depositedAmount},
				usesValidator,
				validatorAddress
			);

			return tx.wait().then(receipt => {
				return receipt;
			});

		} catch(error) {
			console.error("callCreateResolution Failed", error);
			throw error;
		}	
}


import connectToContract from './connectContract';

export default async function callCreateResolution(resolutionName: string, depositedAmount: number, resolutionId = Math.floor(Math.random()*1000).toString(), usesValidator: boolean){

	const contractWithSigner = connectToContract();

	try {
			const tx = await contractWithSigner.createResolution(
				resolutionName, 
				resolutionId, 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
				{value: depositedAmount},
				usesValidator
			);

			tx.wait().then(receipt => {
				//				console.log("Transaction Receipt", receipt);
			});

		} catch(error) {
			console.error("callCreateResolution Failed", error);
			throw error;
		}	
}


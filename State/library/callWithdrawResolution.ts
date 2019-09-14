import connectToContract from '../library/connectContract';

export default async function callCompleteResolution(resolutionName: string){

	const contractWithSigner = connectToContract();

	try {
		const tx = await contractWithSigner.completeResolution(
			resolutionName, 
			'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF', 
			'0x0fdaf8757F74e5CAE7DcAd5c0A4A6c27f13eC7FF' 
		);

		tx.wait().then(receipt => {
			console.log("Transaction Receipt", receipt);
		});

	} catch(error) {
		console.error("callCompleteResolution failed", error);
		throw error;
	}	
}


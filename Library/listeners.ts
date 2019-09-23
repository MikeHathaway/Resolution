import connectToContract  from "../library/connectContract";

export async function listenForCreateResolution(){
	try {
		const contract = connectToContract();

		contract.on('ResolutionCreated', (resolutionName, resolutionId, event) => {			
			console.log("==================");
			console.log("RESOLUTION CREATED: ");
			console.log("resolutionName: ", resolutionName);
			console.log("blockNumber: ", event.blockNumber);
		})
	} catch(error) {
		console.error("listen error", error);
		throw error;	
	}
}

export async function listenForCreateFailure(){
	try {
		const contract = connectToContract();

		contract.on('RejectCreate', (caller, resolutionId, event) => {			
			console.log("Create Resolution was rejected");
			console.log(caller);
			console.log(event.blockNumber);
		})
	} catch(error) {
		console.error("listen error", error);
		throw error;	
	}
}


export async function listenForWithdrawal(){
	try {

		const contract = connectToContract();

		contract.on('Withdrawn', (payee, weiAmount, event) => {			
			console.log("DEPOSITED: ");
			console.log("Payee: ", payee);
			console.log("Amount: ", weiAmount.toNumber());
		})
	} catch(error) {
		console.error("listen error", error);
		throw error;	
	}
}


export async function listenForWithdrawalFailure(){
	try {

		const contract = connectToContract();

		contract.on('WithdrawalFailed', (caller, resolutionId, event) => {			
			console.log("Withdrawal was unsucessful");
			console.log(caller);
			console.log(event.blockNumber);
		})
	} catch(error) {
		console.error("listen error", error);
		throw error;	
	}
}


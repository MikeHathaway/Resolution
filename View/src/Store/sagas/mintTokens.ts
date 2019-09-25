import { call, put, select } from 'redux-saga/effects'

import {
    Action,
    mintTokensSuccess,
    mintTokensFailure
} from '../actions'

import {
    getAccountFromState,
    getContractFromState
} from '../selectors'

/** 
    Add tokens to users address
*/
function addMinter(address: string, ReviewDAOContract: any) {
    const addMinterPromise = ReviewDAOContract.methods.addMinter(address)
        .then((addMinterStatus: any) => {
            console.log("add minter successful", addMinterStatus)
            return addMinterStatus;
        })

    return Promise.resolve(addMinterPromise);
}

// Convert the mint function to use sendTransaction({transactionObject})
// https://ethereum.stackexchange.com/questions/8736/how-to-call-my-contracts-function-using-sendtransaction
function mint(account: string, ReviewDAOContract: any) {
  const tokensToMint = 10
  // TODO: Call mint function from MinterRole

  const getData = ReviewDAOContract.methods.mint.getData(account, tokensToMint)
  console.log("getting data", getData)
  const mintPromise = ReviewDAOContract.mint.sendTransaction(account, tokensToMint, {from: account}, (error: Error, result: any) => {
    if(!error) {
      console.log("minting result", result)
    }
    console.error("minting error", error)
  })

    // .then((mintStatus: boolean) => {
    //   console.log("Token Minting Successful", mintStatus);
    //   return tokensToMint;
    // })
    // .catch((error: Error) => {
    //   console.error("You do not have permission to mint tokens")
    //   return error;
    // });
  return Promise.resolve(mintPromise);
}

// function mint(account: string, ReviewDAOContract: any) {
//     const tokensToMint = 10
//     // TODO: Call mint function from MinterRole
//     const mintPromise = ReviewDAOContract.methods.mint(account, tokensToMint).call({from: account})
//       .then((mintStatus: boolean) => {
//         console.log("Token Minting Successful")
//         return tokensToMint;
//       })
//       .catch((error: Error) => {
//         console.error("You do not have permission to mint tokens")
//         return error;
//       });
//     return Promise.resolve(mintPromise);
// }
  
export default function* mintTokens(action: Action) {
  try {
    const account = yield select(getAccountFromState);
    const ReviewDAOContract = yield select(getContractFromState);

    console.log("mint parameters", account, ReviewDAOContract);
    const mintedTokens = yield call(mint, account, ReviewDAOContract);

    console.log("minted tokens: ", mintedTokens)
    yield put(mintTokensSuccess(mintedTokens));
  } catch (error) {
    yield put(mintTokensFailure(error));
  }
}
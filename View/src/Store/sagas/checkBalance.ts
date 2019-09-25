import { call, put, select } from 'redux-saga/effects'

import {
    Action,
    checkBalanceSuccess,
    checkBalanceFailure
} from '../actions'

import {
    getWeb3FromState,
    getAccountFromState,
    getContractFromState
} from '../selectors'

/** 
    Effects for checking an accounts balance
*/
function getBalanceForAddress(address: string, web3: any) {
    return Promise.resolve(web3.eth.getBalance(address));
}

function getTokenBalanceForAddress(address: string, ReviewDAOContract: any) {
  const tokenBalance = ReviewDAOContract.methods.balanceOf(address).call({from: address})
    .then((balance: any) => {
      // console.log("converted balance from BigNumber", web3.utils.fromWei(balance.toNumber(), "ether"))
      console.log("token balance", balance.toNumber())
      return balance.toNumber()
    })
  return Promise.resolve(tokenBalance);
}

export default function* checkBalance(action: Action) {
    try {
        const web3 = yield select(getWeb3FromState);
        const address = yield select(getAccountFromState);
        const ReviewDAOContract = yield select(getContractFromState);

        const ethBalance = yield call(getBalanceForAddress, address, web3)
        const tokenBalance = yield call(getTokenBalanceForAddress, address, ReviewDAOContract);

        yield put(checkBalanceSuccess(address, tokenBalance));
    } catch (error) {
        yield put(checkBalanceFailure(error));
    }
}
import { takeEvery } from 'redux-saga/effects'

import connectWeb3 from './connectWeb3'
import checkBalance from './checkBalance'
import mintTokens from './mintTokens'
import transfer from './transfer'


export interface ReviewCoinSaga {
    web3: any,
    ReviewDAOContract: any,
    address: string
}

/*
    Root saga that spins up worker sagas to handle contract events
*/
function* rootSaga() {
    yield takeEvery("CONNECT_WEB3", connectWeb3);
    yield takeEvery("TRANSFER", transfer);
    yield takeEvery("CHECK_BALANCE", checkBalance);
    yield takeEvery("MINT_TOKENS", mintTokens);
}

export default rootSaga;
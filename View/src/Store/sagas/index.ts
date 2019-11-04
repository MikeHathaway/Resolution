import { takeEvery } from 'redux-saga/effects'

import connectWeb3 from './connectWeb3'
import checkBalance from './checkBalance'
import createResolution from './createResolution'
import completeResolution from './completeResolution'
import burnResolution from './burnResolution'

export interface ResolutionSaga {
    web3: any,
    ResolutionContract: any,
    address: string
}

/*
    Root saga that spins up worker sagas to handle contract events
*/
function* rootSaga() {
    yield takeEvery("CONNECT_WEB3", connectWeb3);
    yield takeEvery("CHECK_BALANCE", checkBalance);
    yield takeEvery("CREATE_RESOLUTION", createResolution);
    yield takeEvery("COMPLETE_RESOLUTION", completeResolution);
    yield takeEvery("BURN_RESOLUTION", burnResolution);
}

export default rootSaga;

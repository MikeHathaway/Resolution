import { combineReducers, createStore, Dispatch, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'
import { web3Reducer } from './reducers'

import { IResolution } from './reducers'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export interface IRootState {
    resolution: IResolution
}

// TODO: Modify type schema

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        resolution: web3Reducer
    }), 
    applyMiddleware(sagaMiddleware));

// Start the Saga
sagaMiddleware.run(rootSaga)

export default store;

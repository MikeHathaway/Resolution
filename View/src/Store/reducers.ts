import {
    Action,
    CHECK_BALANCE_SUCCESS,
    CONNECT_WEB3,
    CONNECT_WEB3_SUCCESS,
    CREATE_RESOLUTION_SUCCESS,
	COMPLETE_RESOLUTION_SUCCESS,
	BURN_RESOLUTION_SUCCESS
} from './actions'

export interface IResolution {
    account: string
    resolutionId: string 
    isLoading: boolean
}

export function web3Reducer(state: IResolution = {account: '', resolutionId: '', isLoading: false}, action: Action): IResolution {
    switch (action.type) {
        case CONNECT_WEB3:
            return { ...state, ...action.payload, isLoading: true };
        case CONNECT_WEB3_SUCCESS:
            return { ...state, ...action.payload, isLoading: false };
        case CHECK_BALANCE_SUCCESS:
            return { ...state, ...action.payload };
        case CREATE_RESOLUTION_SUCCESS:
            return { ...state }          
        default:    
            return state;
    }
}

import {
    Action,
    CHECK_BALANCE_SUCCESS,
    CONNECT_WEB3,
    CONNECT_WEB3_SUCCESS,
    MINT_TOKENS_SUCCESS
} from './actions'

export interface IReviewCoin {
    account: string
    token: number
    isLoading: boolean
}

export function web3Reducer(state: IReviewCoin = {account: '', token: 0, isLoading: false}, action: Action): IReviewCoin {
    switch (action.type) {
        case CONNECT_WEB3:
            return { ...state, ...action.payload, isLoading: true };
        case CONNECT_WEB3_SUCCESS:
            return { ...state, ...action.payload, isLoading: false };
        case CHECK_BALANCE_SUCCESS:
            return { ...state, ...action.payload };
        case MINT_TOKENS_SUCCESS:
            const prevBalance = state.token || 0
            const newBalance = action.payload.token
            const token = prevBalance + newBalance;
            
            return { ...state, token }          
        default:    
            return state;
    }
}
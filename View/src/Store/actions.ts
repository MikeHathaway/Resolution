import { action, Action, ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type Action = ActionType<typeof actions>;

// Async Actions for initial connection to the Smart Contract
export const CONNECT_WEB3 = 'CONNECT_WEB3';
export const CONNECT_WEB3_SUCCESS = 'CONNECT_WEB3_SUCCESS';
export const CONNECT_WEB3_FAILURE = 'CONNECT_WEB3_FAILURE';

export const CREATE_RESOLUTION = 'CREATE_RESOLUTION';
export const CREATE_RESOLUTION_SUCCESS = 'CREATE_RESOLUTION_SUCCESS';
export const CREATE_RESOLUTION_FAILURE = 'CREATE_RESOLUTION_FAILURE';

export const COMPLETE_RESOLUTION = 'COMPLETE_RESOLUTION';
export const COMPLETE_RESOLUTION_SUCCESS = 'COMPLETE_RESOLUTION_SUCCESS';
export const COMPLETE_RESOLUTION_FAILURE = 'COMPLETE_RESOLUTION_FAILURE';

export const BURN_RESOLUTION = 'BURN_RESOLUTION';
export const BURN_RESOLUTION_SUCCESS = 'BURN_RESOLUTION_SUCCESS';
export const BURN_RESOLUTION_FAILURE = 'BURN_RESOLUTION_FAILURE';

export const CHECK_BALANCE = 'CHECK_BALANCE';
export const CHECK_BALANCE_SUCCESS = 'CHECK_BALANCE_SUCCESS';
export const CHECK_BALANCE_FAILURE = 'CHECK_BALANCE_FAILURE';

export function connectWeb3(account: string, token: number) {
    return action(CONNECT_WEB3, {
        account,
        token
    });
}

export function connectWeb3Success(web3: any, account: any, ReviewDAOContract: object) {
    return action(CONNECT_WEB3_SUCCESS, {
        web3,
        account,
        ResolutionContract
    });
}

export function connectWeb3Failure(error: object) {
    return action(CONNECT_WEB3_FAILURE, {
        error
    });
}

export function createResolution() {
    return action(CREATE_RESOLUTION, {});
}

export function createResolutionSuccess() {
    return action(CREATE_RESOLUTION_SUCCESS, {});
}

export function createResolutionFailure(error: object) {
    return action(CREATE_RESOLUTION_FAILURE, {
        error
    });
}

export function completeResolution() {
    return action(COMPLETE_RESOLUTION, {});
}

export function completeResolutionSuccess() {
    return action(COMPLETE_RESOLUTION_SUCCESS, {});
}

export function completeResolutionFailure(error: object) {
    return action(COMPLETE_RESOLUTION_FAILURE, {
        error
    });
}

export function burnResolution() {
    return action(BURN_RESOLUTION, {});
}

export function burnResolutionSuccess() {
    return action(BURN_RESOLUTION_SUCCESS, {});
}

export function burnResolutionFailure(error: object) {
    return action(BURN_RESOLUTION_FAILURE, {
        error
    });
}

export function checkBalance() {
    return action(CHECK_BALANCE, {});
}

export function checkBalanceSuccess(account: string, token: number) {
    return action(CHECK_BALANCE_SUCCESS, {
        account,
        token
    });
}

export function checkBalanceFailure(error: object) {
    return action(CHECK_BALANCE_FAILURE, {
        error
    });
}

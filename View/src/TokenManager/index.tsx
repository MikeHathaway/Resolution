import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom'
import { Action } from 'typesafe-actions';

import SendTransaction from './SendTransaction/SendTransaction'
import CheckBalance from './CheckBalance/CheckBalance';
import Loading from '../Loading/index'
import Header from './Header/index'

// have the interface expand react router props
export interface TokenManagerProps extends RouteComponentProps {
    mycurrency: {
      isLoading: boolean,
      token: Number
    },
    checkBalance: Action,
    transferToken: Action,
    mintTokens: Action
}

// TODO: Fire connectWeb3 from within TokenManager function
export default function TokenManager(props: TokenManagerProps) {
    const {
        mycurrency,
        mycurrency: {
            isLoading
        },
        checkBalance,
        transferToken,
        mintTokens
    } = props;

    console.log('non history props', props)

    return (
        <Route
            path="/token-manager/"
            render={(props) => {
                console.log("token manager props", props)
                return <div>
                        <Loading isLoading={isLoading} />
                        <Header mycurrency={mycurrency} />
                        <CheckBalance checkBalance={checkBalance} mintTokens={mintTokens} />
                        <SendTransaction transferToken={transferToken} />
                </div>
            }}
        />
    )
}
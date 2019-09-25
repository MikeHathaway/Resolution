import React from 'react';
import { Action } from 'typesafe-actions';
// import styles from './index.css'

type SendTransactionProps = {
    transferToken: Action
}

export default function SendTransaction({transferToken}: SendTransactionProps){

	return (
        <form>
            Address to send to: <input type="text"/>
            <input type="submit" value="Submit" onSubmit={() => transferToken} />
        </form>
	)
}

import { call, put, select } from 'redux-saga/effects'
import Web3 from "web3";

import {
    Action,
    connectWeb3Success,
    connectWeb3Failure
} from '../actions'

// Import ABI from compiled smart contracts
import reviewCoinABI from "../abi/ReviewCoin.json"

declare global {
    interface Window { web3: Web3, ethereum: any }
}


/** 
    Use Web3.js to connect to Ethereum blockchain and store contract instance to state
*/
const getWeb3 = () =>
    new Promise((resolve, reject) => {
        window.addEventListener("load", () => {
            let web3 = window.ethereum
            const alreadyInjected = typeof web3 !== "undefined";
            if (alreadyInjected) {
                web3 = new Web3(web3);
                console.log("Injected web3 detected.");
                resolve(web3);
            } else {
                const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
                web3 = new Web3(provider);
                console.log("No web3 instance injected, using Local web3.");
                resolve(web3);
            }
        });
  });

function getDefaultAccount(web3: any){
    const injectedAccount = window.ethereum.enable().then((account: any) => {
      const defaultAccount = account[0];
      web3.eth.defaultAccount = defaultAccount;
      return defaultAccount
    })
    return Promise.resolve(injectedAccount);
}

function connectContract(web3: any){
    // Contract ABI, Contract Address
    return Promise.resolve(web3.eth.Contract(reviewCoinABI.abi,'0x441312C6737c611f0e537D25b1978361c1BdD732'));
}

export default function* connectWeb3(action: Action) {
    try {
        const web3 = yield call(getWeb3);
        const account = yield call(getDefaultAccount, web3);
        const ReviewDAOContract = yield call(connectContract, web3);

        yield put(connectWeb3Success(web3, account, ReviewDAOContract));        

    } catch (error) {
        yield put(connectWeb3Failure(error));
    }
}
import { connect } from "react-redux";
import {
    checkBalance,
    connectWeb3,
    transferToken,
    mintTokens
} from "./Store/actions";

export default function connectState (Component) {
    const mapStateToProps = (state) => {
        return state
    };
    
    const actions = {
        checkBalance,
        connectWeb3,
        transferToken,
        mintTokens
    }

    return connect (mapStateToProps, actions)(Component)
}

import Web3 from 'web3'
import {store} from '../store'

/**
 * set listening, update account if change
 */
let pollWeb3 = function () {
    let  web3 = window.web3;
    web3 = new Web3(web3.currentProvider);

    setInterval(() => {
        web3.eth.getAccounts()
            .then(result => {
                if (result[0] !== store.state.web3.coinbase) {
                    store.dispatch('pollWeb3', {
                        coinbase: result[0]
                    })
                }
            })
    },500)
}

export default pollWeb3
import Web3 from 'web3'
import { mvcFundAbi, crowdAbi, tokenAbi } from '../js/abi'
import { mvcFundingAddr, crowdAddr, tokenAddr } from '../js/contract'

export const tokenContract = new Promise(function(resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider);

    let contract = new web3.eth.Contract(tokenAbi, tokenAddr);
    console.log("tokenContract",contract);

    resolve(contract);
})
export const crowdContract = new Promise(function(resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider);
    let contract = new web3.eth.Contract(crowdAbi, crowdAddr);
    console.log("mvcContract",contract);

    resolve(contract);
})


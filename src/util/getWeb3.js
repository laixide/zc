import Web3 from 'web3'

let getWeb3 = new Promise(function (resole, reject) {
    var web3js = window.web3
    console.log(web3js);
    var web3;
    if (typeof web3js !== 'undefined') {
        web3 = new Web3(web3js.currentProvider)
        console.log(web3);
        resole({
            //injectedWeb3: web3.isConnected(),
            web3 () {
                return web3
            }
        })
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log(web3);

        if (web3 == null) {
            reject(new Error("connected failed"));
        }else {
            resole({
                //injectedWeb3: web3.isConnected(),
                web3 () {

                    return web3
                }
            });
        }
    }
})
   .then(result => {
        return new Promise(function (resolve, reject) {
            result.web3().eth.net.getId((err, networkId) => {
                if (err) {
                    reject(new Error('Unable to retrieve network Id'))
                }else {
                    result = Object.assign({}, result, {networkId})
                    resolve(result)
                }
            })

        })
    })
    .then(result => {
        return new Promise(function (resolve, reject) {
            result.web3().eth.getCoinbase((err, coinbase) => {
                if (err) {
                    reject(new Error('Unable to retrieve coinbase'))
                } else {
                    console.log("coinbase",coinbase);
                    result = Object.assign({}, result, { coinbase })
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function (resolve, reject) {
            result.web3().eth.getBalance(result.coinbase, (err, balance) => {
                if (err) {
                    reject(new Error('Unable to retreve balance for address:'+ result.coinbase))
                }  else {
                    result = Object.assign({}, result, { balance })
                    resolve(result)
                }
            })
        })
    })
export default getWeb3
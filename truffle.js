/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
// 定义HDWalletProvider对象
var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "file asthma move mean depart sand stomach segment law iron trumpet bracket";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
      ropsten: {
          provider: function() {
              return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/7886f7a2f46248e09932323f2b3916d2')

          },
          network_id: '3',

      },
      gethNet: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
      },
      ganacheNet: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "*" // Match any network id
      }
  }
};

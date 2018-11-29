import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import { tokenContract,crowdContract } from '../util/getContract'
import pollWeb3 from '../util/pollWeb3'

Vue.use(Vuex)


export const store = new Vuex.Store({
    strict: true,
    state,
    mutations: {
      registerWeb3Instance (state, payload) {
          console.log('registerWeb3instance Mutation beging executed', payload)
          let result = payload
          let web3Copy = state.web3
          web3Copy.coinbase = result.coinbase
          web3Copy.networkId = result.networkId
          web3Copy.balance = result.balance
          web3Copy.web3Instance = result.web3

          state.web3 = web3Copy
          pollWeb3()
      },
      registerCrowd (state, playload) {
          console.log('registerCrowd Mutation beging executed',playload)

          state.crowdInstance = () => playload
      },
      registerKcc (state, playload) {
          console.log('registerCrowd Mutation beging executed',playload)

          state.kccInstance = () => playload
      },
      pollWeb3Instance (state, playload) {
          console.log('pollWeb3Instance mutation beging executed',playload)
          state.web3.coinbase = playload.coinbase
      }
    },
    actions: {
        registerWeb3 ({commit}) {
          console.log('registerWeb3 Action beging executed')
          getWeb3.then(result => {
              console.log('committing result to registerWeb3Instance mutation')
              commit('registerWeb3Instance',result);
          })
        },
        registerCrowd ({commit}) {
            console.log('registerCrowd Action beging executed')
            crowdContract.then(result => {
                console.log('committing result to registerCrowd mutation')
                commit('registerCrowd', result)
            })
        },
        registerKcc ({commit}) {
            console.log('registerKcc Action beging executed')
            tokenContract.then(result => {
                console.log('committing result to registerKcc mutation')
                commit('registerKcc', result)
            })
        },
        pollWeb3 ({commit}, playload) {
            console.log('pollWeb3 Action beging executed')
            commit('pollWeb3Instance',playload)
        }
    }
})

<template>
    <div class="home">
        <div class="container projects">

            <div class="projects-header page-header">
                <h2>优质众筹项目</h2>
                <p>基于以太坊的dapp，去中心化，售票自动分账。</p>
            </div>

            <div class="row">

                <div class=" col-md-7" >
                    <img src="../images/1.png" width="600" height="400" />
                    <div class='btn-margin'>
                        <input type="text" class="getWei form-control weiclass" placeholder="请输入以太币" v-model="ethAmount"  >
                        <button type="button" class="btn btn-danger" @click="recharge" >充值</button>
                        <input type="text" class="form-control weiclass" placeholder="请输入kcc*100" v-model="voteValue">
                        <button type="button" class="btn btn-primary" @click="vote">投票支持</button>
                        <button type="button" class="btn btn-primary" @click="getInfo">刷新数据</button>
                    </div>
                </div>

                <div class=" col-md-5" >
                    <ul class="layout">

                        <li >
                            电影名称: {{ moveInfo.name }}
                        </li>

                        <li>
                            持有份额:{{ moveInfo.proportion }}
                        </li>

                        <li >
                            MVC数量:{{ moveInfo.mvc }}
                        </li>

                        <li >
                            KCC余额:{{ moveInfo.kcc }}
                        </li>

                        <li >
                            投票时间:{{ moveInfo.time }}
                        </li>
                        <li >
                            截止日期:{{ moveInfo.endDate }}
                        </li>
                    </ul>
                </div>

            </div>
            <br/>
            <div></div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import Web3 from 'web3'

    export default {
        name: "Home",
        data() {
            return {
                moveInfo: {
                    name: "",
                    proportion: "",
                    mvc: null,
                    kcc: null,
                    time: null,
                    endDate: null

                },
                ethAmount: null,
                voteValue: null

            }
        },
        beforeCreate () {
            //this.$store.dispatch('registerWeb3');
            Promise.all([this.$store.dispatch('registerWeb3'),this.$store.dispatch('registerCrowd'), this.$store.dispatch('registerKcc')])
                .then(() => {
                    this.getInfo();
                })
        },
        computed : {
            web3() {
                return this.$store.state.web3.web3Instance();
            },

            crowdContract() {

                return this.$store.state.crowdInstance()
            },
            kccContract() {
                return this.$store.state.kccInstance()
            },
            currentAccount() {
                return this.$store.state.web3.coinbase
            }
        },

        watch: {
            //监听MetaMask账户变化，切换用户重新获取众筹信息
            currentAccount: function (val) {
                this.getInfo();
            }
        },
        methods: {
            test() {
                console.log(this.kccContract)

                this.kccContract.methods.totalSupply().call().then(console.log)
            },
            getInfo() {

                this.crowdContract.methods.desc().call()
                    .then(result => {
                       this.moveInfo.name = result
                    });

                this.crowdContract.methods.endTime()
                    .call()
                    .then(result => {
                        this.moveInfo.endDate = this.formatDate(result);
                    })

                this.crowdContract.methods.crowdInfo(this.currentAccount)
                    .call()
                    .then(result => {
                        this.moveInfo.mvc = result.amount;
                        this.moveInfo.time = this.formatDate(result.crowdTime);

                        this.crowdContract.methods.totalSupply()
                            .call()
                            .then(r => {
                                var p = result.amount / r;
                                this.moveInfo.proportion = p +"%";
                            })
                    })

                this.kccContract.methods.balanceOf(this.currentAccount)
                    .call()
                    .then(result => {
                        //console.log("kcc",result)
                        this.moveInfo.kcc = result;
                    })


            },
            recharge() {
                var value = this.web3.utils.toWei(this.ethAmount,'ether');

                this.kccContract.methods.buyKcc()
                    .send({
                        from: this.currentAccount,
                        gas: 3000000,
                        value: value
                    })
                    .on('transactionHash', hash => {
                        this.ethAmount = null;
                    })
                    .on('receipt',receipt => {

                        this.getInfo()
                    })
                    .on('confirmation', (confirmation, receipt) => {

                    })
                    .on('error', error => {
                        console.log(error);
                    })
            },
            vote() {

               this.crowdContract.methods.buyMvc(this.voteValue)
                   .send({
                       from: this.currentAccount,
                       gas: 3000000
                   })
                   .on('transactionHash', hash => {
                       this.voteValue = null;
                   })
                   .on('receipt', receipt => {
                       this.getInfo();
                   })
                   .on('error', error => {
                       console.log(error);
                   })
            },
            formatDate(time) {
                if (time == 0) {
                    return "";
                }
                var date = new Date(time*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
                var D = date.getDate() + ' '
                //var h = date.getHours() + ':'
                //var m = date.getMinutes() + ':'
                //var s = date.getSeconds()
                return Y+M+D
            }

        }
    }
</script>

<style scoped>
    .movie{
        width: 80%;
        margin:50px auto 40px;
        display: flex;
        justify-content: space-between;
    }
    .movie img{
        width: 500px;
        height: 500px;
    }
    .movie .btn-margin{
        text-align: center;
        margin-top: 20px;
    }
    .weiclass{
        width: 150px;
        display: inline-block;
    }

    .layout{
        width: 90%;
        margin: 20px auto;
        text-align: left;
    }
    .layout li{
        font-size: 25px;
        margin-top: 20px;
    }
</style>
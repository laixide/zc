<template>
    <div class="ticket">
        <div class="container-msg">
            <div class="movie">
                <div class="col-md-7">
                    <img src="../images/2.jpeg" alt="some_text">
                </div>
                <div class="col-md-5">
                    <ul class="layout">

                        <li class="MovieName">
                            <span>电影名称:</span>
                            <span>{{ moveName }}</span>
                        </li>

                        <li class="MoviePrice">
                            <span>电影票价:0.02ETH</span>
                            <span></span>
                        </li>

                    </ul>
                    <div class='btn-margin'>
                        <button type="button" class="Buy btn btn-danger" @click="buyTicket">购买</button>
                        &nbsp;<input type="text" v-model="ticketCount">&nbsp;<label>张</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Ticket",
        data () {
            return {
                moveName: "",
                ticketCount: null,
            }
        },
        computed : {
            web3() {
                return this.$store.state.web3.web3Instance();
            },
            crowdContract() {

                return this.$store.state.crowdInstance()
            },
            currentAccount() {
                return this.$store.state.web3.coinbase
            }
        },
        created () {

            Promise.all([this.$store.dispatch('registerWeb3'),this.$store.dispatch('registerCrowd')])
                .then(() => {
                    this.getMoveName();
                })
        },
        watch: {
           currentAccount: function (val) {
               this.getMoveName();
           }
        },
        methods: {
            getMoveName() {
                this.crowdContract.methods.desc()
                    .call()
                    .then(result => {
                        this.moveName = result;
                    })
            },
            buyTicket() {

                var num = this.ticketCount * 0.02;
                let value = this.web3.utils.toWei(num.toString(),'ether');

                this.crowdContract.methods.ticketBooking()
                    .send({
                        from: this.currentAccount,
                        gas: 3000000,
                        value: value
                    })
                    .on('receipt', receipt => {
                        console.log("buy successful");
                        alert("购买成功")
                    })
                    .on('error', error => {
                        console.log(error);
                    })
            }

        }
    }
</script>

<style scoped>
    .layout{
        width: 90%;
        margin: 20px auto;
        text-align: left;
    }
    .layout li{
        font-size: 25px;
        margin-top: 20px;
    }
    .btn-margin {
        width: 90%;
        margin: 20px auto;
        text-align: left;
    }
    .btn-margin label{
        font-size: 20px;
        margin-top: 20px;
    }
</style>
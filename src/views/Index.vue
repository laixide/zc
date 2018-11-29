<template>
    <div class="index">
        <Head></Head>

        <router-view></router-view>

    </div>

</template>

<script>
import Head from '../components/Head'
    export default {
        name: "Index",
        components: {
            Head
        }
    }
</script>

<style scoped>
    .head {
        padding: 30px;
    }

</style>
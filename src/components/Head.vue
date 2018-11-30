<template>
    <div class="head">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">以太坊众筹</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><router-link to="/">首页</router-link></li>
                        <li><router-link to="/ticket">电影票</router-link></li>
                        <li><router-link to="/center"></router-link></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>

    </div>
</template>

<script>
    export default {
        name: "Head"
    }
</script>

<style scoped>

</style>
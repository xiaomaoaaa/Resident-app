<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <div class="container"></div>
</div>
</template>
<script>
import ProgressBar from './progressbar.min.js'
export default {
    data: function() {},
    computed: {},
    components: {},
    methods: {},
    mounted() {
        var progressBar = new ProgressBar.Circle('.container', {
            strokeWidth: 2
        })
    }
}
</script>
<style scoped>
</style>

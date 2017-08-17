<template>
<div class="app" style="overflow-x:hidden;">
    <div class="header">
        <mt-header title="协议详情">
            <a slot="left" @click='goBack'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>

    <div class="xieyi" ref='xieyiCont' style="font-size:16px;"></div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    data: function() {
        return {}
    },
    computed: {
        ...mapState({
            xieyiCont: state => state.xieyiCont
        })
    },
    components: {},
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
    mounted() {
        this.$refs.xieyiCont.innerHTML = this.xieyiCont
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .3rem
.header {
    .mint-header {
        height: 1rem;
        font-size: .4rem;
        background-color: mainColor;
    }
}
</style>

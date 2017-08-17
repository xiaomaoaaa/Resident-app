<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header title="选择家医">
            <router-link to="/zbl_qyxq" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>

    <div class="body">
        <div class="container">
            <p>{{tuandui}}<span>{{shequ}}</span></p>
            <p><img src="../../assets/img/zbl_qyys.png">签约医生<span>{{num}}</span></p>
            <mt-cell title="" is-link to='/qyxq'>
                <span style="color:grey;text-align:left">
                    <span>赵启平</span>
                <span>全科医生</span>
                </span>
            </mt-cell>
            <mt-cell title="" is-link to='/'>
                <span style="color:grey">选择医生</span>
            </mt-cell>
            <mt-cell title="" is-link to='/'>
                <span style="color:grey">选择医生</span>
            </mt-cell>
        </div>
    </div>
</div>
</template>
<script>
import {
    MessageBox,
    Toast
} from 'mint-ui'
import {
    requestLogList
} from '../../api/api'
import {
    mapState,
    mapGetters
} from 'vuex'
export default {
    data: function() {
        return {
            tuandui: '龙山团队',
            shequ: '五桂山社区服务中心',
            num: "120",
        }
    },
    computed: {},
    components: {},
    methods: {}
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
}
.body {
    .container {
        padding-top: .2rem
        background: #fff
        color: greyFont
        p:nth-child(1) {
            margin-left:.2rem
            margin-bottom: .2rem
            font-size: fontSize
            color: mainColor
            span {
                margin-left: .2rem
                font-size: .3rem
                color: greyFont
            }
        }
        p:nth-child(2) {
            margin: .2rem
            font-size: .35rem
            span {
                margin-left: .2rem
            }
        }
        img {
            width: .4rem
            height: .4rem
            margin-right: .3rem
        }
    }
}
</style>

<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header title="提交成功">
            <a slot="right" @click='$router.push("qyxq_signrecord")'>
                <mt-button class="smallbtn">签约记录</mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="checked">
            <img src="../../assets/img/zbl_success.png">
            <p>已向{{doctorName}}医生提交签约申请</p>
            <p>请耐心等待医生审核</p>
        </div>
        <div class="btn-group">
            <mt-button @click.native="$router.push('/zbl_jmqy')" size="small">继续签约</mt-button>
            <mt-button @click.native="$router.push('xie_home')" size="small">返回首页</mt-button>
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
    mapActions,mapState
} from 'vuex'
import {
    commonAjax,
} from '../../api/api.js'
export default {
    data: function() {
        return {
            doctorName: ''
        }
    },
    computed: {
        ...mapState({
        }),
    },
    components: {},
    methods: {
         ...mapActions([])
    },
    created() {
        this.doctorName = JSON.parse(sessionStorage.getItem('zbl_teamInfo')).teamLeader
    },
    mounted() {
    },
    beforeRouteLeave(to, from, next) {
        // this.zbl_editPhoneNo('')
        // this.zbl_selectAddress({})
        // this.zbl_selectPackages([])
        // this.selectDocTeam({})
        next()
    },
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
        .smallbtn {
            font-size: .3rem;
        }
    }
}
.body {
    .checked {
        padding: .5rem 0;
        font-size: fontSize;
        text-align: center;
        background: #fff;
        line-height: 1.8;
        img {
            width: 70px;
            height: 70px;
        }
        p:nth-child(2) {
            color: mainColor;
        }
        p:nth-child(3) {
            color: grey;
            font-size: .3rem;
        }
    }
    .btn-group {
        margin-top: .4rem;
        margin-bottom: .8rem;
        .mint-button {
            display: block;
            width: 80%;
            height: .8rem;
            margin: .4rem auto;
            margin-bottom: .2rem;
            color: #fff;
            background-color: mainColor
            cursor: pointer;
            font-size:fontSize;
        }
        .mint-button:nth-child(2) {
            background-color: #F1C50E;
        }
    }

}
</style>

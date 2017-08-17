<template>
<div class="zbl_qyxq_signed" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <div class="header">
        <mt-header title="解除签约">
            <a slot="left" @click="$emit('homeShow',true)">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="body">
        <mt-checklist align="right" title="请选择解除签约的原因" v-model="valueCancelResons" :options="optionsCancelResons"></mt-checklist>
        <mt-button size="small" @click.native='submitReason'>确定</mt-button>
    </div>
</div>
</template>
<script>
import cancelSign from './cancelSign.vue'
import {
    MessageBox,
    Toast,
    Indicator
} from 'mint-ui'
import {
    commonAjax,
    commonAjaxKy,
    signCancelReasonDicAjax
} from '../../api/api'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    props: ['optionsCancelResons','signId'],
    data: function() {
        return {
            valueCancelResons: [],
        }
    },
    computed: {
    },
    methods: {
        submitReason() {
            let params = [{
                "signId": this.signId,
                "reason": this.valueCancelResons.join(',')
            }]

            console.log(params)
            commonAjax(params, 'pcn.pcnSignCancelService', 'pcnSignCancel').then(res => {
                if (res.code === 200) {
                    // this.$emit('homeShow',true)
                    this.$router.push('/zbl_jmqy')
                }
            })
        },
        ...mapActions(['xieyiCont', 'getDoctorDetail'])
    },
    mounted() {
    }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/css/zbl_style.css'
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    .mint-header {
        height: 1rem;
        font-size: .4rem;
        background-color: mainColor;
    }
    .smallbtn {
        font-size: .8rem;
    }
}
.body {
    .green {
        height: .4rem;
        background-color: mainColor;
    }
    .avatarHeader {
        background-color: #fff;
        padding: .3rem;
        .items {
            margin: 0 .3rem;
            text-align: center;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .selected {
                transform: scale(1.2,1.2);
                transition: 1s transfrom;
                z-index: 666;
                border: 1px solid lightgreen;
            }
            p {
                margin-top: 10px;
                font-size: .3rem;

            }
        }
    }
    .queryIcon {
        padding: 0.3rem;
        background-color: #fff;
        margin: 10px 0;
        img {
            width: 30px;
            height: 30px;
            margin-left: 10px;
        }
        p {
            font-size: .3rem;
        }
    }
    .mint-button {
        display: block;
        width: 90%;
        height: .9rem;
        margin: 40px auto;
        background-color: #67cc70;
        color: #fff;
        font-size: .3rem;
    }
}
</style>

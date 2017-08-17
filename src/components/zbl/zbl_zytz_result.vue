<template>
<div class="zbl_zytz_result" style="overflow-x:hidden;background-color:#fff;height:100vh;">
    <div class="header">
        <mt-header title="中医体质辨识">
            <a slot="left" @click='$router.push("/xie_tvm_constitution")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="body">
        <div class="itemList" v-for='item in result'>
            <img :src="imgSrcDic[item.fileId]" class="avatar">
            <div class="text">
                <p>{{fileIdDic[item.fileId]}}</p>
                <p>{{item.score}}分</p>
            </div>
            <div class="rightOr">
                <div v-if='item.fileId === 10'>
                    <span v-if='item.state === 1' class="right">是</span>
                    <span v-if='item.state === 2' class="perhepsRight">基本是</span>
                </div>
                <div v-else>
                    <span v-if='item.state === 1' class="right">是</span>
                    <span v-if='item.state === 2' class="perhepsRight">倾向是</span>
                </div>
            </div>
            <div class="link" v-if='item.state != 3' @click='physicalType(item.fileId)'>
                <span>中医指导</span>
                <img src="../../assets/img/zy_right.png">
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    commonAjax,
    commonAjaxKy
} from '../../api/api.js'
import {
    Indicator,
    Progress,
    Radio,
    MessageBox,
    Toast
} from 'mint-ui'
export default {
    data: function() {
        return {
            result: [],
            fileIdDic: ['','','阳虚质','阴虚质','气虚质','痰湿质','湿热质','血淤质','特禀质','气郁质','平和质'],
            imgSrcDic: [
                '',
                '',
                require('../../assets/img/yang_yxz.png'),
                require('../../assets/img/yin_yxz.png'),
                require('../../assets/img/deficiency_qxz.png'),
                require('../../assets/img/sputum_tsz.png'),
                require('../../assets/img/humid_srz.png'),
                require('../../assets/img/blood_xyz.png'),
                require('../../assets/img/specific_tbtz.png'),
                require('../../assets/img/stagnation_qyz.png'),
                require('../../assets/img/peaceful_phz.png')
            ]
        }
    },
    computed: {},
    components: {},
    methods: {
        physicalType(type) {
            this.$router.push({
                path: '/zbl_zytz_physical',
                query: {typeId:type}
            })
        }
    },
    created() {},
    mounted() {
        if(this.$route.query.recordId) {
            let params = [this.$route.query.recordId]
            commonAjaxKy(JSON.stringify(params), 'hcn.physiqueService', 'getPhysiqueHistoryResult')
                .then(res => {
                    if (res.code === 200) {
                        let tempArr = res.body
                        tempArr.forEach(item => {
                            item.fileId = item.physiqueType
                            item.score = item.physiqueCore
                            item.state = item.identifyResult
                        })
                        this.result = tempArr
                    }
                })
        } else {
            this.result = this.$route.query.result
        }
    },
}
</script>
<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 11;
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
}
.body {
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    .itemList {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: .35rem;
        padding: 10px 0 10px 20px;
        border-bottom: 1px solid #ddd;
        .avatar {
            width: 1.2rem;
            height: 1.2rem;
        }
        .text {
            margin: 0 20px;
            line-height: 1.5;
        }
        .rightOr {
            .right {
                display: inline-block;
                padding: .1rem;
                text-align: center;
                color: #fff;
                background-color: red;
                border-radius: 100%;
            }
            .perhepsRight {
                display: inline-block;
                padding: .1rem;
                text-align: center;
                color: #fff;
                background-color: red;
                border-radius: 100%;
            }
        }
        .link {
            position: absolute;
            right: 0;
            margin-right: 10px;
            span {
                font-size: .3rem;
                color: grey;
            }
            img {
                 width: .2rem;
                 height: .2rem;
                 margin-left: 8px;
            }
        }
    }
}
</style>

<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <div class="header">
        <mt-header title="签约记录">
            <a slot="left" @click='$router.go(-1)'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="items" v-for='item in signRecordArr' @click='selectedItem(item)'>
            <p>
                <span class="doctorName">{{item.doctorName}}</span>
                <span style="font-size:.3rem;">{{item.doc_type | filterDocType}}</span>
                <span style="font-size:.3rem;">{{item.teamName}}</span>
            </p>
            <p>{{item.orgName}}</p>
            <p><span>签约居民</span><span>{{item.personName}}</span></p>
            <p><span>提交时间</span>{{item.applyDt}}</p>
            <div class="status orange" v-show='item.status === "1"'>待确认</div>
            <div class="status green" v-show='item.status === "2"'>已签约</div>
            <div class="status red" v-show='item.status === "3"'>未通过</div>
            <div class="status" v-show='item.status === "4"'>已取消</div>
            <div class="status" v-show='item.status === "5"'>已解约</div>

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
            signRecordArr: []
        }
    },
    filters: {
        filterDocType(value) {
            let docTypeDic = ['','全科医生','全科护士','公卫医生','公卫护士','计生医生','中医师','','','其他']
            if(value !== null) {
                return docTypeDic[parseInt(value)]
            }
        }
    },
    computed: {
        ...mapState({
            zbl_personInfo: state => state.zbl_personInfo,
        }),
    },
    components: {},
    methods: {
        selectedItem(item) {
            // console.log(item)
            this.$router.push({
                path: '/qyxq_signRecordDetail',
                query: {
                    'id': item.applyId,
                    'idType': item.idType,
                    'idOrNo': item.idOrNo
                }
            })
        },
    },
    created() {
    },
    mounted() {
        let params = [JSON.parse(sessionStorage.getItem('common_signApplyInfo')).mpiId] //表示主人的mpiId
        commonAjax(params, 'pcn.residentSignService', 'querySignRecord').then(res => {
            if (res.code === 200) {
                // console.log(res.body)
                this.signRecordArr = res.body.reverse()
            }
        })
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
    }
}
.body {
    .items {
        position: relative;
        margin-top: 10px;
        background-color: #fff;
        padding: .3rem;
        font-size: .4rem;
        line-height: 1.8;
        span {
            margin-right: .2rem;
        }
        .doctorName {
             color:green;
             font-size:.4rem;
        }
        .status {
            position: absolute;
            right: 20px;
            top: 35%;
            color: grey;
        }
        .orange {
            color: orange;
        }
        .red {
            color: red;
        }
        .green {
            color: green;
        }
    }

}
</style>

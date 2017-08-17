<template>
<div class="zbl_qyxq_signed" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <div class="pageHome" v-if='homeShow'>
        <div class="header">
            <mt-header title="家医服务">
                <a slot="left" @click='$router.go(-1)'>
                    <mt-button icon="back"></mt-button>
                </a>
                <a slot="right" @click='$router.push("/zbl_jmqy")'>
                    <mt-button class="smallbtn">+</mt-button>
                </a>
            </mt-header>
        </div>

        <div class="body">
            <div class="avatarHeader cbafter">
                <div class="items fl" v-for="item in queryFamilyArr">
                    <img :src="imgReqUrl + item.avatar" v-if='item.avatar' class="avatar" @click='selectPerson(item,$event)' :id='item.mpiId'>
                    <img src="../../assets/img/zbl_avatar.png" v-else class="avatar" @click='selectPerson(item,$event)' :id='item.mpiId'>
                    <p>{{item.personName}}</p>
                </div>
            </div>

            <div class="queryIcon" @click="weChat">
                <img src="../../assets/img/zbl_query.png" v-if='zixun'>
                <p v-if='zixun'>咨询互动</p>
            </div>

            <div class="container">
                <mt-cell title="签约医生" is-link @click.native='lookSignedDoct'>
                    <span style="" v-if='this.docInfo.name'>{{this.docInfo.name + ' ' +this.docInfo.teamName}}</span>
                    <span v-else @click='stopDefault'>暂无数据</span>
                </mt-cell>
                <mt-cell title="签约机构">
                    <span style="margin-right:25px" v-if='this.docInfo.orgName'>{{this.docInfo.orgName}}</span>
                    <!-- <span v-else>暂无数据</span> -->
                </mt-cell>
                <mt-cell title="签约周期">
                    <span style="margin-right:25px" v-if='this.docInfo.beginDate'>{{this.docInfo.beginDate+'--'+this.docInfo.endDate}}</span>
                    <!-- <span v-else>暂无数据</span> -->
                </mt-cell>
                <mt-cell title="签约协议" is-link @click.native='lookXieyi'>
                    <span style=''>请查看</span>
                </mt-cell>
                <mt-cell title="签约服务包" is-link @click.native='lookServerPackages'>
                    <span style="">请查看</span>
                </mt-cell>
                <mt-cell title="解除签约" is-link @click.native='lookServerCount' v-if='isCancel == 1'>
                    <span style="" v-if='!selectedVal2'>{{cancelSignTimes}}</span>
                    <span v-else>{{selectedVal2}}</span>
                </mt-cell>
            </div>
        </div>
    </div>

    <cancelSign :optionsCancelResons='optionsCancelResons' :signId='signId' @homeShow='homeShowTrue' @selectedVal='selectedVal' v-else></cancelSign>
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
    data: function() {
        return {
            qianyueyisheng: '',
            qianyuejigou: '',
            qianyuezhouqi: '',
            docInfo: {},
            queryFamilyArr: [],
            imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
            zixun: false,
            homeShow: true,
            signId: '',
            isCancel: '',
            cancelSignTimes: '',
            optionsCancelResons: [],
            selectedVal2: ''
        }
    },
    computed: {
        ...mapState({
            zbl_personInfo: state => state.zbl_personInfo
        }),
    },
    components: {
        cancelSign
    },
    methods: {
        //第1个参数表示租户，第2个参数表示登录用户id或者个人索引(mpiId),第三个参数：0表示
        //非本人(非本人的时候第二个参数传家庭成员主索引mpiId)，1本人(本人的时候第二个参数传用户id(登陆用户))
        getAjax() {
            let params2 = []
            if (sessionStorage.getItem('zbl_routerFlag') === '1') {
                params2 = ["hcn.shenzhen", this.zbl_personInfo.mpiId, "0"]
            } else {
                params2 = ["hcn.shenzhen", this.queryFamilyArr[0].mpiId, "0"]
            }
            // console.log(sessionStorage.getItem('zbl_routerFlag'))
            Indicator.open('加载中...')
            commonAjaxKy(JSON.stringify(params2), 'pcn.residentSignService', 'querySignInfo').then(res => {
                if (res.code === 200) {
                    Indicator.close()
                    this.docInfo = res.body.docInfo
                    this.signId = this.docInfo.signId
                    sessionStorage.removeItem('zbl_routerFlag')
                    let obj = {}
                    obj.docInfo = res.body.docInfo
                    if (this.zbl_personInfo.mpiId) {
                        obj.selectedPersonInfo = this.zbl_personInfo
                    } else {
                        obj.selectedPersonInfo = this.queryFamilyArr[0]
                    }
                    sessionStorage.setItem('zbl_docInfo', JSON.stringify(obj))
                } else {
                    Indicator.close()
                    MessageBox('提示', '请求超时,请重试')
                }
            })
            commonAjax([params2[1]], 'pcn.pcnSignResidentPackService', 'getSignResidentPack').then(res => {
                if (res.code === 200) {
                    // console.log(res)
                    for (let i = 0; i < res.body.length; i++) {
                        if (/咨询互动/.test(res.body[i].spPackName)) {
                            this.zixun = true
                            break
                        } else {
                            this.zixun = false
                        }
                    }
                }
            })
            commonAjax([{
                'mpiId': params2[1]
            }], 'pcn.pcnSignCancelService', 'check').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    this.cancelSignTimes = res.body.cancelSignTimes
                    this.isCancel = res.body.isCancel
                }
            })
        },
        lookSignedDoct() {
            // ["hcn.zhongshan","84","8376cb57-71ea-4be2-89ab-aab753df27a2"]
            let params = ["hcn.shenzhen", this.docInfo.teamId, this.docInfo.doctorId]
            commonAjax(params, 'pcn.residentSignService', 'getDoctorDetail').then(res => {
                if (res.code === 200) {
                    let obj = {}
                    obj.resBody = res.body
                    obj.teamId = this.docInfo.teamId
                    obj.selectedTeamName = this.docInfo.teamName
                    obj.homeTeamOrgName = this.docInfo.orgName
                    obj.requestTeamInfoParams = params.slice(1)
                    this.getDoctorDetail(JSON.stringify(obj))
                    // console.log(obj)
                    this.$router.push('/qyxq_doctordetail')
                }
            })
        },
        lookServerPackages() {
            // let params = ["e64299249f7b410991cc17b5d81d67e4"]
            let params = [this.docInfo.mpiId]
            // console.log(params)
            commonAjax(params, 'pcn.pcnSignResidentPackService', 'getSignResidentPack').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    sessionStorage.setItem('zbl_signedPackages', JSON.stringify(res.body))
                    this.$router.push('/qyxq_signedPackage')
                }
            })
        },
        lookXieyi() {
            // [{"signId":"8","mpiId":"","teamId":""}]
            let obj = {}
            obj.signId = this.docInfo.signId
            let params = [obj]
            commonAjax(params, 'pcn.signProtocalService', 'getSignProtocal').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    this.xieyiCont(JSON.stringify(res.body.protocalText))
                    this.$router.push('/qyxq_xieyi')
                }
            })
        },
        lookServerCount() {
            this.homeShow = false
        },
        homeShowTrue(val) {
            this.homeShow = val
        },
        selectedVal(val) {
            this.selectedVal2 = val[0]
        },
        weChat() {
            this.$router.push({
                path: "/zy_consult_detail"
            })
        },
        selectPerson(item, e) {
            let avatarImgs = document.querySelectorAll('.avatarHeader .avatar')
            for (let i = 0; i < avatarImgs.length; i++) {
                avatarImgs[i].classList.remove('selected')
            }
            e.currentTarget.classList.add('selected')
            let params = ["hcn.shenzhen", e.currentTarget.id, "0"]
            commonAjaxKy(JSON.stringify(params), 'pcn.residentSignService', 'querySignInfo').then(res => {
                if (res.code === 200) {
                    this.docInfo = res.body.docInfo
                    this.signId = this.docInfo.signId
                    let obj = {}
                    obj.docInfo = res.body.docInfo
                    obj.selectedPersonInfo = item
                    sessionStorage.setItem('zbl_docInfo', JSON.stringify(obj))
                }
            })
            commonAjax([params[1]], 'pcn.pcnSignResidentPackService', 'getSignResidentPack').then(res => {
                if (res.code === 200) {
                    // console.log(res)
                    for (let i = 0; i < res.body.length; i++) {
                        if (/咨询互动/.test(res.body[i].spPackName)) {
                            this.zixun = true
                            break
                        } else {
                            this.zixun = false
                        }
                    }
                }
            })
        },
        stopDefault(e) {
            e.stopDefault()
        },
        ...mapActions(['xieyiCont', 'getDoctorDetail'])
    },
    mounted() {
        let params = ["hcn.shenzhen", JSON.parse(sessionStorage.getItem("userInfo")).body.userId]
        commonAjaxKy(JSON.stringify(params), 'pcn.residentSignService', 'queryFamily').then(res => {
            if (res.code === 200) {
                this.queryFamilyArr = res.body.filter(item => {
                    return item.status === '2'
                })
                this.$nextTick(() => {
                    if (sessionStorage.getItem('zbl_routerFlag') === '1') {
                        document.getElementById(this.zbl_personInfo.mpiId).classList.add('selected')
                    } else {
                        document.querySelectorAll('.avatarHeader .avatar')[0].classList.add('selected')
                    }
                })
            }
        }).then(() => {
            this.getAjax()
        })
        signCancelReasonDicAjax().then(res => {
            res.items.forEach(item => {
                let obj = {}
                obj.label = item.text
                obj.value = item.text
                this.optionsCancelResons.push(obj)
            })
        })
    },
    beforeRouteEnter(to, from, next) {
        if (from.path === '/zbl_jmqy') {
            sessionStorage.setItem('zbl_routerFlag', '1')
        } else {
            sessionStorage.setItem('zbl_routerFlag', '2')
        }
        next()
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

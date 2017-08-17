<template>
<div class="app" style="overflow-x:hidden">
    <div class="header">
        <mt-header title="签约详情">
            <a slot="left" @click='$router.push("/zbl_jmqy")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="personInfo">
            <div class="left-avatar">
                <img src="../../assets/img/zbl_avatar.png" alt="头像">
            </div>
            <div class="right-info">
                <p class="withline">
                    <span class="name">{{personName}}</span>
                    <span class="age">{{age}}岁</span>
                    <img :src="sex ==='1'?sexImg[0]:sexImg[1]" alt="性别" class="sex">
                </p>
                <p><span class="grey">证件类型</span><span>{{idType | filterIdType}}</span></p>
                <p><span class="grey">证件号码</span><span>{{idOrNo}}</span></p>
                <!-- <p><span class="grey">社保卡号</span><span>{{shebaoID}}</span></p> -->
            </div>
        </div>
        <div class="divide"></div>
        <div class="container addressPhone cbafter">
            <mt-field label="手机号码" type="tel" :value='zbl_phoneNo' @input='editPhoneNo'></mt-field>
            <mt-cell title="居住地址" is-link @click.native='clkHomeTown'>
                <span v-show='!zbl_address.decText'>请输入</span>
                <span v-show='zbl_address.decText' class="hideMore">{{zbl_address.decText}}</span>
            </mt-cell>
        </div>
        <div class="divide"></div>
        <div class="container">
            <mt-cell title="家庭医生" is-link @click.native='selectDoctorTeam'>
                <span v-show='!selectDocTeam.selectTeam'>请选择</span>
                <span v-show='selectDocTeam.selectTeam' class="hideMore">{{selectDocTeam.selectTeam}}</span>
            </mt-cell>
            <mt-cell title="服务包" is-link @click.native='clkPackages'>
                <span>
                    <span v-show='!zbl_packages.length'>请查看</span>
                <span v-show='zbl_packages.length' class="hideMore">{{zbl_packages}}</span>
                </span>
            </mt-cell>
            <mt-cell title="签约机构">
                <span style="margin-right:25px" v-show='!selectDocTeam.orgName'>请输入</span>
                <span style="margin-right:25px" v-show='selectDocTeam.orgName' class="hideMore">{{selectDocTeam.orgName}}</span>
            </mt-cell>
            <mt-cell title="签约周期">
                <span style="margin-right:25px">1年</span>
            </mt-cell>
        </div>
        <div class="handUp">
            <p class='agreenment'><input type="checkbox" value='length' @click='checkRead' ref='checkRead'>已阅读并同意<span @click='qianyuexieyi'>《签约协议》</span></p>
            <mt-button @click.native="submit" size="small" :id="flag?'btnBlue':'btnGrey'">提交申请</mt-button>
            <p class="creditable">实名制签约，请确保所有资料真实有效</p>
        </div>
    </div>
</div>
</template>
<script>
import md5 from 'md5'
import {
    MessageBox,
    Toast,
    Indicator
} from 'mint-ui'
import {
    commonAjax,
    requestLoginon,
    areaAjax,
    commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
import Vue from 'vue'
import axios from 'axios'

export default {
    data: function() {
        return {
            personName: '',
            age: '',
            sex: '',
            sexImg: [require('../../assets/img/zbl_male.png'), require('../../assets/img/zbl_female.png')],
            idType: '',
            idTypeDic: ['','居民身份证','居民户口本','护照','军官证','驾驶证','港澳通行证','台湾通行证','','','','出生证明'],
            idOrNo: '',
            flag: false,
            orgId: '',
            date: '',
            mpiId: '',
            doctorId: '',
        }
    },
    filters: {
        filterIdType(value) {
            let idTypeDic = ['','居民身份证','居民户口本','护照','军官证','驾驶证','港澳通行证','台湾通行证','','','','出生证明']
            return idTypeDic[parseInt(value)]
        }
    },
    computed: {
        ...mapState({
            zbl_packages: state => state.zbl_packages.join(' '),
            zbl_address: state => state.zbl_address,
            selectDocTeam: state => state.selectDocTeam,
            zbl_phoneNo: state => state.zbl_phoneNo,
            zbl_doctorDetail: state => state.doctorDetail,
            zbl_personInfo: state => state.zbl_personInfo,
        }),
    },
    components: {},
    watch: {},
    methods: {
        //选择住址
        clkHomeTown(e) {
            if (this.zbl_phoneNo) {
                if (/^1[34578]\d{9}$/.test(this.zbl_phoneNo)) {
                    this.$router.push('/qyxq_hometown')
                } else {
                    Toast({
                        message: '手机号码格式错误',
                        duration: 1000
                    })
                }
            } else {
                e.preventDefault()
                Toast({
                    message: '请先输入手机号码',
                    duration: 1000
                })
            }
        },

        //选择家医团队
        //通过选中地区的areaId作为请求参数
        selectDoctorTeam(e) {
            if (this.zbl_phoneNo) {
                if (this.zbl_address.decText) {
                    this.$router.push('/qyxq_selectareaorg')
                } else {
                    e.preventDefault()
                    Toast({
                        message: '请先选择居住地址',
                        duration: 1000
                    })
                }
            } else {
                e.preventDefault()
                Toast({
                    message: '请先输入手机号码',
                    duration: 1000
                })
            }
        },

        //选择服务包
        //通过选中的团队的teamId作为请求参数
        clkPackages(e) {
            if (this.zbl_phoneNo) {
                if (this.zbl_address.decText) {
                    if (this.selectDocTeam.selectTeam) {
                        // [{"spId":"84","tenantId":"hcn.zhongshan","spType":"2"}]
                        let params = [{
                            "spId": this.selectDocTeam.teamId,
                            "spType": "2"
                        }]
                        commonAjax(params, 'pcn.pcnSpPackService', 'spPackList').then(res => {
                            if (res.code === 200) {
                                sessionStorage.setItem('zbl_serverPackages', JSON.stringify(res.body))
                                // console.log(JSON.parse(sessionStorage.getItem('zbl_serverPackages')));
                                // console.log(res.body)
                                this.$router.push('/qyxq_package')
                            }
                        })
                    } else {
                        e.preventDefault()
                        Toast({
                            message: '请先选择家庭医生',
                            duration: 1000
                        })
                    }
                } else {
                    e.preventDefault()
                    Toast({
                        message: '请先选择居住地址',
                        duration: 1000
                    })
                }
            } else {
                e.preventDefault()
                Toast({
                    message: '请先输入手机号码',
                    duration: 1000
                })
            }
        },

        // 点击签约协议时发送请求获取完整的协议内容
        qianyuexieyi(e) {
            if (this.zbl_phoneNo && this.zbl_address.decText && this.selectDocTeam.selectTeam && this.zbl_packages.length) {
                let params = [{
                    "signId": "",
                    "teamId": this.selectDocTeam.teamId,
                    "person": {
                        "idCardType": this.idTypeDic[parseInt(this.zbl_personInfo.idType)],
                        "personName": this.zbl_personInfo.personName,
                        "idCard": this.zbl_personInfo.idOrNo,
                        "phoneNo": this.zbl_phoneNo,
                        "address": this.zbl_address.decText
                    }
                }]
                // console.log(params);
                commonAjax(params, 'pcn.signProtocalService', 'getSignProtocal').then(res => {
                    if (res.code === 200) {
                        // console.log(res.body);
                        let teamConst = JSON.parse(sessionStorage.getItem('zbl_teamInfo'))
                        let teamerName = '',
                            result = ''
                        teamConst.teamersArr.forEach(item => {
                            teamerName += item.name + ' '
                        })
                        result = res.body.protocalText.replace(/%signTeamLeader%&nbsp;/g, teamerName).replace(/%signTeamLeader%/g, teamConst.teamLeader)
                        this.xieyiCont(JSON.stringify(result))
                        this.$router.push('/qyxq_xieyi')
                    }
                })
            } else {
                e.preventDefault()
                Toast({
                    message: '请输入完整信息',
                    duration: 1000
                })
            }
        },

        // 勾选已读
        checkRead(e) {
            if (this.zbl_phoneNo && this.zbl_address.decText && this.selectDocTeam.selectTeam && this.zbl_packages.length) {
                if (e.target.checked) {
                    this.flag = true
                } else {
                    this.flag = false
                }
            } else {
                e.preventDefault()
                Toast({
                    message: '请输入完整信息',
                    duration: 1000
                })
            }
        },

        //监听手机号码输入
        editPhoneNo(value) {
            this.zbl_editPhoneNo(value)
        },

        //当前时间格式化
        clockon() {
            var now = new Date()
            var year = now.getFullYear()
            var month = now.getMonth() + 1
            var date = now.getDate()
            var day = now.getDay()
            var hour = now.getHours()
            var minu = now.getMinutes()
            var sec = now.getSeconds()
            if (month < 10) month = "0" + month
            if (date < 10) date = "0" + date
            if (hour < 10) hour = "0" + hour
            if (minu < 10) minu = "0" + minu
            if (sec < 10) sec = "0" + sec
            return year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec
        },

        // 提交签约
        submit(e) {

            //获取orgId参数
            this.orgId = this.zbl_doctorDetail.resBody.teamInfo.filter(item => {
                return item.teamId == this.zbl_doctorDetail.teamId
            })[0].orgId

            this.doctorId = this.zbl_doctorDetail.resBody.docInfo.doctorId
            //获取服务包信息参数
            let serverPackages = JSON.parse(sessionStorage.getItem('zbl_serverPackages')),
                spPackIdArr = sessionStorage.getItem('spPackIdArr'),
                packagesParamsArr = [],
                tempArr2 = serverPackages.filter(item => {
                    return spPackIdArr.indexOf(item.spPackId) >= 0
                })

            tempArr2.forEach(item => {
                let packagesParamsObj = {}
                packagesParamsObj.serviceName = item.spPackName
                packagesParamsObj.personGroup = item.suitableObject
                packagesParamsObj.price = item.price
                packagesParamsObj.serviceId = item.spPackId
                packagesParamsObj.tenantId = "hcn.shenzhen"
                packagesParamsArr.push(packagesParamsObj)
            })
            //获取当前时间并格式化
            this.date = this.clockon()

            if (e.currentTarget.id === 'btnBlue') {
                this.$refs.checkRead.checked = false
                this.flag = false
                let params = [{
                    "address": this.zbl_address.addressDetail,
                    "district": this.zbl_address.regionCode,
                    "street": this.zbl_address.streetKeyCode,
                    "province": this.zbl_address.parentCode,
                    "city": this.zbl_address.cityCode,
                    "signApply": {
                        "signCycle": 1,
                        "personGroup": null,
                        "teamId": this.selectDocTeam.teamId,
                        "status": 1,
                        "mpiId": this.mpiId,
                        "tenantId": "hcn.shenzhen",
                        "tel": this.zbl_phoneNo,
                        "orgId": this.orgId,
                        "doctorId": this.doctorId,
                        "contactName": "",
                        "applyDt": this.date,
                        "applyUser": sessionStorage.getItem('zbl_applyUser'), //主人的mpiId
                        "contactPhone": ""
                    },
                    "pcnApplyPack": packagesParamsArr
                }]

                console.log(params)
                if (sessionStorage.getItem('zbl_flag')) {
                    params[0].signApply.applyId = sessionStorage.getItem('zbl_flag')
                    params[0].pcnApplyPack.forEach(item => {
                        item.applyId = sessionStorage.getItem('zbl_flag')
                    })
                    // let params = [{
                    //     "address": this.zbl_address.addressDetail,
                    //     "district": this.zbl_address.regionCode,
                    //     "street": this.zbl_address.streetKeyCode,
                    //     "province": this.zbl_address.parentCode,
                    //     "city": this.zbl_address.cityCode,
                    //     "signApply": {
                    //         "signCycle": 1,
                    //         "personGroup": null,
                    //         "teamId": this.selectDocTeam.teamId,
                    //         "status": 1,
                    //         "mpiId": this.mpiId,
                    //         "tenantId": "hcn.shenzhen",
                    //         "tel": this.zbl_phoneNo,
                    //         "orgId": this.orgId,
                    //         "doctorId": this.doctorId,
                    //         "contactName": "",
                    //         "applyDt": this.date,
                    //         "applyUser": 'e64299249f7b410991cc17b5d81d67e4', //主人的mpiId
                    //         "contactPhone": "",
                    //         "applyId": this.zbl_personInfo.applyId
                    //     },
                    //     "pcnApplyPack": packagesParamsArr
                    // }]

                    //更新接口
                    Indicator.open('正在提交...')
                    commonAjax(params, 'pcn.residentSignService', 'updateSign').then(res => {
                        if (res.code === 200) {
                            Indicator.close()
                            MessageBox('提示', '修改成功!').then(() => {
                                this.$router.push('/zbl_jmqy')
                            })
                        } else if (res.code === 0) {
                            Toast({
                                message: res.msg,
                                duration: 2000
                            })
                        } else if (res.code === 610) {
                            Toast({
                                message: res.msg,
                                duration: 2000
                            })
                        }
                    })
                } else {
                    //提交接口
                    Indicator.open('正在提交...')
                    commonAjax(params, 'pcn.residentSignService', 'confirmSign').then(res => {
                        if (res.code === 200) {
                            Indicator.close()
                            MessageBox('提示', '提交成功!').then(() => {
                                this.zbl_getApplyInfo(JSON.stringify(res.body))
                                this.$router.push('/qyxq_success')
                            })
                        } else if (res.code === 0) {
                            Indicator.close()
                            Toast({
                                message: res.msg,
                                duration: 2000
                            })
                        } else if (res.code === 610) {
                            Indicator.close()
                            Toast({
                                message: res.msg,
                                duration: 2000
                            })
                        }
                    })
                }
                sessionStorage.removeItem('zbl_flag')
            }
        },
        ...mapActions(['zbl_editPhoneNo', 'xieyiCont', 'zbl_getApplyInfo'])
    },
    created() {},
    mounted() {
        // console.log(this.zbl_personInfo)
        this.personName = this.zbl_personInfo.personName
        this.zbl_editPhoneNo(this.zbl_personInfo.phoneNo)
        this.age = new Date().getFullYear() - this.zbl_personInfo.dob.split('-')[0]
        this.sex = this.zbl_personInfo.sex
        this.idOrNo = this.zbl_personInfo.idOrNo
        this.mpiId = this.zbl_personInfo.mpiId
        this.idType = this.zbl_personInfo.idType
        let params = []
        commonAjaxKy(JSON.stringify(params), 'hcn.device', 'getAppInfoByDevice')
            .then((res) => {
                if (res.code == 200) {
                    console.log(res.body.user.mpiId)
                    sessionStorage.setItem('zbl_applyUser',res.body.user.mpiId)
                    // this.applyUser = res.body.user.mpiId
                }
            })
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = false
        next()
    }
}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
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
.body {
    font-size: fontSize;
    .mint-cell {
        // text-align: right;
    }
    .hideMore {  /*三点省略隐藏代码段*/
        display: inline-block;
        width: 4.5rem;
        text-align:right;
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .personInfo {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-pack: distribute;
      justify-content: space-around;
        margin: .2rem 0;
        .left-avatar {
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        .right-info {
            line-height: 1.8;
            .name {
                color: #39B26D;
                margin-right: .3rem;
            }
            .age {
                color: greyFont;
                margin-right: .4rem;
            }
            .grey {
                margin-right: 25px;
                color: greyFont;
            }
            img.sex {
                position: absolute;
                top: .1rem;
                width: .4rem;
                height: .4rem;
            }
            & .withline {
                position: relative;
                padding-bottom: 6px;
                border-bottom: 1px solid greyFont;
            }
        }
    }
    .divide {
        height: 10px;
        background-color: #F2F2F2;
    }
    .addressPhone {
        width: 100%;
        line-height: 1.8;
        .left {
            display: inline-block;
            margin-right: .3rem;
            width: 20%;
            color: greyFont;
            float: left;
        }
        .right {
            display: inline-block;
            width: 60%;
            float: left;
        }
        & p {
            margin-bottom: 5px;
        }
    }
    .handUp {
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
        .agreenment {
            margin-left: 10px;
            input {
                margin-right: 5px;
            }
            span {
                cursor: pointer;
                color: red;
            }
        }
        .creditable {
            text-align: center;
            color:#F79E30;
            font-size: .25rem;
        }
        #btnGrey {
            background-color: #ddd;
        }
        #btnBlue {
            background-color: mainColor;
        }
    }
}
</style>

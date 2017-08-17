<template>
<div class="zbl_qyxq_signRecordDetail" style="overflow-x:hidden;height:100vh;">
    <div class="header">
        <mt-header title="签约详情">
            <a slot="left" @click='$router.go(-1)'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <mt-header :title="signStatus" class='tobecheck' v-show='true'></mt-header>
    </div>

    <div class="body">
        <div class="personInfo">
            <div class="left-avatar">
                <img src="../../assets/img/zbl_avatar.png" alt="头像">
            </div>
            <div class="right-info">
                <p class="withline">
                    <span class="name">{{name}}</span>
                    <span class="age">{{age}}岁</span>
                    <img :src="sex == '1'?sexImg[0]:sexImg[1]" alt="性别" class="sex">
                </p>
                <p><span class="grey">证件类型</span><span>{{cardType | filterIdType}}</span></p>
                <p><span class="grey">证件号码</span><span>{{cardID}}</span></p>
            </div>
        </div>
        <div class="divide"></div>

        <div class="addressPhone cbafter">
            <p><span class="grey left">联系手机</span><span class="right">{{celnumber}}</span></p>
            <p><span class="grey left">家庭住址</span><span class="right">{{hometown}}</span></p>
        </div>
        <div class="divide"></div>

        <div class="container">
            <mt-cell title="家庭医生" is-link @click.native='showTeamDetail'>
                <span style="color: black" v-if='docTeam'>{{docTeam}}</span>
            </mt-cell>
            <mt-cell title="服务包" is-link @click.native='requestServerPackage'>
                <span style="color: black" v-if='servicePackageName'>{{servicePackageName}}</span>
            </mt-cell>
            <mt-cell title="签约协议" is-link @click.native='getXieyiCont'>
                <span style="color: black">查看</span>
            </mt-cell>
            <mt-cell title="签约机构">
                <span style="margin-right:25px" v-if='shequyiyuan'>{{shequyiyuan}}</span>
            </mt-cell>
            <div class="status1" v-if='signStatus === "签约状态:待确认"'>
                <mt-cell title="签约周期">
                    <span style="margin-right:25px">{{signCycle}}</span>
                </mt-cell>
                <mt-cell title="申请时间">
                    <span style="margin-right:25px">{{signTime}}</span>
                </mt-cell>
                <div class="btn-group">
                    <mt-button @click.native="edit" size="small">修改</mt-button>
                    <mt-button @click.native="cancel" size="small" class="red">取消申请</mt-button>
                </div>
            </div>
            <div class="status2" v-if='signStatus === "签约状态:已签约"'>
                <mt-cell title="签约周期">
                    <span style="margin-right:25px">{{signDate}}</span>
                </mt-cell>
                <mt-cell title="申请时间">
                    <span style="margin-right:25px">{{signTime}}</span>
                </mt-cell>
                <mt-cell title="确认时间">
                    <span style="margin-right:25px">{{checkDt}}</span>
                </mt-cell>
                <mt-cell title="确认方式">
                    <span style="margin-right:25px">{{checkWay}}</span>
                </mt-cell>
                <mt-cell title="备注">
                    <span style="margin-right:25px">{{resultDesc}}</span>
                </mt-cell>
            </div>
            <div class="status3" v-if='signStatus === "签约状态:未通过"'>
                <mt-cell title="签约周期">
                    <span style="margin-right:25px">{{signCycle}}</span>
                </mt-cell>
                <mt-cell title="申请时间">
                    <span style="margin-right:25px">{{signTime}}</span>
                </mt-cell>
                <mt-cell title="确认时间">
                    <span style="margin-right:25px">{{checkDt}}</span>
                </mt-cell>
                <mt-cell title="备注">
                    <span style="margin-right:25px">{{resultDesc}}</span>
                </mt-cell>
            </div>
            <div class="status4" v-if='signStatus === "签约状态:已取消"'>
                <mt-cell title="签约周期">
                    <span style="margin-right:25px">{{signCycle}}</span>
                </mt-cell>
                <mt-cell title="申请时间">
                    <span style="margin-right:25px">{{signTime}}</span>
                </mt-cell>
                <mt-cell title="取消时间">
                    <span style="margin-right:25px">{{cancelDt}}</span>
                </mt-cell>
            </div>
            <div class="status5" v-if='signStatus === "签约状态:已解签"'>
                <mt-cell title="签约周期">
                    <span style="margin-right:25px">{{signDate}}</span>
                </mt-cell>
                <mt-cell title="解签时间">
                    <span style="margin-right:25px">{{cancelDt}}</span>
                </mt-cell>
                <mt-cell title="解签申请人">
                    <span style="margin-right:25px">{{cancelUser}}</span>
                </mt-cell>
            </div>
        </div>

    </div>
</div>
</template>
<script>

</script>
<script>
import {
    MessageBox,
    Toast
} from 'mint-ui'
import {
    commonAjax,commonAjaxKy,areaAjax
} from '../../api/api'
import {
    mapActions,mapState
} from 'vuex'
import provinceCityArea from '../common/provinceCityArea.json'
export default {
    data: function() {
        return {
            name: '',
            age: '',
            sex:'',
            sexImg: [require('../../assets/img/zbl_male.png'), require('../../assets/img/zbl_female.png')],
            cardType: '',
            cardID: '',
            celnumber: '',
            hometown: '',
            docTeam: '',
            servicePackageName: '',
            shequyiyuan: '',
            qujiyiyuan: '',
            shijiyiyuan: '',
            signTime: '',
            signCycle: '',
            mockData: {},
            applyIdParams: [],
            street: '',
            teamId:'',
            dictionaryArr: [],
            mpiId: '',
            orgId: '',
            signStatus: '',
            signDate: '',
            cancelDt: '',
            cancelUser: '',
            checkDt: '',
            resultDesc: '',
            checkWay: '',
            checkWayDic: ['','门诊','家庭','电话','短信','网络','','','','其他']
        }
    },
    computed: {
        ...mapState({
            zbl_personInfo: state => state.zbl_personInfo,
        }),
    },
    filters: {
        filterIdType(value) {
            let idTypeDic = ['','居民身份证','居民户口本','护照','军官证','驾驶证','港澳通行证','台湾通行证','','','','出生证明']
            return idTypeDic[parseInt(value)]
        }
    },
    components: {},
    methods: {
        //取消申请
        cancel() {
            MessageBox({
                title: '提示',
                message: '确定取消签约吗?',
                showCancelButton: true
            }).then(e => {
                if (e == 'confirm') { // 当点击‘确定’之后console.log输出'comfirm'
                let params = [this.applyIdParams[0]]
                commonAjax(params, 'pcn.residentSignService', 'cancelSign').then(res => {
                    Toast({
                        message: '取消成功',
                        duration: 300
                    })
                    this.$router.push('/zbl_jmqy')
                })
            }
        })
        },
        edit() {
            this.zbl_editPhoneNo(this.celnumber)
            let obj = {}
            obj.decText = this.hometown
            obj.streetText = this.street
            obj.streetKeyCode = this.mockData.applySignInfo.street
            obj.addressDetail = this.hometown
            obj.parentCode = this.mockData.applySignInfo.province
            obj.cityCode = this.mockData.applySignInfo.city
            obj.regionCode = this.mockData.applySignInfo.district
            this.zbl_selectAddress(obj)

            let params = {}
            params.selectTeam = this.docTeam
            params.orgName = this.shequyiyuan
            params.teamId = this.teamId
            this.selectDocTeam(params)
            this.zbl_selectPackages(this.servicePackageName.split(','))
            sessionStorage.setItem('zbl_flag', this.applyIdParams[0])

            let obj2 = {}
            obj2.personName = this.name
            obj2.dob = this.mockData.applySignInfo.dob
            obj2.sex = this.sex
            obj2.idOrNo = this.cardID
            obj2.mpiId = this.mpiId
            obj2.idType = this.cardType
            obj2.phoneNo = this.celnumber
            this.zbl_getPersonInfo(JSON.stringify(obj2))
            this.$router.push('/zbl_qyxq')
        },
        //页面加载时post请求
        reqAjax() {
            this.cardType = this.$route.query.idType
            this.cardID = this.$route.query.idOrNo
            let params = [this.$route.query.id] //表示签约记录id (signId)
            commonAjaxKy(JSON.stringify(params), 'pcn.residentSignService', 'getSignRecordDetail').then(res => {
                if (res.code === 200) {
                    console.log(JSON.parse(JSON.stringify(res.body)))
                    this.mockData = res.body
                    this.name = this.mockData.applySignInfo.personName
                    this.sex = this.mockData.applySignInfo.sex
                    this.age = new Date().getFullYear() - this.mockData.applySignInfo.dob.split('-')[0]
                    this.celnumber = this.mockData.applySignInfo.tel
                    this.mapAddress()
                    this.mpiId = this.mockData.applySignInfo.mpiId
                    this.docTeam = this.mockData.applySignInfo.doctorName + ' ' + this.mockData.applySignInfo.teamName
                    this.teamId = this.mockData.applySignInfo.teamId
                    this.servicePackageName = this.getPackagesName()
                    this.qujiyiyuan = this.shijiyiyuan = this.shequyiyuan = this.mockData.applySignInfo.orgName
                    this.orgId = this.mockData.applySignInfo.orgId
                    this.signTime = this.mockData.applySignInfo.applyDt
                    this.signCycle = this.mockData.applySignInfo.signCycle + '年'
                    this.signDate = this.mockData.signDate
                    this.cancelDt = this.mockData.applySignInfo.cancelDt
                    this.cancelUser = this.mockData.applySignInfo.cancelUser
                    this.checkDt = this.mockData.applySignInfo.checkDt
                    this.resultDesc = this.mockData.applySignInfo.resultDesc
                    this.checkWay = this.checkWayDic[parseInt(this.mockData.applySignInfo.checkWay)]
                    this.teamDetail()
                    switch (this.mockData.applySignInfo.status) {
                        case '1':
                            this.signStatus = '签约状态:待确认'
                            break
                        case '2':
                            this.signStatus = '签约状态:已签约'
                            break
                        case '3':
                            this.signStatus = '签约状态:未通过'
                            break
                        case '4':
                            this.signStatus = '签约状态:已取消'
                            break
                        case '5':
                            this.signStatus = '签约状态:已解签'
                            break
                    }
                }
            })
        },
        //显示服务包名字处理函数
        getPackagesName() {
            let packagesName = []
            this.mockData.applyPackageInfo.forEach(item => {
                packagesName.push(item.serviceName)
                this.applyIdParams.push(item.applyId) //获取服务包Id以便后面请求查看
            })
            return packagesName.join(' ')
        },
        //查看签约协议
        getXieyiCont() {
            let obj = {},
                params = []
            obj.mpiId = this.mockData.applySignInfo.mpiId
            obj.teamId = this.mockData.applySignInfo.teamId
            params.push(obj)
            commonAjax(params, 'pcn.signProtocalService', 'getSignProtocal').then(res => {
                if (res.code === 200) {
                    // console.log(res.body);
                    this.xieyiCont(JSON.stringify(res.body.protocalText))
                    this.$router.push('/qyxq_xieyi')
                }
            })
        },
        //跳转家医详情页
        showTeamDetail() {
            this.$router.push('/qyxq_doctordetail')
        },
        //teamId + doctorId
        teamDetail() {
            // let params = ["hcn.shenzhen","8","95725b3e-e178-416d-a94e-558974490a57"]
            let params = ["hcn.shenzhen",this.mockData.applySignInfo.teamId,this.mockData.applySignInfo.doctorId]
            commonAjax(params, 'pcn.residentSignService', 'getDoctorDetail').then(res => {
                if (res.code === 200) {
                    let obj = {} //该对象包含本页面请求到的团队名称及归属名称
                    obj.resBody = res.body
                    obj.selectedTeamName = this.mockData.applySignInfo.teamName
                    obj.homeTeamOrgName = this.mockData.applySignInfo.orgName
                    obj.requestTeamInfoParams = params.slice(1)
                    obj.teamId = this.mockData.applySignInfo.teamId
                    // console.log(obj)
                    this.getDoctorDetail(JSON.stringify(obj))
                }
            })
        },
        //请求服务包信息
        requestServerPackage() {
            // ['applyId']
            let params = [this.applyIdParams[0]]
            commonAjax(params, 'pcn.residentSignService', 'querySignApplyPackage').then(res => {
                if (res.code === 200) {
                    console.log(res.body)
                    sessionStorage.setItem('zbl_serverPackages', JSON.stringify(res.body))
                    this.$router.push('/qyxq_editPackage')
                }
            })
        },
        //code码匹配省市区地址
        mapAddress() {
            let result = '',
                province = '',
                city = '',
                district = '',
                address = ''
            provinceCityArea.forEach(item => { //匹配省
                if (item.parent === this.mockData.applySignInfo.province) {
                    province = item.province
                }
            })
            provinceCityArea.forEach(item => { //匹配市
                if (item.regionCode === this.mockData.applySignInfo.city) {
                    city = item.city
                }
            })
            provinceCityArea.forEach(item => { //匹配区
                if (item.regionCode === this.mockData.applySignInfo.district) {
                    district = item.district
                }
            })
            let params = `parentKey=${this.mockData.applySignInfo.district}&sliceType=4`
            areaAjax(params).then(res => {
                this.street = res.items.filter(item => { //匹配街道
                    return item.key === this.mockData.applySignInfo.street
                })[0].text
                result = province + city + district + this.street + this.mockData.applySignInfo.address
                this.hometown = result
            })
        },
        ...mapActions(['zbl_editPhoneNo', 'selectDocTeam', 'xieyiCont', 'zbl_selectPackages', 'getDoctorDetail', 'zbl_selectAddress','zbl_getPersonInfo'])
    },
    mounted() {
        this.reqAjax()
    },
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
    .mint-header.tobecheck {
        font-size: .3rem;
        background-color: #FFFAD0;
        height: .6rem;
        color: #F79E30;
    }
}
.body {
    font-size: fontSize;
    .personInfo {
        width: 100%;
        line-height: 1.8;
        display: flex;
        margin-bottom: .2rem;
        .left-avatar {
            margin-top: .2rem;
            width: 25%;
            text-align: center;
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        .right-info {
            margin-top: .3rem;
            margin-left: 10px;
            width: 70%;
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
        margin: .25rem 0 .25rem .25rem ;
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
    .btn-group {
        margin-top: .4rem;
        margin-bottom: 1rem;
        .mint-button {
            display: block;
            width: 80%;
            height: .8rem;
            margin: .2rem auto;
            color: #fff;
            background-color: mainColor
            cursor: pointer;
            font-size:fontSize;
            &.red {
                background-color: #E74B3C;
            }
        }
    }
}


</style>

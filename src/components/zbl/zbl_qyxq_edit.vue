<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
    <div class="header">
        <mt-header title="签约详情">
            <a slot="left" @click='$router.push("/zbl_jmqy")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <mt-header title="签约状态:待确认" class='tobecheck' v-show='true'></mt-header>
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
                <p><span class="grey">证件类型</span><span>{{cardType}}</span></p>
                <p><span class="grey">证件号码</span><span>{{cardID}}</span></p>
                <!-- <p><span class="grey">社保卡号</span><span>{{shebaoID}}</span></p> -->
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
            <!-- <mt-cell title="区级医院">
                <span style="margin-right:25px">{{qujiyiyuan}}</span>
            </mt-cell>
            <mt-cell title="市级医院">
                <span style="margin-right:25px">{{shijiyiyuan}}</span>
            </mt-cell> -->
            <mt-cell title="签约周期">
                <span style="margin-right:25px" v-if='signCycle'>{{signCycle}}</span>
            </mt-cell>
            <mt-cell title="申请时间">
                <span style="margin-right:25px" v-if='signTime'>{{signTime}}</span>
            </mt-cell>
        </div>
        <div class="btn-group">
            <mt-button @click.native="edit" size="small">修改</mt-button>
            <mt-button @click.native="cancel" size="small" class="red">取消申请</mt-button>
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
            cardType: '身份证',
            cardID: '445281199901019275',
            shebaoID: '123456789',
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
            orgId: ''
        }
    },
    computed: {
        ...mapState({
            zbl_personInfo: state => state.zbl_personInfo,
        }),
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
                let params = [this.zbl_personInfo.applyId]
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
            sessionStorage.setItem('zbl_flag', this.zbl_personInfo.applyId)
            this.$router.push('/zbl_qyxq')
        },
        //页面加载时post请求
        reqAjax() {
            let params = [this.zbl_personInfo.applyId] //表示签约记录id (signId)
            commonAjaxKy(JSON.stringify(params), 'pcn.residentSignService', 'getSignRecordDetail').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
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
                    this.signTime = this.mockData.applySignInfo.applyDt.split(' ')[0]
                    this.signCycle = this.mockData.applySignInfo.signCycle + '年'
                    this.teamDetail()
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
            //['teamId']
            let params = [this.zbl_personInfo.applyId]
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
        ...mapActions(['zbl_editPhoneNo', 'selectDocTeam', 'xieyiCont', 'zbl_selectPackages', 'getDoctorDetail', 'zbl_selectAddress'])
    },
    mounted() {
        // console.log(this.zbl_personInfo)
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

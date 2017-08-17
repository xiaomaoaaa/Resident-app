<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
           <mt-header title="私人医生">
                <a slot="left" @click='$router.push("/xie_home")'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </div>
        <div class="session">
            <div class="searchUrl">
                <span class="inputCon" @click="$router.push('/zy_search')">输入医院、科室、医生、疾病搜索</span>
            </div>
            <div class="doctors bgFFF cbafter">
                <h6 @click="$router.push('/zy_hotDoctor')"><span class="greenBlock"></span><em class="rightIcon"></em>热门医生</h6>
                <div class="doctorName fl" v-for="(item, index) in doctorList" @click="$router.push('/zy_doctorPage?'+item.doctorId)">
                    <img v-if="!item.fileId" class="doctorA" src="../../assets/img/zy_doctor.png">
                    <img v-else class="doctorA" :src="imgSrc + item.fileId">
                    <p>{{item.doctorName}}</p><span>{{doctorLevelName}}</span>
                </div>
            </div>
            <div class="disease bgFFF">
                <h6 @click="$router.push('/zbl_commonDiseases')"><span class="greenBlock"></span>常见疾病<em class="rightIcon"></em></h6>
                <ul class="diseaseName cbafter">
                    <li class="fl" v-for="(item, index) in diseaseList" @click="showDisease(index)">{{item.name}}</li>
                </ul>
            </div>
            <div class="hospital bgFFF">
                <h6 @click="$router.push('/prvivateDoctor/hotHospitalList')"><span class="greenBlock"></span>热门医院<em class="rightIcon"></em></h6>
                <ul class="hospitalName">
                    <li v-for="(item, index) in hospitalList" @click="$router.push({path: '/xie_mydoc', query: {orgId: item.orgId}})">{{item.hotObjName}}  <span class="fr">{{hospitalLevelName}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import { Search,Cell,Indicator } from 'mint-ui'
import {
    commonAjax,
    requestLoginon,
    areaAjax,dicAjax,commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {
           doctorList: [],
           diseaseList: [],
           hospitalList: [],
           doctorLevel: {"231":"主任医师","232":"副主任医师","233":"主治医师","234":"医师","235":"医士"},
           doctorLevelName: '',
           hospitalLevelName: '',
           hospitalLevel: {"10":"一级","11":"一级甲等","12":"一级乙等","13":"一级丙等","20":"二级","21":"二级甲等","22":"二级乙等","23":"二级丙等","30":"三级","31":"三级特等","32":"三级甲等","33":"三级乙等","34":"三级丙等"},
           hospitalOrgIdList: [],
           imgSrc:'http://122.224.131.235:9088/hcn-web/upload/'
        }
    },
    methods: {
        showDisease(index){
            this.$router.push('/zy_diseaseName')
            sessionStorage.setItem('diseaseTitle',this.diseaseList[index].name)
        }
    },
    mounted () {
        let params = []
        Indicator.open('加载中...')
        commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'getHomePageData').then(res => {
            Indicator.close()
            if (res.code === 200) {
                this.doctorList = res.body.doctor
                this.diseaseList = res.body.disease
                this.hospitalList = res.body.hospital
                console.log(this.doctorList)
                for(var i=0;i<this.doctorList.length;i++){
                    switch(this.doctorList[i].dlevel){
                        case "231":
                            this.doctorLevelName = this.doctorLevel["231"]
                            break;
                        case "232":
                            this.doctorLevelName = this.doctorLevel["232"]
                            break;
                        case "233":
                            this.doctorLevelName = this.doctorLevel["233"]
                            break;
                        case "234":
                            this.doctorLevelName = this.doctorLevel["234"]
                            break;
                        case "235":
                            this.doctorLevelName = this.doctorLevel["235"]
                            break;
                        default:
                            this.doctorLevelName = "其他"
                    }
                }

                for(var i=0;i<this.hospitalList.length;i++){
                    // 向后传参
                    this.hospitalOrgIdList.push(this.hospitalList[i].orgId)
                    switch(this.hospitalList[i].level){
                        case "10":
                            this.hospitalLevelName = this.hospitalLevel["10"]
                            break;
                        case "11":
                            this.hospitalLevelName = this.hospitalLevel["11"]
                            break;
                        case "12":
                            this.hospitalLevelName = this.hospitalLevel["12"]
                            break;
                        case "13":
                            this.hospitalLevelName = this.hospitalLevel["13"]
                            break;
                        case "20":
                            this.hospitalLevelName = this.hospitalLevel["20"]
                            break;
                        case "21":
                            this.hospitalLevelName = this.hospitalLevel["21"]
                            break;
                        case "22":
                            this.hospitalLevelName = this.hospitalLevel["22"]
                            break;
                        case "23":
                            this.hospitalLevelName = this.hospitalLevel["23"]
                            break;
                        case "30":
                            this.hospitalLevelName = this.hospitalLevel["30"]
                            break;
                        case "31":
                            this.hospitalLevelName = this.hospitalLevel["31"]
                            break;
                        case "32":
                            this.hospitalLevelName = this.hospitalLevel["32"]
                            break;
                        case "33":
                            this.hospitalLevelName = this.hospitalLevel["33"]
                            break;
                        case "34":
                            this.hospitalLevelName = this.hospitalLevel["34"]
                            break;
                        default:
                            this.doctorLevelName = "其他"
                    }
                }
            }
        })
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
}
.bgFFF{background-color: #fff;}
.session {
    margin-top: 1rem;
    .searchUrl{
        margin: 1.15rem .15rem .15rem;
        border-radius: 5px;
        height: .7rem;
        line-height: .7rem;
        background: #fff;
        text-align: center;
        .inputCon{
            background: url('../../assets/img/zy_search_gray.png') no-repeat 0 center;
            background-size: .3rem;
            font-size: .25rem;
            display: block;
            margin: .1rem auto;
            width: 4rem;
            padding-left: .3rem;
            color: #B3B3AF;
            white-space: nowrap;
        }
    }
    h6{
        padding: .2rem;
        position: relative;
        font-size: .25rem;
        color: #999;
        border-bottom: 1px solid #E1E1E1;
        position: relative;
        span{
            background: #3ab76f;
            position: absolute;
            left: 0;
            top: .15rem;
            width: .1rem;
            height: .4rem;;
        }
        .rightIcon{
            width: .2rem;
            height: .25rem;
            position: absolute;
            right: .25rem;
            background-size: .1rem;
            background: url('../../assets/img/zy_right.png') no-repeat right;
        }
    }
    .doctors{
        .doctorName{
            width: 2rem;
            text-align: center;
            padding: .3rem 0;
            img{width: .8rem;height: .8rem;}
            p{font-size: .23rem;}
            span{
                color: #999;
                font-size: .23rem;
                display: block;
                margin-top: .1rem;
            }
        }
    }
    .disease{
        margin-top: .15rem;
        .diseaseName{
            padding: .2rem;
            li{
                font-size: .2rem;
                color: #36B570;
                padding: .15rem .15rem;
                border: 1px solid #36B570;
                margin-right: .2rem;
                margin-bottom: .2rem;
                border-radius: 4px;
            }
            li:last-child{margin-bottom: 0;}
        }
    }
    .hospital{
        margin-top: .15rem;
        margin-bottom: .3rem;
        .hospitalName{
            font-size: .23rem;
            li{
                border-bottom: 1px solid #F3F3F3;
                padding: .2rem;
                span{
                    color: #F5A92E;
                    font-size: .2rem;
                    padding-right: .28rem;
                    background: url('../../assets/img/zy_right.png') no-repeat right;
                    background-size: .1rem;
                }
            }
        }
    }
}
</style>

<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fff;">
       <div class="header">
            <mt-header>
                <a slot="left" @click='$router.go(-1)'>
                    <mt-button icon="back"></mt-button>
                </a>
                <a slot="right">
                    <img v-if="heartImg" class="isHeart" src="../../assets/img/zy_heart0.png" @click="changeHeart()">
                    <img v-else class="isHeart" src="../../assets/img/zy_heart1.png" @click="changeHeart()">
                </a>
            </mt-header>
            <div class="doctorImg cbafter">
                <div class="fl">
                   <img class="doctorA" src="../../assets/img/zy_doctor.png">
                </div>
                <div class="doctorName fl">
                    <p>{{doctorInfo.doctorName}}&nbsp;&nbsp;<span>{{doctorLevelName}}</span></p>
                    <star ref='doct_star' v-for='item in [""]'></star>
                </div>
            </div>
        </div>
        <div class="session">
            <div class="workPosition">
                <h6><span class="greenBlock"></span>执业点</h6>
                <p class="descripText">
                    {{doctorInfo.fullName}}&nbsp;&nbsp;{{doctorInfo.deptName}}
                </p>
            </div>
            <div class="workInfo">
                <h6 @click="seeMoreInfo()"><span class="greenBlock"></span>排班信息<i class="moreWorkInfo fr">更多排班</i></h6>
                <table class="infoTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>周六<p>08.05</p></th>
                            <th>周六<p>08.05</p></th>
                            <th>周六<p>08.05</p></th>
                            <th>周六<p>08.05</p></th>
                            <th>周六<p>08.05</p></th>
                            <th>周六<p>08.05</p></th>
                            <th>周六<p>08.05</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <td>上午</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr align="center">
                            <td>上午</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <p class="tipInfo">(排班信息以医院实际发布为准)</p>
            </div>
            <div class="introduce cbafter">
                <h6><span class="greenBlock"></span>擅长</h6>
                <span class="diseaseText fl">{{doctorInfo.diseaseName}}</span>
            </div>
            <div class="introduce">
                <h6><span class="greenBlock"></span>简介</h6>
                <p class="descripText">{{doctorInfo.introduce}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import star from './zbl_scoretostar.vue'
import { Toast,MessageBox } from 'mint-ui'
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
            heartImg: true,
            doctorInfo: {},
            doctorId: location.href.split('?')[1],
            doctorLevelName: '',
            doctorLevel: {"231":"主任医师","232":"副主任医师","233":"主治医师","234":"医师","235":"医士"},
            scores: 5
        }
    },
    components: {
        star
    },
    methods: {
        changeHeart(){
            if(this.heartImg){
                Toast({
                    message: '收藏成功',
                    position: 'bottom',
                    duration: 2000
                });
                this.heartImg = !this.heartImg
            }else{
                MessageBox.confirm('您确定要取消收藏该医生吗?').then(action => {
                    Toast({
                        message: '已取消收藏',
                        position: 'bottom',
                        duration: 2000
                    })
                    this.heartImg = !this.heartImg
                })
            }
        },
        seeMoreInfo(){
            Toast({
                message: '暂无更多排班信息',
                position: 'bottom',
                duration: 2000
            })
        }
    },
    mounted(){
        let params = [this.doctorId]
        commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'getDoctorDetail').then(res => {
            if (res.code === 200) {
                this.doctorInfo = res.body.doctorOrg[0]
                this.doctorId = this.doctorInfo.doctorId

                if(this.doctorInfo.avglevel == 0 || this.doctorInfo.avglevel == undefined){
                    this.scores = 5
                }else{
                    this.scores = this.doctorInfo.avglevel
                }
                this.$nextTick(() => {
                    this.$refs.doct_star[0].scoreToStar(this.scores)
                })
                // console.log(res.body)
                // console.log(this.doctorInfo)
                switch(this.doctorInfo.dlevel){
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
        })

    }
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
        .isHeart{
            width: .3rem;
            height: .3rem;
        }
    }
    .doctorImg{
        padding: .2rem;
        background-color: mainColor;
        color: #fff;
        font-size: .3rem;
        .doctorA{
            width: 1rem;
            height: 1rem;
        }
        .doctorName{
            margin-top: .05rem;
            margin-left: .2rem;
            span{
                font-size: .25rem;
            }
            .scoreToStar{
                margin-top: .2rem;
                display: inline-block;
                width: 3rem;
                height: .3rem;
            }
        }
    }
}
.session{
    border-top: .2rem solid #fafafa;
    h6{
        padding: .2rem;
        position: relative;
        font-size: .25rem;
        color: #999;
        border-bottom: 1px solid #E1E1E1;
        span{
            background: #3ab76f;
            position: absolute;
            left: 0;
            top: .15rem;
            width: .1rem;
            height: .4rem;;
        }
    }
    .descripText{
        padding: .2rem;
        font-size: 0.25rem;
        color: #323232;
        line-height: .3rem;
    }
    .diseaseText{
        display: block;
        font-size: .2rem;
        color: #36B570;
        padding: .15rem .15rem;
        border: 1px solid #36B570;
        margin: .2rem;
        border-radius: 4px;
    }
    .workInfo{
        border-top: .2rem solid #fafafa;
        border-bottom: .2rem solid #fafafa;
        .moreWorkInfo{
            font-style: normal;
            padding-right: .3rem;
            background: url('../../assets/img/zy_right.png') no-repeat right;
        }
        .infoTable{
            width: 100%;
            font-size: .2rem;
            color: grey;
            thead{
                th{
                    padding-top: .2rem;
                    color: grey;
                    font-weight: 400;
                    p{
                        margin-top: .2rem;
                        margin-bottom: .2rem;
                    }
                }
            }
            tbody{
                tr,td{border: 1px solid #C5C4C1;}
                td{padding: .2rem;}
            }
        }
        .tipInfo{
            text-align: right;
            font-size: .23rem;
            color: grey;
            padding: .2rem;
        }
    }
    .introduce{margin-bottom: .3rem;}
    .confirmBtn,.cancelBtn{color: #064CFC;}
}
</style>

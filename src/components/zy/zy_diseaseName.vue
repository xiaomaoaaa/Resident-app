<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
           <mt-header :title="diseaseTitle">
                <a slot="left" @click='$router.go(-1)'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </div>
        <div class="session">
            <div v-if="doctorList.length==0" ref="noData" class="noData">暂无数据</div>
            <div v-show="this.doctorList.length">
                <ul class="doctorList bgFFF">
                    <li class="cbafter" v-for="(item, index) in doctorList" @click="$router.push('/zy_doctorPage?'+item.doctorId)">
                        <img class="fl" src="../../assets/img/zy_doctor2.png">
                        <div class="detailInfo fl">
                            <p class="doctorName">{{item.doctorName}}<span>{{doctorLevelName}}</span><star ref='zy_disease'></star></p>
                            <p class="hosName">{{item.shortName}}&nbsp;&nbsp;<i>{{item.deptName}}</i></p>
                            <span class="disease">擅长：{{item.diseaseName}}</span>
                        </div>
                    </li>
                </ul>
                <div id="more" v-show="this.doctorList.length>50" class="more" @click="showMore()">查看更多</div>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import star from './zbl_scoretostar.vue'
import { Search,Cell } from 'mint-ui'
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
            diseaseTitle: '',
            doctorLevelName: '',
            pageNo: 1,
            maxData: 50,
            doctorList: [],
            doctorLevel: {"231":"主任医师","232":"副主任医师","233":"主治医师","234":"医师","235":"医士"},
            scores: 5
        }
    },
    components: {
        star
    },
    methods: {
        showMore(){
            this.pageNo++
            let params = [this.pageNo,this.maxData]
            commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'searchSpecialitys').then(res => {
                if (res.code === 200) {
                    this.doctorList = this.doctorList.concat(res.body)
                    if(res.body < 50){
                        document.getElementById('more').style.display = 'none'
                    }
                }
            })
        }
    },
    mounted () {
        this.diseaseTitle = sessionStorage.getItem('diseaseTitle')
        let params =[this.diseaseTitle,this.pageNo,this.maxData]
        commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'searchSpecialitys').then(res => {
            if (res.code === 200) {
                this.doctorList = res.body
                console.log(this.doctorList)
                if(this.doctorList.avglevel == '0' || this.doctorList.avglevel == undefined){
                    this.scores = 5
                    this.$nextTick(() => {
                        this.$refs.zy_disease[0].scoreToStar(this.scores)
                    })
                }else{
                    this.scores = this.doctorList.avglevel
                }
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
    .noData{
        text-align: center;
        font-size: .3rem;
        color: #9E9E9E;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        height: 2rem;
        width: 3rem;
        background: url('../../assets/img/zy_noData.png') no-repeat;
        background-size: 3rem;
        padding-top: 2rem;
    }
    .doctorList{
        li{
            border-bottom: 1px solid #E8E8E8;
            padding: .2rem;
            img{
                width: 1rem;
                height: 1rem;
            }
            .detailInfo{
                font-size: .3rem;
                margin-left: .15rem;
                .doctorName{
                    font-size: .3rem;
                    span{
                        margin-left: .2rem;
                        color: #aaa;
                    }
                    .scoreToStar{
                        margin-left: .2rem;
                        display: inline-block;
                        width: 1.5rem;
                        height: .25rem;
                    }
                }
                i{font-style: normal;}
                .hosName{
                    font-size: .24rem;
                    margin-top: .15rem;
                    margin-bottom: .1rem;
                }
                .disease{
                    color: #aaa;
                    font-size: .24rem;
                }
            }
        }       
    }
}
.session .more{
    font-size: .2rem;
    text-align: center;
    padding-bottom: 10px;
}
</style>

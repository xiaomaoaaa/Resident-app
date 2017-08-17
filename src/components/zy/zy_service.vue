<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
        <div class="header">
            <mt-header title="服务"></mt-header>
        </div>
        <div class="session">
            <mt-cell to="/jkzx" is-link>
                <img class="eventIcon" slot="icon" src="../../assets/img/zy_info.png">
                <ul class="eventSwipe" id="eventSwipe">
                    <li v-for="(item,index) in eventSwipeList">
                        {{item.title.substring(0,15) + '...'}}
                    </li>
                </ul>
            </mt-cell>
            <mt-cell  to="/zy_event" is-link>
                <img class="eventIcon" slot="icon" src="../../assets/img/zy_event.png">
                <ul class="eventSwipe" id="infoSwipe">
                    <li v-for="(item,index) in infoSwipeList">
                        {{item.title.substring(0,15) + '...'}}
                    </li>
                </ul>
            </mt-cell>
            <div class="column">
                <div class="tang cbafter">
                    <div class="fl" @click='taoyouquan'>
                        <img src="../../assets/img/zy_tang.png">
                    </div>
                    <div class="fl rightText">
                        <b style="font-size: .3rem;">糖友圈</b>
                        <p style="font-size: .27rem;margin-top: .1rem;">糖友的膳食知道</p>
                    </div>
                </div>
            </div>
            <div class="toolsImg"><img src="../../assets/img/zy_tools.png"></div>
            <ul class="toolDetail cbafter">
                <li @click='tvmconstitution()'><img src="../../assets/img/zy_tool1.png"></li>
                <!-- 到儿童体格的路由方法 -->
                <li @click='toChild'><img src="../../assets/img/zy_tool2.png"></li>
                <li @click='$router.push("/service/expectedDate")'><img src="../../assets/img/zy_tool3.png"></li>
                <li @click='$router.push("/gy_WHR")'><img src="../../assets/img/zy_tool4.png"></li>
                <li @click='noOpen5'><img src="../../assets/img/zy_tool5.png"></li>
            </ul>
        </div>

        <!-- 底部按钮 -->
        <div class="flexbox">
            <router-link to="/xie_home" class="flex_left" >
                    <div class="xie_img_box">
                        <img src="../../assets/img/xie_shouye.png">
                        <!--<img src="../../assets/img/xie_shouye1.png">-->
                    </div>
                    <span>首页</span>
            </router-link>
            <router-link to="/xie_xiaoxi" class="flex_center">
                    <div class="xie_img_box">
                        <img src="../../assets/img/xie_mess.png" >
                    </div>
                    <span>消息</span>
            </router-link>
            <router-link to="/zy_service" class="flex_right">
                    <div class="xie_img_box">
                        <img src="../../assets/img/zy_service1.png" >
                    </div>
                    <span>服务</span>
            </router-link>
            <router-link to="/jia_person" class="flex_right1">
                    <div class="xie_img_box">
                        <img src="../../assets/img/xie_my.png" >
                    </div>
                    <span>我的</span>
            </router-link>
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import {
    commonAjax,
    requestLoginon,
    areaAjax,dicAjax,commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
import { MessageBox,Toast,Badge,Cell } from 'mint-ui'
export default {
    data: function() {
        return {
            eventSwipeList: [],
            infoSwipeList: [],
            pageSize: 3,
            pageNo: 1,
            timer: null,
            event_y: -100,
            info_y: 0
        }
    },
    created() {
        clearInterval(this.timer)
        this.$nextTick(() => {
            this.timer = setInterval(() => {
                this.swipeNews()
            }, 1500)
        })
    },
    mounted() {
        let paramsEvent = [{"pageSize":this.pageSize,"category":3,"pageNo":this.pageNo}]
        commonAjax(paramsEvent, 'pcn.pcnHealthNewsService', 'getPcnHealthNewsListForApp').then(res => {
            if (res.code === 200) {
                this.eventSwipeList = res.body.list
                // console.log(console.log(res.body.list))
                this.pageSize = res.body.pageSize
                this.pageNo = res.body.pageNo
            }
        })
        let paramsInfo = [{"pageSize":3,"atype":"1","pageNo":this.pageNo}]
        commonAjax(paramsInfo, 'pcn.pcnHealthActivitiesService', 'getPcnHealthActivitiesList').then(res => {
            if (res.code === 200) {
                this.infoSwipeList = res.body.list
                // console.log(res.body.list)
                this.pageSize = res.body.pageSize
                this.pageNo = res.body.pageNo
            }
        })
    },
    methods: {
        swipeNews() {
            let eventSwipe = document.getElementById("eventSwipe")
            let infoSwipe = document.getElementById("infoSwipe")
            if(eventSwipe){
                eventSwipe.style.transform = "translateY("+this.event_y+"%)"
                infoSwipe.style.transform = "translateY("+this.info_y+"%)"
                if(this.event_y <= -(this.eventSwipeList.length-1)*100){
                    this.event_y = 0
                }else{
                    this.event_y = this.event_y - 100
                }
                if(this.info_y <= -(this.infoSwipeList.length-1)*100){
                    this.info_y = 0
                }else{
                    this.info_y = this.info_y - 100
                }
            }
        },
        toChild(){
            this.$router.push('/jia_child');
        },
        noOpen() {
            Toast({
                message: '暂未开通',
                duration: 1000
            })
        },
        tvmconstitution(){
        	this.$router.push('xie_tvm_constitution')
        },
        noOpen5(){
            this.$router.push("/lsw_BMI")
        },
        taoyouquan() {
            this.$router.push('/tangyouquan')
        },
    },
    destroyed() {
        clearInterval(this.timer)
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
        background-color: #3AB76F;
    }
    .add{
        background-image: url('../../assets/img/zy_add.png');
        background-size: 100% 100%;
        width: .4rem;
        height: .4rem;
        display: inline-block;
    }
}
.session {
    margin-top: 1rem;
    margin-bottom: 1rem;
    .bGreen{
        background-image: url('../../assets/img/zy_greenBg.png');
        background-size: 100% 100%;
        width: 100%;
        height: 2rem;
        box-sizing: border-box;
        padding: .5rem .2rem 0;
    }
    .eventIcon{
        width: .9rem;
        height: .9rem;
        margin: .2rem;
    }
    .eventSwipe{
        height: 100%;
        position: absolute;
        top: 50%;
        left: 1.1rem;
        margin-left: .4rem;
        font-size: .27rem;
        margin-top: -.1rem;
        li{height: 100%;}
    }
    .column{
        margin-top: 10px;
        background: #fff;
        .tang{
            padding: .1rem;
            img{
                width: 1rem;
                height: 1rem;
                margin: .1rem;
                margin-left: .2rem;
            }
            .rightText{
                margin-top: -.4rem;
                margin-left: .2rem;
                b{color: #383838;}
                p{color: #A6A6A6;}
            }
        }
    }
    .toolsImg{
        img{width: 100%;}
    }
    .toolDetail{
        background: #fff;
        li{
            float: left;
            width: 50%;
            padding: .1rem;
            box-sizing: border-box;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

} 

.flexbox{
    border-top: 1px solid #ccc;
    height: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    background: #fff;
}
.flex_left,.flex_center,.flex_right,.flex_right1{
    flex: 1 1 25%;
    display: flex;
    flex-direction:column;
}
.xie_img_box{
    height: 0.5rem;
}
.flexbox img{
    width: 0.4rem;
    height: 0.4rem;
    float: left;
    padding-left: .75rem;
    margin-top: 0.1rem;
/*  line-height: 0.3rem;*/
    justify-content: center;
    align-content: center;

}
.flexbox span{
    font-size: 0.3rem;
    text-align: center;
    height: 0.5rem;
    padding-top: 0.1rem;
}
a,a:hover,a:visited{color: #333;}
</style>

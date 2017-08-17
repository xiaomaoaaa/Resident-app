<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
            <mt-header title="家医通知">
                <a slot="left" @click='$router.push("/xie_xiaoxi")'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </div>
        <div class="session">
            <ul class="msgList">
                <li class="cbafter" v-for="(item,index) in msgDetail" @click='toDetail(item.content)'>
                    <p class="msgTime">{{item.sendTime}}</p>
                    <img src="../../assets/img/zy_family_notification.png"  class="imgIcon">
                    <div class="msgContent fr">
                        <span>{{item.content.substring(0,80) + '...'}}</span>
                    </div>
                </li>
            </ul>
            <div id="more" v-show="this.msgDetail.length>=10" class="more" @click="showMore()">查看更多</div>
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
export default {
    data: function() {
        return {
            msgDetail: [],
            businessType: '616',
            pageNo: 1,
            maxDisplayLength: 10
        }
    },
    computed: {
        ...mapState({
            txb_messageContent: state => state.txb_messageContent
        })
    },
    mounted() {
        let params = ["",this.businessType,this.pageNo,this.maxDisplayLength]
        commonAjaxKy(JSON.stringify(params), 'hcn.notification', 'getAllNotifications').then(res => {
            // console.log(res)
            if (res.code === 200) {
                this.msgDetail = res.body
            }
        })
    },
    methods: {
        showMore(){
            this.pageNo++
            let params = ["",this.businessType,this.pageNo,this.maxDisplayLength]
            commonAjaxKy(JSON.stringify(params), 'hcn.notification', 'getAllNotifications').then(res => {
                if (res.code === 200) {
                    this.msgDetail = this.msgDetail.concat(res.body)
                    // console.log(this.msgDetail)
                    if(res.body < 10){
                        document.getElementById('more').style.display = 'none'
                    }
                }
            })
        },
        toDetail(e) {
            this.txb_setMessageContent(e);
            this.$router.push("/zy_notification_detail");
        },
        ...mapActions(['txb_setMessageContent'])
    }
}
</script>


<style lang='stylus' scoped>
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
}
.header .mint-header {
    height: 1rem;
    font-size: .4rem;
    background-color: #35B46F;
}
.session {
    margin-top: 1rem;
    padding-top: .2rem;
}
.session .msgTime {
    width: 3.5rem;
    line-height: .2rem;
    background-color: #e2e2e2;
    color: #fff;
    margin: .2rem auto ;
    font-size: .3rem;
    border-radius: .2rem;
    padding:.2rem;
    text-align: center;
}
.session .msgList{margin-top: -.2rem;}
.session .msgList li{margin: .3rem;}
.session .msgList li .msgContent{
    width: calc(100% - 1.6rem);
    margin-top: .2rem;
    margin-bottom: .2rem;
    background-color: #fff;
    font-size: .3rem;
    border-radius: 0 .3rem .3rem;
    padding: .25rem .3rem;
    line-height: .35rem;
}
.session .imgIcon{
    width: .8rem;
    height: .8rem;
}
.session .more{
    font-size: .2rem;
    text-align: center;
    padding-bottom: 10px;
}
</style>

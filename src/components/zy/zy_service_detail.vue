<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
        <div class="header">
            <mt-header title="服务详情">
                <a slot="left" @click='$router.push("/zy_service_record")'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </div>
        <div class="session">
            <ul class="detailInfo" >
                <li class="cbafter"><span class="fl">服务项</span><em class="fl">{{serviceItem}}</em></li>
                <li class="cbafter"><span class="fl">服务包</span><em class="fl">{{servicePack}}</em></li>
                <li class="cbafter"><span class="fl">服务对象</span><em class="fl">{{serviceObj}}</em></li>
                <li class="cbafter"><span class="fl">服务人</span><em class="fl">{{servicer}}</em></li>
                <li class="cbafter"><span class="fl">服务地点</span><em class="fl">{{serviceAddress}}</em></li>
                <li class="cbafter"><span class="fl">服务时间</span><em class="fl">{{serviceTime}}</em></li>
                <li class="cbafter"><span class="fl">服务方式</span><em class="fl">{{serviceMethod}}</em></li>
            </ul>
            <div class="serviceDescription">
                <h6><span class="greenBlock"></span>服务说明</h6>
                <p class="descripText">{{serviceDescription}}</p>
            </div>
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
            exeId: "6",
            serviceItem: '',
            servicePack: '',
            serviceObj: '',
            servicer: '',
            serviceAddress: '',
            serviceTime: '',
            serviceMethod: '',
            serviceDescription: ''
        }
    },
    mounted() {
        let params = [this.exeId]
        commonAjax(params, 'pcn.pcnServiceExecService', 'queryByExecId').then(res => {
            if (res.code === 200) {
                console.log(res.body)
                this.exeId = res.body.exeId

                this.serviceItem = res.body.serviceName
                this.servicePack = res.body.spPackName
                this.serviceObj = res.body.personName
                this.servicer = res.body.exeUserName
                this.serviceAddress = res.body.exeAddr
                this.serviceTime = res.body.exeDt.split(' ')[0]
                if(res.body.exedesc){
                    this.serviceDescription = res.body.exedesc
                }else{
                    this.serviceDescription = ''
                }

                if(res.body.exeWay=='01'){
                    this.serviceMethod = "上门服务"
                }else if(res.body.exeWay=='02'){
                    this.serviceMethod = "电话服务"
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
    .detailInfo{
        background: #fff;
        padding: .3rem;
        li{
            margin-bottom: .25rem;
            span{
                font-size: .25rem;
                color: #999;
                width: 1.5rem;
            }
            em{
                font-size: .25rem;
                color: #323232;
            }
        }
        li:last-child{
            margin-bottom: 0;
        }
    }
    .serviceDescription{
        margin-top: .2rem;
        background: #fff;
        h6{
            padding: .3rem;
            position: relative;
            font-size: .25rem;
            color: #999;
            border-bottom: 1px solid #E1E1E1;
            span{
                background: #3ab76f;
                position: absolute;
                left: 0;
                top: .25rem;
                width: .1rem;
                height: .4rem;;
            }
        }
        .descripText{
            padding: .3rem;
            font-size: 0.25rem;
            color: #323232;
        }
    }
} 
</style>

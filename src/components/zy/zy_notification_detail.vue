<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
            <mt-header title="通知详情">
                <a slot="left" @click='$router.push("/zy_family_notification")'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </div>
        <div class="session">
            <div class="msgContent">
                <span>{{txb_messageContent}}</span>
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
export default {
    data: function() {
        return {
    
        }
    },
    computed: {
        ...mapState({
            txb_messageContent: state => state.txb_messageContent
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
.session {
    padding-top: .2rem;
    margin-top: 1rem;
    .msgContent{
        text-indent: 2em;
        font-size: .3rem;
        margin-left: .1rem;
        line-height: .4rem;
    }
} 
</style>

<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
    <div class="header">
        <mt-header title="糖友圈">
            <a slot="left" @click='$router.push("/zy_service")'>
                <mt-button icon="back"></mt-button>
            </a>
            <a slot="right" @click='$router.push("/zy_service")'>
                <mt-button>关闭</mt-button>
            </a>
        </mt-header>
    </div>
    <iframe :src="tangyouquanSrc" width="100%" height="100%" v-if='tangyouquanSrc'></iframe>
</div>
</template>
<script>
import md5 from 'md5'
import {
    commonAjax,commonAjaxKy,
    requestLoginon,
    areaAjax,dicAjax
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    Indicator,MessageBox
} from 'mint-ui'
export default {
    data: function() {
        return {
            tangyouquanSrc: ''
        }
    },
    computed: {},
    components: {},
    methods: {

    },
    created() {
    },
    mounted() {
        let tempParams = JSON.parse(sessionStorage.getItem('userInfo'))
        let id = tempParams.body.id
        let nickname = tempParams.body.userName
        let mobile = sessionStorage.getItem('phoneNo')
        let timestamp = (Date.parse(new Date()) + '').slice(0,10)
        let token = md5('hcn' + md5('tyq' + id + timestamp + mobile + 'hcn') + 'tyq')
        this.tangyouquanSrc = `http://ktfa.dmday.cn/new/ksgo?from=hcn&id=${id}&timestamp=${timestamp}&mobile=${mobile}&nickname=${nickname}&token=${token}`
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
        font-size: .4rem;
        background-color: mainColor;
    }
}

</style>

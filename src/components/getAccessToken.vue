<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
    <mt-button type="primary" @click.native='hasLogin()'>登录获取accessToken</mt-button>
</div>
</template>
<script>
import md5 from 'md5'
import {
    commonAjax,
    requestLoginon1,
    areaAjax,
    dicAjax
} from '../api/api.js'
import {
    Toast
} from 'mint-ui'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {}
    },
    computed: {},
    components: {},
    methods: {
        hasLogin() {
//          let params = { //深圳居民签约账号
//              "username": '13958136509',
//              "password": md5('asdfgh'),
//              "tenantId": "hcn.shenzhen",
//          }
            let params={"loginName":"13958136509","pwd":md5('asdfgh'),"rid":"patient","forAccessToken":true,"tenantId":"hcn.shenzhen"}
            requestLoginon1(JSON.stringify(params)).then(res => {
                if (res.code === 200) {
                    Toast({
                        message: '获取成功',
                        duration: 1000
                    })
                    sessionStorage.setItem('userInfo', JSON.stringify(res))
                }
            })
        },
        ...mapActions([])
    },
    created() {},
    mounted() {
        this.hasLogin()
    }
}
</script>

<style lang='stylus' scoped>
    .mint-button {
        display: block;
        width: 80%;
        margin: 3rem auto;
    }
</style>

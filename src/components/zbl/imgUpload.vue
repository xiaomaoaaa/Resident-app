<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <div class="avatar">
        <div class="avatar-box">
            <img ref='avatarimage' :src="imgReqUrl + fileId" width="40" height="40" v-if='fileId'>
            <img ref='avatarimage' :src="src" width="40" height="40" v-else>
        </div>
        <form method="post">
            <input type="file" name="upload" id="avatar_load" @change="uploadimg" />
        </form>
    </div>
</div>
</template>
<script>
import {
    commonAjax,
    imguploadAjax,
    imgview
} from '../../api/api'
import axios from 'axios'
export default {
    data() {
        return {
            src: require('../../assets/img/zbl_avatar.png'),
            imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
            fileId: ''
        }
    },
    computed: {},
    components: {},
    methods: {
        uploadimg() {
            let formData = new FormData(document.querySelector('form'))
            imguploadAjax(formData).then(res => {
                this.fileId = res.record.fileId
            }).then(() => {
                imgview(this.fileId)
            })
            // 原生写法，有问题
            // let formData = new FormData(document.querySelector('form'))
            // let xhr = new XMLHttpRequest()
            // xhr.open('POST','http://122.224.131.235:9090/pcn-core/dataProxyController/hcnImgProxy')
            // xhr.setRequestHeader("X-Access-Token", JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken)
            // xhr.setRequestHeader("Content-Type", "multipart/form-data")
            // xhr.withCredentials = true
            // xhr.send(formData)
        }
    },
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
    .avatar{
        position: relative;
        #avatar_load{
            position: absolute;
            left: 0px;
            top: 0px;
            opacity: 0;
            width: 50px;
            height: 50px;
        }
    }
</style>

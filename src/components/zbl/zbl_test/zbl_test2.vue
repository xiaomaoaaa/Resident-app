<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <!-- <a target="_blank" @click='windowOpen'>点我</a>
    <img :src="url" alt="">图片
    号码:<input type="text" ref="input" @blur="modalshow()"> -->
    <!-- <form role="form" id="imgupload" v-on:submit.prevent>
        <input type="file" name="upload" id="avatar_load" @change="uploadimg" accept="image/*" />
     </form> -->
    <div class="avatar">
        <div class="avatar-box">
            <img ref='avatarimage' :src="imgReqUrl + fileId" width="40" height="40" v-if='fileId'>
            <img ref='avatarimage' :src="src" width="40" height="40" v-else>
        </div>
        <form method="post">
            <!-- <input type="file" name="upload" id="avatar_load" @change="uploadimg" /> -->
            <input type="file" name="upload" id="avatar_load"/>
            <input type="submit" @click.prevent ='submit'/>
        </form>
    </div>

    <!-- <form enctype="multipart/form-data" method="post" name="fileinfo">
        <label>Your email address:</label>
        <input type="email" autocomplete="on" autofocus name="userid" placeholder="email" required size="32" maxlength="64" /><br />
        <label>Custom file label:</label>
        <input type="text" name="filelabel" size="12" maxlength="32" /><br />
        <label>File to stash:</label>
        <input type="file" name="file" required />
        <input type="submit" value="Stash the file!" />
    </form> -->
    <div></div>


</div>
</template>
<script>
import {
    commonAjax,imguploadAjax,imgview
} from '../../api/api'
import axios from 'axios';
export default {
    data() {
        return {
            src: require('../../assets/img/zbl_avatar.png'),
            imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
            // imgReqUrl: 'http://192.168.1.113:8080/pcn-core/dataProxyController/hcnImgProxy',
            fileId: ''
        }
    },
    computed: {},
    components: {},
    methods: {
        submit() {
            let formData = new FormData(document.querySelector('form'))
            formData.append("CustomField", "This is some extra data")
            let xhr = new XMLHttpRequest()
            xhr.open('POST','http://192.168.1.113:8080/pcn-core/dataProxyController/hcnImgProxy')
            xhr.setRequestHeader("X-Access-Token", "f325670d-86d4-4826-a6f5-fd86ce4186c4")
            // xhr.setRequestHeader("Content-Type", "f325670d-86d4-4826-a6f5-fd86ce4186c4")
            xhr.send(formData)
            // imguploadAjax(formData).then(res => {
            //     this.fileId = res.record.fileId
            // }).then(() => {
            //     imgview(this.fileId)
            // })

            // let formData = new FormData(document.querySelector('form'))
            // formData.append("CustomField", "This is some extra data")
            // imguploadAjax(formData).then(res => {
            //     this.fileId = res.record.fileId
            // }).then(() => {
            //     imgview(this.fileId)
            // })
        },
        uploadimg(e) {
            let formData = new FormData(document.querySelector('form'))
            formData.append("CustomField", "This is some extra data")

            var instance = axios.create({
                headers: {
                    "X-Access-Token": "39940e25-5e0d-49ca-979d-983a14c495fa",
                    "Content-Type": "multipart/form-data"
                }
            })
            // instance.post('http://192.168.1.113:8080/pcn-core/dataProxyController/hcnImgProxy', formData)
            instance.post('http://122.224.131.235:9088/hcn-web/upload', formData)
                .then(res => {
                    console.log(res.data.record.fileId);
                    this.fileId = res.data.record.fileId
                    instance.get(`http://122.224.131.235:9088/hcn-web/upload/${res.data.record.fileId}`).then(res => {
                            console.log(res)
                        })
                })
        }
    },
    created() {

    }
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

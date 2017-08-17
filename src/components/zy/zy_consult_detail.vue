<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
            <mt-header title="发起咨询">
                <a slot="left" @click='$router.push("/qyxq_signed")'>
                    <mt-button icon="back"></mt-button>
                </a>
                <a slot="right" @click='$router.push("/jmzx")'>
                     <label>历史咨询</label>
                </a>
            </mt-header>
        </div>
        <div class="session">
            <div class="consultTimes">您已咨询过{{usedNum}}次，还剩下{{leftNum}}次机会</div>
            <div class="docIntro cbafter">
                <!--<img class="fl" src="../../assets/img/zy_doc.png">-->
                <img class="fl" src="../../assets/img/zbl_avatar.png">
                <div class="docInfo fl">
                    <h4>{{docInfo.name}}&nbsp;&nbsp;<span>{{docInfo.teamName}}</span></h4>
                    <i>{{doctor}}</i>
                    <p>{{docInfo.orgName}}</p>
                </div>
            </div>
            <div class="consultor cbafter">
                <span class="fl">咨询人</span>
                <div class="fr consultorDetail">
                    <img class="userA" v-if="userInfo.avatar" :src="imgReqUrl + userInfo.avatar">
                    <img class="userA" v-else src="../../assets/img/zbl_avatar.png">
                    {{userInfo.personName}}
                </div>
            </div>
            <div class="consultContent">
                <a data-v-2b243205="" class="mint-cell mint-field is-textarea is-nolabel">
                    <div class="mint-cell-left"></div> 
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text"></span>
                        </div> 
                        <div class="mint-cell-value">
                            <textarea placeholder="请描述您的问题，最多500字" rows="4" class="mint-field-core" maxlength="500" v-model="descip"></textarea> 
                            <div class="mint-field-clear" style="display: none;">
                                <i class="mintui mintui-field-error"></i>
                            </div> 
                            <span class="mint-field-state is-default">
                                <i class="mintui mintui-field-default"></i>
                            </span> 
                            <div class="mint-field-other"></div>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </a>
                <p class="countWord"><em>0</em>/500</p>
                <div class="uploadImg">
                    <p class="uploadInfo">
                        请上传病例或报告图片，最多添加4张
                    </p>
                    <div class="addImg">
                        <!-- <img src="../../assets/img/zy_uploadImg.png" @click="sheetVisible=!sheetVisible">
                        <mt-actionsheet v-if="sheetVisible==true"
                          :actions="actions"
                          v-model="sheetVisible">
                        </mt-actionsheet> -->
                        <!--<img src="../../assets/img/zy_uploadImg.png" ref='avatarimage'>-->
                         <img src="../../assets/img/zbl_avatar.png" ref='avatarimage'>
                        <form role="form" id="imgupload" v-on:submit.prevent >
                            <!-- <input multiple="multiple" type="file" name="upload" id="avatar_load" @change="uploadimg" accept="image/*" /> -->
                            <input multiple="multiple" type="text" name="upload" id="avatar_load" @click="uploadimg" accept="image/*" />
                        </form>
                    </div>
                    <p class="countImg"><em>{{countImg}}</em>/4</p>
                </div>
            </div>
            <div class="submitBtn">
                <button data-v-2b243205="" class="mint-button mint-button--default mint-button--large" @click="submitForm">
                    <label class="mint-button-text">提交</label>
                </button>
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
import api from '../../api/index.js'
import {MessageBox} from 'mint-ui'
import {
    mapState,
    mapActions
} from 'vuex'
import { Field,Button,Actionsheet,Toast } from 'mint-ui';
export default {
    data: function() {
        return {
            // actions:[
            //     {"name":"相册","method":null},
            //     {"name":"相机","method":null},
            // ],
            // sheetVisible: false,
            leftNum: 24,
            usedNum: 0,
            countImg: 0,
            detailInfo: [],
            docInfo: {},
            userInfo: {},
            imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
            doctor: '',
            descip: '',
            mpiId:'',
            docType: {"01": "全科医生","02": "全科护士","03": "公卫医师","04": "公卫护士","05": "计生医生","06": "中医师"}
        }
    },
    methods: {
        submitForm(){
            // console.log(333)
            // [{"mpiId":"1a85c393a6f4455abb32b15ba0376855","serviceDesc":"李炯","pictureFileIdString":"","memberId":"1a85c393a6f4455abb32b15ba0376855","doctorId":"708e8594-2972-421e-ae73-21228c100afc"}]
            // console.log(JSON.parse(sessionStorage.getItem('zbl_docInfo')))
            let docInfo = JSON.parse(sessionStorage.getItem('zbl_docInfo')).docInfo;
            let personInfo = JSON.parse(sessionStorage.getItem('zbl_docInfo')).selectedPersonInfo;
            // console.log(222)
            if(this.descip == ""){
                let instance = Toast('咨询内容不能为空');
                setTimeout(() => {
                  instance.close();
                }, 2000);
            }else{
                let memberId = personInfo.mpiId;
                let serviceDesc = this.descip;
                let doctorId = docInfo.doctorId;
                let params = [{
                    // 登陆人的id
                    "mpiId":this.mpiId,
                    "serviceDesc":this.descip,
                    "pictureFileIdString": '',
                    // 咨询人的id
                    "memberId":memberId,
                    "doctorId":doctorId
                }]
                console.log(111)
               commonAjaxKy(JSON.stringify(params),'pcn.imChatService','pubTheme') .then((res)=>{
                    // console.log(res)
                    if(res.code ==200){
                        // 从这边跳过去
                        console.log('上传成功了')
                        MessageBox("咨询成功，请在历史咨询中查看")
                    }
               })
            }
        },
        // 请求获取mpiid
        getAppInfo(){
            let params = [];
            api.commonAjaxKy(JSON.stringify(params),'hcn.device','getAppInfoByDevice')
                .then((res)=>{
                    if(res.code ==200){
                        // console.log(res.body);
                        // this.inviteCode = res.body.properties.inviteCode;
                        this.mpiId = res.body.user.mpiId;
                        // this.myMpiId = res.body.user.mpiId;
                        // sessionStorage.setItem('jia_mpiId',this.myMpiId);
                        // console.log(this.inviteCode)
                        // this.getCount();
                    }
                })
        },
        uploadimg(){
            let instance = Toast('暂未开通');
            setTimeout(() => {
              instance.close();
            }, 2000);
        //     let imguploadform = document.getElementById('imgupload');
        //     let load = document.getElementById('avatar_load');
        //     let file = load.files,
        //         img = this.$refs.avatarimage;
        //     // console.log(file)
        //     if(file.length>4){
        //         alert("最多只能上传4张图片！");
        //         return;
        //     }
        //     // for(var i=0;i<file.length;i++){
        //     //     let reader = new FileReader()
        //     //     // console.log(file[i])
        //     //     reader.readAsDataURL(file[i]);
        //     //     reader.onload = (e)=>{
        //     //         let result = reader.result;
        //     //         if(result){
        //     //             img.src = result;
        //     //             // console.log(result)
        //     //         }
        //     //     }
        //     //     let formData = new FormData(imguploadform);
        //     //     console.log(formData)
        //     //     formData.append('url',file[0])
        //     //     api.imguploadAjax(formData).then((res)=>{
        //     //         if(res.code===200){
        //     //             console.log('图片上传成功了')
        //     //         }
        //     //     })
        //     // }
        }
    },
    mounted() {
        let params = [{"mpiId":JSON.parse(sessionStorage.getItem('common_signApplyInfo')).mpiId}]
        commonAjax(params, 'pcn.imChatService', 'getServiceCountInfo').then(res => {
            if (res.code === 200) {
              this.leftNum = res.body.left
              this.usedNum = res.body.used
            }
        })
        this.detailInfo.push(JSON.parse(sessionStorage.getItem('zbl_docInfo')))
        this.docInfo = this.detailInfo[0].docInfo
        this.userInfo = this.detailInfo[0].selectedPersonInfo
        console.log(this.docInfo)
        for(var name in this.docType){
            if("09" == this.docInfo.docType){
                this.doctor = this.docType[name]
                break;
            }else{
                this.doctor = "其他"
            }
        }
        this.getAppInfo();
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
    label{font-size: .3rem;}
}
.header .mint-header {
    height: 1rem;
    font-size: .4rem;
    background-color: #4eab52;
}
.session {
    margin-top: 1rem;
    padding-bottom: 1rem;
    .consultTimes{
        background-color: #FFFBD0;
        color: #FAB85E;
        font-size: .2rem;
        text-align: center;
        padding: .15rem;
    }
    .docIntro{
        background-color: #fff;
        padding: .2rem;
        .docInfo{
            margin-left: .3rem;
            h4{
                font-size: .3rem;
                span{
                    font-size: .2rem;
                    color: #A7A7A7;
                    font-weight: normal;
                }
            }
            i{
                font-style: normal;
                font-size: .25rem;
                color: #A7A7A7;
                display: block;
                margin-top: .2rem;
                margin-bottom: .2rem;
            }
            p{
                font-size: .25rem;
                color: #A7A7A7; 
            }
        }
    }
    .consultor{
        margin: .2rem 0;
        padding: .2rem;
        color: #717171;
        background-color: #fff;
        span{font-size: .25rem;}
        .consultorDetail{
            font-size: .25rem;
            .userA{
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
    }
    .consultContent{
        padding:.2rem;
        background-color: #fff;
        .mint-field{
            background-image: none;
            background-color: #fafafa;
        }
        .mint-cell-wrapper{background-image: none;}
        textarea{
            resize: none;
            font-size: .2rem;
            padding: .2rem;
            color: #9C9C9C;
            background-color: #fafafa;
        }
        .countWord,.countImg{
            font-size: .2rem;
            color: #9C9C9C;
            margin-top: .2rem;
            text-align: right;
        }
        .uploadImg{
            .uploadInfo{
                font-size: .2rem;
                color: #9C9C9C;
            }
            .addImg{
                position: relative;
                margin-top: .4rem;
                img{
                    width: 1rem;
                    height: 1rem; 
                }
                #avatar_load{
                    position: absolute;
                    opacity: 0;
                    width: 1rem;
                    height: 1rem;
                    top: 0;
                    left: 0;
                }
            }
        }
    }
    .submitBtn{
        margin: .4rem;
        button{
            background-color: #35B46F;
            color: #fff;
            font-size: .25rem;
        }
    }
}
</style>

<template>
<div class="app" style="overflow-x:hidden;background-color:#fff;height:100vh;">

    <div class="header">
        <mt-header title="家医详情">
            <a slot="left" @click='$router.go(-1)'>
                <mt-button icon="back"></mt-button>
            </a>
            <router-link to="#" slot="right" v-show='this.doctorDetail.marked'>
                <mt-button class="smallbtn" @click='makeSelect'>选择</mt-button>
            </router-link>
        </mt-header>
    </div>

    <div class="body">
        <div class="personInfo">
            <div class="left-avatar">
                <img :src='imgReqUrl + avatarFileId' v-show='avatarFileId' alt="头像" style="width:1.4rem;height:1.4rem;border-radius:1.4rem;">
                <img src="../../assets/img/zbl_avatar.png" v-show='!avatarFileId' alt="头像" style="width:1.4rem;height:1.4rem">
                <mt-badge size="small" color="#888">团队长</mt-badge>
            </div>
            <div class="right-info">
                <p><span class="name">{{name}}</span></p>
                <p><span class="zhicheng">{{zhicheng | filterDocType}}</span></p>
                <p class="relative cbafter"><span class="jigou">{{homeTeamOrgName}}</span><span class="signnum">已签约<span class="numColor">{{num}}</span></span>
                </p>
                <img src="../../assets/img/zbl_erweima.png" alt="二维码" @click='showPic = true'>
            </div>
        </div>
        <div class="signFull" v-show='signFull'>
            <p>该家医团队已签满居民，请选择其他家医签约</p>
        </div>
        <div class="divide"></div>

        <mt-cell title="所属团队">
            <span style="color: grey">{{selectedTeamName}}</span>
            <img slot="icon" src="../../assets/img/zbl_team.png" width="28" height="28">
        </mt-cell>
        <div class="divide"></div>

        <mt-cell title="服务电话" is-link>
            <span style="color: grey" v-show='severPhone'><a :href="'tel:'+ severPhone" style="color:#adadad">{{severPhone}}</a></span>
            <span style="color: grey" v-show='!severPhone'>无</span>
            <img slot="icon" src="../../assets/img/zbl_severphone.png" width="28" height="28">
        </mt-cell>
        <div class="divide"></div>

        <div class="doctorIndoc">
            <mt-cell title="医生简介">
                <span class='icon-up' @click='showOrHide'></span>
                <img slot="icon" src="../../assets/img/zbl_doctorInd.png" width="28" height="28">
            </mt-cell>
            <div class="content" style="display:block">
                <p v-show='docIndoc'>{{docIndoc}}</p>
                <p v-show='!docIndoc'>暂无</p>
            </div>
        </div>
        <div class="divide"></div>

        <div class="certificate">
            <mt-cell title="资质证书">
                <span class="icon-down" @click='showOrHide'></span>
                <img slot="icon" src="../../assets/img/zbl_certificate.png" width="28" height="28">
            </mt-cell>
            <div class="content">
                <img :src='imgReqUrl + certificateHead' width="100" height="90" v-if='certificateHead'>
                <img :src='imgReqUrl + certificateBack' width="100" height="90" v-if='certificateBack'>
                <p v-else>暂无</p>
            </div>
        </div>
        <div class="divide"></div>

        <div class="serverTeam">
            <mt-cell :title='nPeople'>
                <span class="icon-down" @click='requestServerTeam'></span>
                <img slot="icon" src="../../assets/img/zbl_teamPuc.png" width="28" height="28">
            </mt-cell>
            <div class="content">
                <div class="couple cbafter" v-for='item in serverTeam'>
                    <div class="left-avatar fl">
                        <img :src="imgReqUrl + item.avatarFileId" v-show='item.avatarFileId' alt="头像" style="width:1.5rem;height:1.5rem;border-radius:1.5rem;">
                        <img src="../../assets/img/zbl_avatar.png" v-show='!item.avatarFileId' style="width:1.5rem;height:1.5rem;border-radius:1.5rem;">
                    </div>
                    <div class="right-info fl">
                        <p>
                            <span class="teamerName">{{item.name}}</span>
                            <span>{{item.docType | filterDocType}}</span><br>
                            <span v-show='!item.introduce'>无</span>
                            <span v-show='item.introduce'>{{item.introduce}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="divide"></div>

        <div class="packages">
            <mt-cell :title="nPackage">
                <span class="icon-down" @click='requestServerPackage'></span>
                <img slot="icon" src="../../assets/img/zbl_package.png" width="28" height="28">
            </mt-cell>
            <div class="content">
                <mt-cell v-for='item in packages' :title="item.spPackName" @click.native='packageDetail' :id='item.spPackId'></mt-cell>
            </div>
        </div>
        <div class="divide"></div>
    </div>

    <!--二维码隐藏-->
    <div class="erweima" v-show='showPic'>
        <div class="mask" @click="showPic=false"></div>
        <div class="showCont">
            <img :src='imgUrl' alt="二维码图片显示">
            <p>扫一扫二维码，和家医签约</p>
        </div>
    </div>
</div>
</template>
<script>
import {
    MessageBox,
    Toast
} from 'mint-ui'
import {
    commonAjax
} from '../../api/api'
import {
    mapActions,
    mapState
} from 'vuex'
export default {
    data: function() {
        return {
            name: '',
            avatarFileId: '',
            imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
            zhicheng: '',
            homeTeamOrgName: '',
            selectedTeamName: '',
            num: '',
            signFull: '',
            severPhone: '',
            docIndoc: '',
            serverTeam: [],
            packages: [],
            nPeople: '',
            nPackage: '',
            showPic: false,
            imgUrl: '',
            teamDetailInfo: {},
            requestTeamInfoParams: [],
            teamId: '',
            // docTypeDic: ['','全科医生','全科护士','公卫医生','公卫护士','计生医生','中医师','','','其他']
        }
    },
    computed: {
        ...mapState({
            doctorDetail: state => state.doctorDetail
        }),
    },
    filters: {
        filterDocType(value) {
            let docTypeDic = ['','全科医生','全科护士','公卫医生','公卫护士','计生医生','中医师','','','其他']
            if(value !== null) {
                return docTypeDic[parseInt(value)]
            }
        }
    },
    components: {},
    methods: {
        //请求团队成员信息
        //通过teamId,teamLeaderId作为参数请求团队其他成员
        //例如：["61","47bb9366-ee8e-4b05-89bf-efa5217e8202"]
        requestServerTeam(e) {
            this.showOrHide(e)
            let params = this.requestTeamInfoParams
            commonAjax(params, 'pcn.residentSignService', 'querySignDoctor').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    this.serverTeam = res.body
                }
            })
        },
        //请求服务包信息
        //通过teamId,tenantId以及第三个固定参数'spType':'2'作为参数请求服务包信息
        //例如:[{"spId":"61","tenantId":"hcn.zhongshan","spType":"2"}]
        requestServerPackage(e) {
            this.showOrHide(e)
            let params = [{
                "spId": this.teamId,
                "spType": "2"
            }]
            // console.log(params);
            commonAjax(params, 'pcn.pcnSpPackService', 'spPackList').then(res => {
                if (res.code === 200) {
                    this.packages = res.body
                    // console.log(res.body)
                }
            })
        },
        //请求服务包详情
        //通过服务包的具体spPackId作为参数请求服务包详情信息
        //例如：['152']
        packageDetail(e) {
            let params = [e.currentTarget.id]
            // console.log(params)
            commonAjax(params, 'pcn.pcnSpPackService', 'spPackDetail').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    this.getPackagesInfo(JSON.stringify(res.body))
                    this.$router.push('/qyxq_packageDetail')
                }
            })
        },
        //箭头点击下拉或收起通用函数
        showOrHide(e) {
            if (e.target.className === 'icon-down') {
                e.target.className = 'icon-up'
                e.target.parentNode.parentNode.parentNode.parentNode.lastChild.style.display = 'block'
            } else {
                e.target.className = 'icon-down'
                e.target.parentNode.parentNode.parentNode.parentNode.lastChild.style.display = 'none'
            }
        },
        //点击选择按钮之后跳转
        makeSelect(e) {
            e.preventDefault()
            let params = {}
            params.selectTeam = this.name + ' ' + this.selectedTeamName
            params.orgName = this.homeTeamOrgName
            params.teamId = this.teamId
            this.selectDocTeam(params)
            this.zbl_selectPackages([])
            this.$router.push('/zbl_qyxq')
        },
        //页面加载时先发送一次请求获取到团队成员信息,方便首页请求协议时填充成员信息
        // ["61","47bb9366-ee8e-4b05-89bf-efa5217e8202"]
        saveTeamerInfoForXieyi() {
            let params = this.requestTeamInfoParams
            commonAjax(params, 'pcn.residentSignService', 'querySignDoctor').then(res => {
                if (res.code === 200) {
                    let obj = {}
                    obj.teamersArr = res.body
                    obj.teamLeader = this.name
                    sessionStorage.setItem('zbl_teamInfo', JSON.stringify(obj))
                }
            })
        },

        ...mapActions(['zbl_selectPackages','selectDocTeam', 'getPackagesInfo'])
    },
    created() {
        let localStoreData = this.doctorDetail
        this.teamId = localStoreData.teamId
        this.selectedTeamName = localStoreData.selectedTeamName
        this.homeTeamOrgName = localStoreData.homeTeamOrgName
        this.requestTeamInfoParams = localStoreData.requestTeamInfoParams

        let teamDetailInfo = localStoreData.resBody
        this.num = teamDetailInfo.signNum
        this.docIndoc = teamDetailInfo.docInfo.introduce
        this.name = teamDetailInfo.docInfo.name
        this.avatarFileId = teamDetailInfo.docInfo.avatarFileId
        this.zhicheng = teamDetailInfo.docInfo.docType
        this.severPhone = teamDetailInfo.docInfo.phoneNo
        this.certificateBack = teamDetailInfo.docInfo.certificateBack
        this.certificateHead = teamDetailInfo.docInfo.certificateHead
        this.nPeople = '服务团队' + '(' + teamDetailInfo.docNum + ')'
        this.nPackage = '服务包' + '(' + teamDetailInfo.packNum + ')'
        this.imgUrl = require("../../assets/img/zbl_eiweima.png")
        this.saveTeamerInfoForXieyi()
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
arrowCommon() {
        .icon-down {
            position: absolute;
            border: 2.5px solid #c8c8cd;
            border-top: 0;
            border-left: 0;
            content: " ";
            top: 50%;
            right: 20px;
            width: 5px;
            height: 5px;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
        .icon-up {
            position: absolute;
            border: 2.5px solid mainColor;
            border-bottom: 0;
            border-right: 0;
            content: " ";
            top: 50%;
            right: 20px;
            width: 5px;
            height: 5px;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
}
.app {
    position: relative;
}
.header {
    .mint-header {
        height: 1rem;
        font-size: .4rem;
        background-color: mainColor;
        .smallbtn {
            font-size: .3rem;
        }
    }
}
.body {
    font-size: fontSize;
    .personInfo {
        width: 100%;
        line-height: 1.2;
        display: flex;
        margin-bottom: .2rem;
        .left-avatar {
            position: relative;
            margin-top: .2rem;
            width: 25%;
            text-align: center;
            .mint-badge {
                position: absolute;
                top: .9rem;
                left: .6rem;
                background-color: #F1C30C !important;
            }
        }
        .right-info {
            position: relative;
            margin-top: .15rem;
            margin-left: 0px;
            width: 70%;
            font-size: fontSize;
            .name {
                color: #39B26D;
                margin-right: 15px;
            }
            .zhicheng,.signnum {
                font-size: .3rem;
                color: greyFont;
            }
            p.relative {
                .jigou {
                    font-size: .3rem;
                    color: greyFont;
                    display: inline-block;
                    width: 65%;
                    overflow:hidden;
                    word-break:keep-all;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    float: left;
                }
                .signnum {
                    float: right;
                }
            }
            .numColor {
                margin-left: .1rem;
                color: #FB9D38;
            }
            img {
                position: absolute;
                right: 0;
                top: .2rem;
                width: .5rem;
                height: .5rem;
            }
        }
    }
    .signFull {
        height: .6rem;
        background-color: #FFFAD0;
        p {
            font-size: .3rem;
            text-align: center;
            line-height: .6rem;
            color: #F7D089;
        }
    }
    .doctorIndoc {
        arrowCommon()
        .mint-cell {
            border-bottom: 1px solid #ddd;
        }
        .content {
            display: none;
            p {
                font-size: .25rem;
                margin: .2rem;
                line-height: 1.5;
            }
        }
    }
    .certificate {
        arrowCommon()
        .mint-cell {
            border-bottom: 1px solid #ddd;
        }
        .content {
            display: none;
            img {
                display: inline-block;
                margin: .2rem;
            }
        }
    }
    .serverTeam {
        arrowCommon()
        .content {
            display: none;
            .couple {
                border-top: 1px solid #ddd;
                font-size: .3rem;
                color: greyFont;
                padding: .3rem 0;
                .left-avatar {
                    width: 25%;
                    margin-left: .15rem;
                }
                .right-info {
                    width: 70%;
                    margin-top: .15rem;
                    line-height: 1.5;
                    .teamerName {
                        font-size: fontSize;
                        color: black;
                        margin-right: .2rem;
                    }
                }
            }
        }
    }
    .packages {
        arrowCommon()
        .content {
            display: none;
            p {
            font-size: .25rem;
            margin: .2rem;
            line-height: 1.5;
            }
        }
    }
    .divide {
        height: 10px;
        background-color: #F2F2F2;
    }
}
.erweima {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -110px;
    margin-top: -110px;
    .mask {
    position: fixed;
    width: 100%;
    top:0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    }
    .showCont {
        transform: translateZ(19px);
        img {
            width: 220px;
            height: 220px;
        }
        p {
            margin-top: .1rem;
            font-size: .3rem;
            text-align: center;
            color: #ddd;
        }
    }
}
</style>

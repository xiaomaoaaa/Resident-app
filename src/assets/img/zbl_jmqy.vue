<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
    <div class="header">
        <mt-header title="家庭">
            <a slot="left" @click='$router.push("xie_home")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="body">
        <div class="itemTitle">待签约居民</div>
        <div class="waitForSign">
            <div class="items" v-for='(item,index) in queryFamilyArrStatus1'>
                <img src="../../assets/img/zbl_avatar.png" width="60" height="60" style='border-radius:50%' v-if='!item.avatar' @click='waitForSign' :id='index'>
                <img :src="imgReqUrl + item.avatar" width="60" height="60" style='border-radius:50%' v-if='item.avatar' @click='waitForSign' :id='index'>
                <p class="personName">{{item.personName}}</p>
            </div>
            <div class="items addIcon">
                <img src="../../assets/img/zbl_add.png" width="30" height="30" @click='addFamily'>
                <p class="personName">添加</p>
            </div>
            <div class="text">点击待签约居民头像进行签约</div>
        </div>
        <div class="divide"></div>

        <div class="itemTitle">签约中/已签约居民</div>
        <div class="signingAndSigned">
            <div class="items" v-for='(item,index) in queryFamilyArrStatus24'>
                <img src="../../assets/img/zbl_avatar.png" width="60" height="60" style='border-radius:100%' v-show='!item.avatar' :id='index' @click='signingAndSigned'>
                <img :src="imgReqUrl + item.avatar" width="60" height="60" style='border-radius:100%' v-if='item.avatar' :id='index' @click='signingAndSigned'>
                <p class="personName">{{item.personName}}</p>
                <mt-badge size="small" color="#888" v-if='item.status === "1"'>签约中</mt-badge>
                <mt-badge size="small" color="#888" v-if='item.status === "2"' class="badgeGreen">已签约</mt-badge>
            </div>
        </div>

        <div class="signIntroduction">每个居民只能签约一个家庭医生，签约周期内不能重复签约</div>
        <div class="signProcess">
            <img src="../../assets/img/zbl_signProcess.png" width="100%">
        </div>
    </div>

</div>
</template>
<script>
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
            queryFamilyArr: [],
            queryFamilyArrStatus1:[],
            queryFamilyArrStatus24:[],
            imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
        }
    },
    computed: {},
    components: {},
    methods: {
        getsuitableDic() {
            dicAjax().then(res => {
                sessionStorage.setItem('suitableDic',JSON.stringify(res.items))
            })
        },
        waitForSign(e) {
            let params = this.queryFamilyArrStatus1[e.target.id]
            this.zbl_getPersonInfo(JSON.stringify(params))
            sessionStorage.removeItem('zbl_flag')
            this.zbl_editPhoneNo('')
            this.zbl_selectAddress({})
            this.zbl_selectPackages([])
            this.selectDocTeam({})
            this.$router.push('/zbl_qyxq')
        },
        signingAndSigned(e) {
            let params = this.queryFamilyArrStatus24[e.target.id]
            this.zbl_getPersonInfo(JSON.stringify(params))
            if(params.status === '2') {
                this.$router.push('/qyxq_signed')
            } else {
                this.$router.push('/qyxq_edit')
            }
        },
        addFamily() {
            this.$router.push('/qyxq_addMember')
        },
        ...mapActions(['zbl_getPersonInfo','zbl_editPhoneNo','zbl_selectAddress','zbl_selectPackages','selectDocTeam'])
    },
    created() {
        this.getsuitableDic()
    },
    mounted() {
        Indicator.open('加载中...')
        let params = ["hcn.shenzhen",JSON.parse(sessionStorage.getItem("userInfo")).body.userId]
        commonAjaxKy(JSON.stringify(params), 'pcn.residentSignService', 'queryFamily').then(res => {
            if (res.code === 200) {
                Indicator.close()
                // console.log(res.body)
                this.queryFamilyArr = res.body
                this.queryFamilyArr.forEach(item => {
                    if(item.status === '1' || item.status === '2') { //2为签约完成，1为待签约
                        this.queryFamilyArrStatus24.push(item)
                    } else {
                        this.queryFamilyArrStatus1.push(item)
                    }
                })
            } else {
                Indicator.close()
                MessageBox('提示', '请求超时,请重试')
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
    .mint-header {
        height: 1rem;
        font-size: .4rem;
        background-color: mainColor;
    }
}
body {
    .itemTitle {
        font-size: .3rem;
        padding: .2rem;
        border-bottom: 1px solid #ddd;
    }
    .waitForSign {
        .items {
            width: 25%;
            padding: .3rem;
            text-align: center;
            display: inline-block;
            .personName {
                margin-top: .2rem;
                font-size: .3rem;
            }
        }
        .addIcon {
            width: 20%;
            img {
                border: 1px dashed #ddd;
                padding: 10px;
            }
        }
        .text {
            width: 90%;
            margin: .2rem auto;
            text-align: center;
            font-size: .3rem;
            color: greyFont;
        }
    }
    .signingAndSigned {
        .items {
            position: relative;
            width: 25%;
            padding: .3rem;
            text-align: center;
            display: inline-block;
            .personName {
                margin-top: .2rem;
                font-size: .3rem;
            }
            .mint-badge {
                position: absolute;
                top: 50%;
                left: 30%;
                background-color: #F1C30C !important;
            }
            .badgeGreen.mint-badge {
                background-color: #67cc70 !important;
            }
        }
    }
    .signIntroduction {
        background-color: #f2f2f2;
        font-size: .2rem;
        padding: .3rem;
        line-height: 1.5;
        text-align: center;
    }
    .signProcess {
        margin-top: .2rem;
    }
}
.divide {
    height: 10px;
    background-color: #F2F2F2;
}

</style>

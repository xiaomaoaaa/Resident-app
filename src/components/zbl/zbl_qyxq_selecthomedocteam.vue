<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header title="选择家医">
            <router-link to="/qyxq_selectareaorg" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>

    <div class="body">
        <div class="container">
            <p class="teamName">{{homeTeamOrgName}}</p>
            <div class="detail"><img src="../../assets/img/zbl_docteam.png"><span>团队数</span><span>{{homeTeam.teamCounts}}</span></div>
        </div>
        <div class="divide"></div>

        <div class="title">选择家医团队</div>
        <div class="container" v-for='item in homeTeam.teams' @click='showTeamDetail' :id='item.tenantId+"_"+item.teamId+"_"+item.teamLeaderId+"_"+item.teamName'>
            <p class="teamName">{{item.teamName}}</p>
            <div class="detail"><span>团队长:</span><span>{{item.teamLeaderName}}</span></div>
            <i class="icon"></i>
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
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {
            homeTeam: {},
            homeTeamOrgName: ''
        }
    },
    computed: {},
    components: {},
    methods: {
        //跳转家医详情页
        //通过选中的家医团队的tenantId,teamId,teamLeaderId三个作为请求参数
        //例如：["hcn.zhongshan","61","47bb9366-ee8e-4b05-89bf-efa5217e8202"]
        showTeamDetail(e) {
            let tempArr = e.currentTarget.id.split('_')
            let params = tempArr.slice(0, -1)
            let selectedTeamName = tempArr.slice(-1).join('') //获取点击对象的团队名称
            commonAjax(params, 'pcn.residentSignService', 'getDoctorDetail').then(res => {
                if (res.code === 200) {
                    let obj = {} //该对象包含本页面请求到的团队名称及归属名称
                    obj.resBody = res.body
                    obj.teamId = params[1]  //截取teamId值,用于服务包的请求参数
                    obj.selectedTeamName = selectedTeamName
                    obj.homeTeamOrgName = this.homeTeamOrgName
                    obj.requestTeamInfoParams = params.slice(1) //点击请求团队成员的参数
                    obj.marked = true //标识选择按钮是否显示
                    // console.log(obj)
                    this.getDoctorDetail(JSON.stringify(obj))
                    this.$router.push('/qyxq_doctordetail')
                }
            })
        },
        ...mapActions(['getDoctorDetail'])
    },
    mounted() {
        this.homeTeam = JSON.parse(sessionStorage.getItem('zbl_selectTeamDetail'))
        this.homeTeamOrgName = this.homeTeam.teams[0].orgName
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: relative;
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
}
.body {
    .container {
        position: relative;
        padding: .3rem;
        border-top: 1px solid #ddd;
        background-color: #fff;
        .teamName {
            font-size: fontSize
            color: mainColor
        }
        .detail {
            font-size: .3rem;
            margin-top: .2rem;
            img {
                width: 16px;
                height: 16px;
                margin-right: .2rem;
            }
            span {
                color: greyFont
                margin-right: .2rem;
            }
        }
        .icon {
            position: absolute;
            border: 2.5px solid #ddd;
            border-bottom: 0;
            border-left: 0;
            content: " ";
            top: 50%;
            right: 20px;
            width: .1rem;
            height: .1rem;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
    }
    .title {
        font-size: .3rem;
        background-color: #fff;
        padding: .2rem;
        padding-left: 0;
        color: greyFont;
    }
    .title:before {
        content: '';
        height: .1rem;
        border-left: .1rem solid mainColor;
        margin-right: .2rem;
    }
    .divide {
        height: 10px;
        background-color: #F2F2F2;
    }
}
</style>

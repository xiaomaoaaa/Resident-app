<template>
<div class="app" style="overflow-x:hidden;height:100vh;">

    <div class="header">
        <mt-search :value='searchKey' @input='search' placeholder='输入医生、医院、机构搜索'></mt-search>
        <i class="arrow-left" @click="$router.push('/qyxq_selectareaorg')"></i>
    </div>

    <div class="body">
        <div class="doctor" v-show='doctorArr.length'>
            <p class="itemType">医生</p>
            <div class="itemList" v-for='item in doctorArr' @click='doctorDetail' :id='item.teamId + "_" + item.docId + "_" + item.teamName + "_" + item.orgName'>
                <p>
                    <span class="name">{{item.docName}}</span>
                    <span class="org">{{item.teamName}}</span>
                    <p>{{item.orgName}}</p>
                </p>
                <i class="icon-right"></i>
            </div>
        </div>

        <div class="team" v-show='teamArr.length'>
            <p class="itemType">团队</p>
            <div class="itemList" v-for='item in teamArr' @click='teamDetail' :id='item.teamId + "_" + item.teamLeaderId + "_" + item.teamName + "_" + item.orgName'>
                <p>{{item.teamName}}<span>{{item.orgName}}</span></p>
                <p>
                    <img src="../../assets/img/zbl_qyys.png">签约医生<span>{{item.teamDocCounts}}</span>
                </p>
            </div>
        </div>

        <div class="org" v-show='orgArr.length'>
            <p class="itemType">机构</p>
            <div class="itemList" v-for='item in orgArr' :id='item.orgId'>
                <p class="teamName" @click='orgDetail'>{{item.orgName}}</p>
                <div class="detail"><img src="../../assets/img/zbl_docteam.png"><span>团队数</span><span>{{item.teamCounts}}</span></div>
            </div>
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
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {
            searchKey: '',
            result: [],
            doctorArr: [],
            teamArr: [],
            orgArr: []
        }
    },
    computed: {},
    components: {},
    methods: {
        //关键词搜索接口
        // let params = ["张"]
        search(e) {
            if(e[0]) {
                let params = [e]
                // console.log(params)
                commonAjax(params, 'pcn.searchOrgDeptTeamService', 'searchOrgDeptTeam').then(res => {
                    if (res.code === 200) {
                        // console.log(res.body)
                        if(res.body.teamDoc && res.body.team && res.body.org) {
                            this.doctorArr = res.body.teamDoc
                            this.teamArr = res.body.team
                            this.orgArr = res.body.org
                        } else {
                            Toast({
                                message: '搜索结果为空',
                                duration: 500
                            })
                        }
                    }
                })
            }
        },
        //搜索医生列表之后点击查看医生详情请求接口
        //["pcn.zhongshan","2","40495e02-10b4-4297-ae85-19b5d08f113d"]
        doctorDetail(e) {
            let tempArr = e.currentTarget.id.split('_')
            let params = tempArr.slice(0, 2)
            params.unshift('pcn.zhongshan')
            // console.log(params)
            commonAjax(params, 'pcn.residentSignService', 'getDoctorDetail').then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    let obj = {}
                    obj.resBody = res.body
                    obj.teamId = params[1] //截取teamId值,用于服务包的请求参数
                    obj.selectedTeamName = tempArr.slice(2, 3).join('')
                    obj.homeTeamOrgName = tempArr.slice(3).join('')
                    obj.requestTeamInfoParams = params.slice(1) //点击请求团队成员的参数
                    obj.marked = true //标识选择按钮是否显示
                    // console.log(obj)
                    this.getDoctorDetail(JSON.stringify(obj))
                    this.$router.push('/qyxq_doctordetail')
                }
            })
        },

        teamDetail(e) {
            this.doctorDetail(e)
        },

        orgDetail(e) {
            let params = [e.currentTarget.id]
            commonAjax(params, 'pcn.teamService', 'getOrgVOByOrgId').then(res => {
                if (res.code === 200) {
                    sessionStorage.setItem('zbl_selectTeamDetail', JSON.stringify(res.body))
                    this.$router.push('/qyxq_selecthomedocteam')
                }
            })
        },
        ...mapActions(['getDoctorDetail'])
    },
    created() {

    }

}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: relative;
    .arrow-left {
        position: absolute;
        border: 2.5px solid #fff;
        border-top: 0;
        border-right: 0;
        content: " ";
        top: 50%;
        left: 12px;
        width: .2rem;
        height: .2rem;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
        z-index: 88;
    }
}
.mint-search {
    height: auto;
}
.itemType {
    font-size: .3rem;
    background-color: #ddd;
    height: 15px;
    padding: .2rem;
}
.doctor {
    .itemType {
        font-size: .3rem;
        background-color: #ddd;
        height: 15px;
        padding: .2rem;
    }
    .itemList {
        position: relative;
        border-top: 1px solid #ddd;
        p {
            font-size: .3rem;
            padding: .15rem;
            color: greyFont;
            .name {
                font-size: .35rem;
                color: mainColor;
            }
            .org {
                margin-left: .1rem;
            }
        }
        .icon-right {
            position: absolute;
            border: 2.5px solid #ddd;
            border-bottom: 0;
            border-left: 0;
            content: " ";
            top: 50%;
            right: 20px;
            width: 0.2rem;
            height: 0.2rem;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
    }
}
.team {
    .itemList {
    padding-top: .2rem
    background: #fff
    color: greyFont
    border-top: 1px solid #ddd
    p:nth-child(1) {
        margin-left:.2rem
        margin-bottom: .2rem
        font-size: fontSize
        color: mainColor
        span {
            margin-left: .2rem
            font-size: .3rem
            color: greyFont
        }
    }
    p:nth-child(2) {
        margin: .2rem
        font-size: .35rem
        span {
            margin-left: .2rem
        }
    }
    img {
        width: .4rem
        height: .4rem
        margin-right: .3rem
    }
}
}
.org {
    .itemList {
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
    }
}

</style>

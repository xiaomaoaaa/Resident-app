<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header>
            <a slot="left" @click='$router.push("/zbl_qyxq")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="btnSelect" @click='showOrHide'>
            <h1 ref='areaName'>{{zbl_address.streetText}}</h1><i class='icon-down' ref='iconDown'></i>
        </div>
        <i class="icon-search" @click='search'></i>
    </div>

    <div class="szArea" v-show='showszArea'>
        <mt-cell :id='item.key+"_"+item.text' @click.native='selectedArea' v-for='item in dictionaryArr' :value='item.text'></mt-cell>
    </div>

    <div class="body" v-show='!showszArea'>
        <div class="container" v-for='item in docTeam'>
            <p class="teamName" :id="item.orgId" @click='showDetail'>{{item.orgName}}</p>
            <div class="detail"><img src="../../assets/img/zbl_docteam.png"><span>团队数</span><span>{{item.teamCounts}}</span></div>
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
    mapState,
    mapActions
} from 'vuex'
import {
    commonAjax
} from '../../api/api.js'
import provinceCityArea from '../common/provinceCityArea.json'
export default {
    data: function() {
        return {
            docTeam: [],
            showszArea: false,
            dictionaryArr: []
        }
    },
    computed: {
        ...mapState({
            zbl_address: state => state.zbl_address,
        }),
    },
    components: {},
    methods: {
        showOrHide(e) { //箭头点击下拉或收起
            if (e.currentTarget.lastChild.className === 'icon-down') {
                this.showszArea = true
                e.currentTarget.lastChild.className = 'icon-up'
            } else {
                this.showszArea = false
                e.currentTarget.lastChild.className = 'icon-down'
            }
        },
        //查看更多
        //通过选中的社区服务组织的orgId作为请求参数
        showDetail(e) {
            let params = [e.target.id]
            commonAjax(params, 'pcn.teamService', 'getOrgVOByOrgId').then(res => {
                if (res.code === 200) {
                    sessionStorage.setItem('zbl_selectTeamDetail', JSON.stringify(res.body))
                    // console.log(res.body);
                    this.$router.push('/qyxq_selecthomedocteam')
                }
            })
        },
        //当切换地区时响应触发调用
        selectedArea(e) {
            let params = [{
                "areaId": e.currentTarget.id.split('_')[0]
            }]
            commonAjax(params, 'pcn.searchOrgDeptTeamService', 'queryOrgsByAreaId').then(res => {
                if (res.code === 200) {
                    this.docTeam = res.body
                }
            })
            this.$refs.areaName.innerHTML = e.currentTarget.id.split('_')[1]
            this.$refs.iconDown.className = 'icon-down'
            this.showszArea = false
        },
        //页面加载前通过用户选择的street keyCode获取该地区的家医组织信息
        areaIdGetOrg() {
            let params = [{
                "areaId": this.zbl_address.streetKeyCode
            }]
            commonAjax(params, 'pcn.searchOrgDeptTeamService', 'queryOrgsByAreaId').then(res => {
                if (res.code === 200) {
                    this.docTeam = res.body
                    // console.log(res.body)
                }
            })
        },
        search() {
            this.$router.push('/qyxq_searchdoct')
        },
        ...mapActions(['selectServerTeam', 'zbl_selectAddress'])
    },
    mounted() {
        this.areaIdGetOrg()
        this.dictionaryArr = JSON.parse(sessionStorage.getItem('regionDictionary')).filter(item => {
            return item.regionCode === this.zbl_address.regionCode
        })[0].body
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
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
    .icon-down {
        position: absolute;
        border: 2.5px solid #fff;
        border-top: 0;
        border-left: 0;
        content: " ";
        top: 50%;
        right: -15px;
        width: .1rem;
        height: .1rem;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
    .icon-up {
        position: absolute;
        border: 2.5px solid #fff;
        border-bottom: 0;
        border-right: 0;
        content: " ";
        top: 50%;
        right: -15px;
        width: .1rem;
        height: .1rem;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
    .btnSelect {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        h1 {
            font-size: .35rem;
            color: #fff;
        }
    }
}
.body {
    .container {
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

.info-enter,.info-leave-active {
    opacity: 0;
    transform: translate3d(0,20%,0);
}
.info-enter-active {
    transition: all .8s cubic-bezier(0.4,0,0,1.5);
}

/*字体图标*/
@font-face {
  font-family: 'icomoon';
  // src:  url('../../assets/font/icomoon.svg');
  src:  url('../../assets/font/icomoon.ttf');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  // font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: .4rem;
  color: #fff;
  position: absolute;
  top: 27%;
  right: 15px;
}

.icon-search:before {
  content: "\e986";
}

</style>

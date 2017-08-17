<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header title="服务包">
            <a slot="left" @click='$router.go(-1)'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="container" v-for='(item,index) in contents'>
            <div class="introduction">
                <p class="title">{{item.spPackName}}</p>
                <p class="forWho">适合人群编号: {{item.suitableObject}}</p>
            </div>
            <mt-button size="small" @click.native='detail' :id='item.spPackId'>详情</mt-button>
        </div>
    </div>
</div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
import {
    commonAjax,
    dicAjax
} from '../../api/api'
import {
    mapActions,
    mapState
} from 'vuex'
export default {
    data: function() {
        return {
            count: 0,
            contents: [],
            pagTitle: {},
            suitableDic: []
        }
    },
    computed: {},
    components: {},
    methods: {
        //点击详情跳转
        detail(e) {
            // ['152']
            let params = [e.currentTarget.id]
            commonAjax(params, 'pcn.pcnSpPackService', 'spPackDetail').then(res => {
                if (res.code === 200) {
                    this.getPackagesInfo(JSON.stringify(res.body))
                    // console.log(res.body)
                    this.$router.push('/qyxq_packageDetail')
                }
            })
        },
        //获取适用人群字典并解析
        mapSuitableDic() {
            this.contents.forEach(item => {
                let result = []
                if(item.suitableObject) {
                    for (let i = 0, arr = item.suitableObject.split(','); i < arr.length; i++) {
                        let tempArr = this.suitableDic.filter(item2 => {
                            return item2.key === arr[i]
                        })
                        result.push(tempArr[0].text)
                    }
                    item.suitableObject = result.join(', ')
                }
            })
        },
        ...mapActions(['zbl_selectPackages', 'getPackagesInfo']) //镜像action.js中的函数到当前
    },
    // beforeRouteEnter(to, from, next) {
    //     console.log('aaaa');
    //     next()
    // },
    created() {
        this.suitableDic = JSON.parse(sessionStorage.getItem('suitableDic'))
        this.contents = JSON.parse(sessionStorage.getItem('zbl_signedPackages'))
        this.mapSuitableDic()
    }
}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_checkboxstyle.css"
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
        .smallbtn {
            font-size: .3rem;
        }
    }
}
.body {
    .container {
        position: relative;
        height: 1.4rem;
        border-bottom: 2px solid #ddd;
        .introduction {
            position: absolute;
            left: .5rem;
            top: 0;
            p {
                font-size: fontSize
                margin: .25rem 0
            }
            .title {
                color: mainColor
            }
            .forWho {
                font-size: .3rem;
                    color: greyFont;
                    width: 260px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 5rem;
            }
        }
        .mint-button {
            position: absolute
            right: .4rem
            top: .4rem
            background-color: #F1C50E
            color: #fff
            font-size: .2rem
        }
    }

}
</style>

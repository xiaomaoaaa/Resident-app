<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header title="服务包">
            <router-link to="/zbl_qyxq" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <a slot="right">
                <mt-button class="smallbtn" @click.native='makeSure'>确定<span v-show='count'>({{count}})</span></mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="container" v-for='item in contents'>
            <div class="my_checkbox">
                <input type="checkbox" value="item1" :id='item.spPackId' @click='addCount' ref='checkBox'/>
                <label :for='item.spPackId'></label>
            </div>
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
    methods: {
        //选中数量计算
        addCount(e) {
            let propName = e.target.parentNode.parentNode.children[1].firstChild.innerHTML
            if (e.target.checked) {
                this.count++
                    this.pagTitle[propName] = 1
            } else {
                this.count--
                    delete this.pagTitle[propName]
            }
        },
        //点击详情跳转
        detail(e) {
            // ['152']
            let params = [e.currentTarget.id]
            // console.log(params)
            commonAjax(params, 'pcn.pcnSpPackService', 'spPackDetail').then(res => {
                if (res.code === 200) {
                    this.getPackagesInfo(JSON.stringify(res.body))
                    // console.log(res.body)
                    this.$router.push('/qyxq_packageDetail')
                }
            })
        },
        //点击确定选中
        makeSure(e) {
            e.preventDefault()
            let inputEles = this.$refs.checkBox,
                flag = false,
                spPackIdArr = []
            inputEles.forEach(item => {
                if (item.checked) {
                    spPackIdArr.push(item.id)
                    flag = true
                }
            })
            if (flag) {
                // console.log(spPackIdArr);
                this.zbl_selectPackages(Object.keys(this.pagTitle))
                sessionStorage.setItem('spPackIdArr',spPackIdArr)
                this.$router.push('/zbl_qyxq')
            } else {
                Toast({
                    message: '请至少选择一个服务包',
                    duration: 1000
                })
            }
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
    created() {
        this.suitableDic = JSON.parse(sessionStorage.getItem('suitableDic'))
        this.contents = JSON.parse(sessionStorage.getItem('zbl_serverPackages'))
        this.mapSuitableDic()
    },
    mounted() {},
    // filters:{
    //     filterSuitable(value) {
    //         let result = []
    //         console.log(value);
    //         for (let i = 0,arr = value.split(','); i < arr.length; i++) {
    //             let tempArr = this.suitableDic.filter(item => {
    //                 return item.key === arr[i]
    //             })
    //             result.push(tempArr[0].text)
    //         }
    //         console.log(result);
    //         return result.join(',')
    //     },
    // }
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
            left: 1.4rem;
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
                    width: 4.5rem;
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

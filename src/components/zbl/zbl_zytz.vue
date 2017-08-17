<template>
<div class="zbl_zytz" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">
    <div class="header">
        <mt-header title="中医体质辨识">
            <a slot="left" @click='$router.push("/xie_tvm_constitution")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="body">
        <div class="greenBg">
            <p class="leftExesNum" v-if='count === sumNum'>答题完成，提交查看答案吧 !</p>
            <p class="leftExesNum" v-else>剩余{{ sumNum - count }}题,加油 !</p>
            <div class="progress">
                <img src="../../assets/img/zbl_pen.png" class="penIcon">
                <mt-progress :value="progressNum" :bar-height="8"></mt-progress>
            </div>
            <p class="countNum">第{{ count }}题/共{{ sumNum }}题</p>
        </div>
        <div class="questions" v-for='item in resultArr' v-show='count === item.order'>
            <p class="exeTitle">({{item.order}}) {{item.title}}</p>
            <mt-radio :options="item.optionItem" @click.native='selectAns($event,item)'>
            </mt-radio>
        </div>
        <div class="btn-group">
            <mt-button @click.native="prev">上一题</mt-button>
            <mt-button class='commit' @click.native="commit" v-if='count === sumNum'>提交</mt-button>
            <mt-button @click.native="next" v-else>下一题</mt-button>
        </div>
    </div>
</div>
</template>
<script>
import {
    commonAjax,
    commonAjaxKy
} from '../../api/api.js'
import {
    Indicator,
    Progress,
    Radio,
    MessageBox,
    Toast
} from 'mint-ui'
export default {
    data: function() {
        return {
            progressNum: 1,
            count: 1,
            sumNum: 60,
            questionsArr: [],
            resultArr: [],
            resultObj: {}
        }
    },
    computed: {},
    components: {},
    methods: {
        selectAns(e, item) {
            if (e.target.classList.contains('mint-radio-input')) {
                this.resultObj[item.order + ''] = parseInt(e.target.value)
                // console.log(this.resultObj)
                let timer
                if (timer) {
                    clearTimeout(timer)
                }
                if (this.count < this.sumNum) {
                    let that = this
                    timer = setTimeout(function() {
                        that.count++
                            that.progressNum = 100 / that.sumNum * that.count
                        that.penMove()
                        // let textSpan = e.target.parentNode.nextSibling.nextSibling
                        // textSpan.classList.add('selected')
                    }, 100)
                } else {
                    MessageBox('提示', '您已全部答完，请点击提交')
                }
            } else {}
        },
        prev() {
            if (this.count > 1) {
                this.count--
                    this.progressNum = 100 / this.sumNum * this.count
                this.penMove()
            }
        },
        next() {
            if (this.count < this.sumNum) {
                if (this.resultObj[this.count]) {
                    this.count++
                        this.progressNum = 100 / this.sumNum * this.count
                    this.penMove()
                } else {
                    Toast({
                        message: '请选择答案',
                        duration: 1000
                    })
                }
            } else {
                MessageBox('提示', '您已全部答完，请点击提交!')
            }
        },
        penMove() {
            let move = window.innerWidth * 0.7 / this.sumNum * this.count + 'px'
            document.querySelector('.progress > .penIcon').style.marginLeft = `calc(-0.6rem + ${move})`
        },
        commit() {
            if (this.resultObj[this.count]) {
                Indicator.open('加载中...')
                let params = [{
                    "doctorRecordFlag": "0", //医生自测还是给其他人测标识
                    "num": this.resultObj
                }]
                // console.log(params)
                commonAjaxKy(JSON.stringify(params), 'hcn.physiqueService', 'getTcmResults')
                    .then(res => {
                        Indicator.close()
                        if (res.code === 200) {
                            console.log(res.body)
                            this.$router.push({
                                path: '/zbl_zytz_result',
                                query: {
                                    result: res.body
                                }
                            })
                        }
                    })
            } else {
                Toast({
                    message: '请选择答案',
                    duration: 1000
                })
            }
        }
    },
    created() {
        // console.log('created');
    },
    mounted() {
        Indicator.open('加载中...')
        commonAjaxKy(JSON.stringify([]), 'hcn.physiqueService', 'getTcmQuestions')
            .then(res => {
                Indicator.close()
                if (res.code === 200) {
                    this.questionsArr = res.body.questions
                    this.sumNum = this.questionsArr.length
                    this.questionsArr.sort((a, b) => {
                        return a.order - b.order
                    })
                    this.questionsArr.forEach(item => {
                        let obj = {},
                            tempArr = []
                        obj.title = item.question
                        obj.order = item.order
                        item.options.forEach(item2 => {
                            let obj2 = {}
                            obj2.label = item2.option
                            obj2.value = item2.optionId + ''
                            tempArr.push(obj2)
                        })
                        obj.optionItem = tempArr
                        this.resultArr.push(obj)
                    })
                }
            })
        // this.$route.meta.keepAlive = true
        // console.log('mounted');
    },
    // beforeRouteEnter(to,from,next) {
    //     to.meta.keepAlive = false
    //     console.log('beforeEnter');
    //     next(vm => {
    //         to.meta.keepAlive = true   //设置为true时直接读取内存，如果缓存不存在，则首次请求创建，有缓存则直接读取
    //         console.log('next');
    //     })
    // },
    // destroyed() {
    //     console.log('destroyed')
    // }
}
</script>
<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 11;
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
}
.body {
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    background-color: #F2F2F2;
    .greenBg {
        background: url('../../assets/img/zbl_bg.png') no-repeat;
        width: 100%;
        height: 3.5rem;
        // background-size: cover;
    }
    .leftExesNum {
        margin-bottom: 10px;
        font-size: .35rem;
        text-align: center;
        padding: .1rem;
        color: orange;
    }
    .progress {
        width: 70%;
        margin: 0 auto;
        .penIcon {
            width: 1.2rem;
            height: 1.3rem;
            margin-left: -.6rem;
        }
        .mt-progress {
            width: 100%;
        }
    }
    .countNum {
        font-size: .35rem;
        text-align: center;
        color: #fff;
        margin-top: 5px;
    }
    .questions {
        background-color: #fff;
        padding-bottom: 20px;
        .exeTitle {
            font-size: .35rem;
            padding: .3rem;
            line-height: 1.3;
        }
    }
    .btn-group {
        margin-top: 30px;
        .mint-button {
            display: block;
            width: 80%;
            margin: 20px auto;
            background-color: #fff;
            color: green;
            border: 1px solid green;
            font-size: .3rem;
        }
        .commit {
            background-color: #42ba6f;
            color: #fff;
        }
    }
}
</style>

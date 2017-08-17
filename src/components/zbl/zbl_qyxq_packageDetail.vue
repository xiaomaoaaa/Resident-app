<template>
<div class="app" style="overflow-x:hidden;">
    <div class="header">
        <mt-header :title="packagesInfo.spPackName">
            <a slot="left">
                <mt-button icon="back" @click.native='goBack'></mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="part">
            <p v-show='!packagesInfo.packDesc'>暂无内容</p>
            <p v-show='packagesInfo.packDesc'>{{packagesInfo.packDesc}}</p>
        </div>
        <div class="divide"></div>

        <div class="part">
            <div class="title">合计价格</div>
            <div class="container">
                <p v-show='packagesInfo.price == "0"'>￥0.00</p>
                <p v-show='packagesInfo.price != "0"'>￥{{packagesInfo.price}}</p>
            </div>
        </div>
        <div class="divide"></div>

        <div class="part">
            <div class="title">优惠价格</div>
            <div class="container">
                <p v-show='!packagesInfo.discountList.length'>暂无优惠</p>
                <p v-show='packagesInfo.discountList.length' v-for='item in packagesInfo.discountList'>
                    <span>{{item.discountTypeName}}: </span>
                    <span>{{item.discountAmount}}%</span>
                </p>
            </div>
        </div>
        <div class="divide"></div>

        <div class="part">
            <div class="title">签约适合对象</div>
            <div class="container">
                <p>适合对象编号: {{packagesInfo.suitableObject}}</p>
            </div>
        </div>
        <div class="divide"></div>

        <div class="part">
            <div class="title">服务项目</div>
            <div class="container" v-for='item in packagesInfo.itemList'>
                <p class="serviceName">{{item.serviceName}}</p>
                <p>{{item.serviceDesc}}</p>
                <p>年服务次数:{{item.times}}</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    data: function() {
        return {
            suitableDic: []
        }
    },
    computed: {
        ...mapState({
            packagesInfo: state => state.packagesInfo,
        })
    },
    components: {},
    methods: {
        goBack() {
            // this.$router.push('/qyxq_doctordetail')
            this.$router.go('-1')
        },
        //获取适用人群字典并解析
        mapSuitableDic() {
            this.contents.forEach(item => {
                let result = []
                for (let i = 0, arr = item.suitableObject.split(','); i < arr.length; i++) {
                    let tempArr = this.suitableDic.filter(item2 => {
                        return item2.key === arr[i]
                    })
                    result.push(tempArr[0].text)
                }
                item.suitableObject = result.join(', ')
            })
        },
    },
    mounted() {},
    created() {
        // console.log(this.packagesInfo)
        this.suitableDic = JSON.parse(sessionStorage.getItem('suitableDic'))
        this.contents = [this.packagesInfo]
        this.mapSuitableDic()
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .3rem
    .header {
        position: relative;
        .mint-header {
            height: 1rem;
            font-size: .4rem;
            background-color: mainColor;
        }
    }
    .body {
        .title {
            font-size: .3rem;
            background-color: #fff;
            padding: .2rem;
            padding-left: 0;
            color: greyFont;
            border-bottom: 1px solid #ddd;
        }
        .title:before {
            content: '';
            height: .1rem;
            border-left: .1rem solid mainColor;
            margin-right: .2rem;
        }
        .part p {
            font-size: fontSize;
            padding: .1rem .2rem;
                line-height: 1.5;
        }
        .part .serviceName {
            font-weight: bold;
        }
        .divide {
            height: 10px;
            background-color: #F2F2F2;
        }
    }
</style>

<template>
<div class="app" style="overflow-x:hidden;background-color:#F2F2F2;height:100vh;">

    <div class="header">
        <mt-header title="居住地址">
            <a slot="left" @click='$router.go(-1)'>
                <mt-button icon="back"></mt-button>
            </a>
            <a slot="right">
                <mt-button class="smallbtn" @click='saveAddress'>保存</mt-button>
            </a>
        </mt-header>
    </div>

    <div class="body">
        <div class="container" v-show='!showszArea'>
            <div ref='selectCity' class="selectCity">选择省市</div>
            <i class="arrow-right"></i>
            <div ref='selectStreet' class="selectCity" @click='selectStreet' v-show='!selectedVal'>选择街道</div>
            <div ref='selectStreet' class="selectCity" @click='selectStreet' v-show='selectedVal'>{{selectedVal.split('_')[1]}}</div>
            <i class="arrow-right2"></i>
            <mt-field placeholder="请输入详细地址" type="textarea" rows="4" v-model="howntown" class="resize"></mt-field>
        </div>
    </div>

    <div class="szArea" v-show='showszArea'>
        <mt-cell :id='item.key+"_"+item.text' @click.native='selectedStreet' v-for='item in userSelectedStreet' :value='item.text'></mt-cell>
    </div>
</div>
</template>

<script>
import {
    zbl_cityPickerIndex
} from '../../assets/js/zbl_cityPickerIndex.js'
import {
    MessageBox,
    Toast
} from 'mint-ui'
import {
    areaAjax
} from '../../api/api'
import {
    mapState,
    mapActions
} from 'vuex'
import provinceCityArea from '../common/provinceCityArea.json'
export default {
    data: function() {
        return {
            howntown: '',
            cityCode: '',
            showszArea: false,
            selectedVal: '',
            userSelectedStreet: [],
            dictionaryArr: []
        }
    },
    computed: {},
    components: {},
    methods: {
        saveAddress() {
            if (this.$refs.selectCity.innerHTML && this.$refs.selectStreet.innerHTML && this.howntown) {
                let tempArr = this.$refs.selectCity.innerHTML.split(' ')
                let tempStr = tempArr[0] + '省' + tempArr[1] + '市' + tempArr[2]
                let street = this.$refs.selectStreet.innerHTML
                let address = tempStr + street + this.howntown
                let provinceCode = provinceCityArea.filter(item => {
                    return item.province === tempArr[0] + '省' && item.city === tempArr[1] + '市' && item.district === ""
                })
                let cityRegionCode = provinceCityArea.filter(item => {
                    return item.district === tempArr[2]
                })
                let obj = {}
                obj.parentCode = provinceCode[0].parent //省编码
                obj.cityCode = cityRegionCode[0].parent //市编码
                obj.regionCode = cityRegionCode[0].regionCode //区编码
                obj.addressDetail = this.howntown //用户输入的具体地址
                obj.decText = address //用户输入的完整地址
                obj.streetText = street //用户选中的街道
                obj.streetKeyCode = this.selectedVal.split('_')[0] //用户选中的街道编码

                // console.log(obj)
                this.zbl_selectAddress(obj)
                this.$router.push('/zbl_qyxq')
            } else {
                Toast({
                    message: '请输入完整地址！',
                    duration: 1000
                })
            }
        },
        selectedStreet(e) {
            this.selectedVal = e.currentTarget.id
            // console.log(e.currentTarget.id)
            this.showszArea = false
        },
        selectStreet() {
            if (this.$refs.selectCity.innerHTML === '选择省市') {
                Toast({
                    message: '请先选择省市区',
                    duration: 1000
                })
            } else {
                let tempArr = this.$refs.selectCity.innerHTML.split(' ')
                let cityRegionCode = provinceCityArea.filter(item => {
                    return item.district === tempArr[2]
                })
                let params = `parentKey=${cityRegionCode[0].regionCode}&sliceType=4`
                areaAjax(params).then(res => {
                    this.userSelectedStreet = res.items
                    let tempObj = {}
                    tempObj.regionCode = cityRegionCode[0].regionCode
                    tempObj.body = res.items
                    let arrLength = this.dictionaryArr.filter(item => {
                        return item.regionCode === cityRegionCode[0].regionCode
                    }).length
                    if(arrLength == 0) {
                        this.dictionaryArr.push(tempObj)
                        sessionStorage.setItem('regionDictionary',JSON.stringify(this.dictionaryArr))
                    }
                }).then(() => {
                    if (this.showszArea) {
                        this.showszArea = false
                    } else {
                        this.showszArea = true
                    }
                })
            }
        },
        ...mapActions(['zbl_selectAddress'])
    },
    mounted() {
        zbl_cityPickerIndex(this.$refs.selectCity)
    }
}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
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
        .selectCity {
            background-color: #fff;
            height: .8rem;
            font-size: fontSize;
            line-height: .8rem;
            padding-left: .2rem;
            border-bottom: 1px solid #ddd;
            padding: .2rem;
        }
        .arrow-right {
            position: absolute;
            border: 2.5px solid #c8c8cd;
            border-bottom: 0;
            border-left: 0;
            content: " ";
            top: 0.6rem;
            right: 20px;
            width: 5px;
            height: 5px;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
        .arrow-right2 {
            position: absolute;
            border: 2.5px solid #c8c8cd;
            border-bottom: 0;
            border-left: 0;
            content: " ";
            top: 1.85rem;
            right: 20px;
            width: 5px;
            height: 5px;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
        .resize {
            resize:none;
        }
    }
}
.szArea {
}
</style>

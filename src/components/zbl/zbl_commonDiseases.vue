<template>
<div class="zbl_commonDiseases" style="overflow-x:hidden;background-color:#fff;height:100vh;">
    <div class="header">
        <mt-header title="常见疾病">
            <a slot="left" @click='$router.push("/zy_personal_doctor")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <i class="icon-search" @click='search'></i>
    </div>
    <div class="body">
        <div class="typeDivide cbafter">
            <p class="bottomLine fl" @click='selectedType'>科室分类</p>
            <p class="flag fl" @click='selectedType'>人群分类</p>
        </div>
        <div class="container cbafter">
            <div class="leftPart">
                <ul>
                    <li v-for='item in commonDiseases' @click='commonDiseasesOn($event,item.diseases)' class="commonDiseases">
                        <div class="line"></div>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="rightPart">
                <ul>
                    <li v-for='childItem in itemDiseases' @click='selectItemDiseases(childItem)' class="itemDiseases">
                        <span>{{childItem.hotDisName}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    commonAjax,
    commonAjaxKy
} from '../../api/api.js'
import { Indicator } from 'mint-ui'
export default {
    data: function() {
        return {
            commonDiseases: [],
            deptCommonDisease: [],
            crowdCommonDisease: [],
            itemDiseases: [],
        }
    },
    computed: {},
    components: {},
    methods: {
        search() {
            this.$router.push('/zbl_diseaseSearch')
        },
        selectedType(e) {
            if (e.currentTarget.classList.contains('flag')) {
                this.commonDiseases = this.crowdCommonDisease
            } else {
                this.commonDiseases = this.deptCommonDisease
            }
            let pEles = document.querySelectorAll('.typeDivide > .fl')
            this.selectedItemCommonFunc(pEles, e.currentTarget, 'bottomLine')
        },
        commonDiseasesOn(e, diseases) {
            this.itemDiseases = diseases
            let commonDiseasess = document.querySelectorAll('.commonDiseases')
            this.selectedItemCommonFunc(commonDiseasess, e.currentTarget, 'commonDiseasesOn')
        },
        selectedItemCommonFunc(elements, targetEle, addedClassName) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove(addedClassName)
            }
            targetEle.classList.add(addedClassName)
        },
        selectItemDiseases(item) {
            sessionStorage.setItem('diseaseTitle', item.hotDisName)
            this.$router.push('/zy_diseaseName')
        },
    },
    created() {},
    mounted() {
        Indicator.open('加载中...')
        commonAjaxKy(JSON.stringify([]), 'hcn.diseaseLibrary', 'queryDeptCommonDisease')
            .then(res => {
                Indicator.close()
                if (res.code === 200) {
                    // console.log(res.body)
                    this.commonDiseases = this.deptCommonDisease = res.body
                    this.itemDiseases = this.commonDiseases[0].diseases //默认选中部分
                    this.$nextTick(() => {
                        document.querySelector('.commonDiseases').classList.add('commonDiseasesOn')
                    })
                }
            })
        commonAjaxKy(JSON.stringify([]), 'hcn.diseaseLibrary', 'queryCrowdCommonDisease')
            .then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    this.crowdCommonDisease = res.body
                }
            })
    },
}
</script>
<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 1101;
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
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    z-index: 1100;
    .typeDivide {
        position: fixed;
        background-color: #fff;
        width: 100%;
        height: 42px;
        line-height: 40px;
        font-size: fontSize;
        p {
            display: inline-block;
            width: 50%;
            text-align: center;
        }
        .bottomLine {
            border-bottom: 2px solid green;
        }
    }
    .container {
        margin-top: 42px;
        .leftPart {
            width: 35%;
            background-color: #F2F2F2;
            float: left;
            .commonDiseases {
                padding: .3rem;
                font-size: .35rem;
                text-align: center;
            }
            .commonDiseasesOn {
                position: relative;
                background-color: #fff;
                .line {
                    position: absolute;
                    left: 0;
                    top: 8px;
                    width: 5px;
                    height: 30px;
                    background-color: green;

                }
            }
        }
        .rightPart {
            width: 60%;
            float: left;
            .itemDiseases {
                padding: .3rem;
                font-size: .35rem;
                text-align: left;
                margin-left: .2rem;
            }
        }
    }
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

  font-size: .45rem;
  color: #fff;
  position: absolute;
  top: 27%;
  right: 15px;
}

.icon-search:before {
  content: "\e986";
}
</style>

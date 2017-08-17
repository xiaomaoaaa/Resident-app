<template>
<div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
    <div class="header">
        <div class="headerSearch">
            <button data-v-1ec0cec4="" class="mint-button fl mint-button--default mint-button--normal" @click="$router.go(-1)">
                    <span class="mint-button-icon">
                        <i class="mintui mintui-back"></i>
                    </span>
                </button>
            <div data-v-1ec0cec4="" class="mint-search">
                <div class="mint-searchbar">
                    <div class="mint-searchbar-inner">
                        <i class="mintui mintui-search"></i>
                        <input type="search" @keyup.13="startSearch" placeholder="搜索疾病" class="mint-searchbar-core" autofocus v-model="searchContent">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="session">
        <div class="resultList">
            <ul v-if="searchResult" ref="noResult" class="hasResult">
                <li v-for="(item, index) in searchResult" @click='nextRouter(index)'>
                    <span>{{item.content}}<em>&nbsp;&nbsp;{{item.departmentName}}</em></span>
                    <p>{{item.hospitalName}}</p>
                </li>
            </ul>
            <div v-else class="noResult" ref="noResult">
                <img src="../../assets/img/zy_noResult.png"><span>未搜索到相关结果</span>
            </div>
        </div>
        <ul class="searchHistory" ref="historyList">
            <li v-for="(item,index) in historyList" @click="addSearch(item)">{{item}}</li>
            <p v-if="historyList.length>0" class="clearHistory" @click="clearHistory">清空历史记录</p>
        </ul>
        <div id="more" class="more" @click="showMore()">查看更多</div>
    </div>
</div>
</template>
<script>
import md5 from 'md5'
import {
    Search,
    Cell,
    Toast
} from 'mint-ui'
import {
    commonAjax,
    requestLoginon,
    areaAjax,
    dicAjax,
    commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {
            searchContent: '',
            searchResult: [],
            pageNo: 1,
            maxDisplay: 50,
            historyList: [],
            historyCon: '',
            bizType: []
        }
    },
    methods: {
        startSearch() {
            this.pageNo = 1
            this.historyList.unshift(this.searchContent)
            this.$refs.noResult.style.display = "block"
            this.$refs.historyList.style.display = "none"
            let params = [this.searchContent, this.pageNo, this.maxDisplay]
            commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'searchSpecialitys').then(res => {
                if (res.code === 200) {
                    this.searchResult = res.body
                    res.body.forEach(item => {
                        this.bizType.push(item.bizType)
                    })
                    if (this.searchResult.length >= 50) {
                        document.getElementById('more').style.display = 'block'
                    } else if (this.searchResult.length === 0) {
                        Toast({
                            message: '搜索不到该结果',
                            duration: 1500
                        })
                    }
                    // console.log(this.searchResult)
                }
            })
        },
        nextRouter(index) {
            // console.log(this.bizType)
            if (this.bizType[index] == "01") {
                this.$router.push('/zy_doctorPage?' + this.searchResult[index].doctorId)
            } else if (this.bizType[index] == "02") {
                this.$router.push('/#')
            } else if (this.bizType[index] == "04") {
                this.$router.push('/#')
            }
        },
        addSearch(content) {
            this.searchContent = content
            this.startSearch()
        },
        showMore() {
            this.pageNo++
                let params = [this.searchContent, this.pageNo, this.maxDisplay]
            commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'searchSpecialitys').then(res => {
                if (res.code === 200) {
                    this.searchResult = this.searchResult.concat(res.body)
                    // console.log(res.body)
                    if (res.body.length < 15) {
                        document.getElementById('more').style.display = 'none'
                    }
                }
            })
        },
        clearHistory() {
            this.$refs.historyList.style.display = "none"
        }
    },
    watch: {
        searchContent: function(val, oldVal) {
            if (this.historyList.length > 3) {
                this.historyList.pop();
            }
            if (val == '') {
                this.$refs.noResult.style.display = "none"
                document.getElementById('more').style.display = 'none'
                this.$refs.historyList.style.display = "block"
            }
        }
    }
}
</script>
<style lang='stylus' scoped>
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
}
.header{
    .headerSearch {
        height: 1rem;
        font-size: .4rem;
        background-color: #35B46F;
        padding: .3rem .2rem;
        box-sizing: border-box;
        .mint-search{
            height: .5rem;
            margin-left: .7rem;
            .mint-searchbar{
                height: 100%;
                padding: 0;
                background: #35B46F;
                .mintui{font-size: .3rem;}
                input{
                    padding: .1rem;
                    font-size: .25rem;
                }
            }
        }
        .mint-button{
            height: 100%;
            background: #35B46F;
            color: #fff;
            box-shadow: none;
        }
    }
}
.session {
    margin-top: 1rem;
    .noResult{
        font-size: .3rem;
        text-align: center;
        color: #A09E9A;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        img{
            width: 1rem;
            height: 1rem;
            display: block;
            margin-bottom: .2rem;
            margin-left: 0.5rem;
        }
    }
    .resultList{
        .hasResult{
            li{
                background: url('../../assets/img/zy_right.png') no-repeat right;
                padding: .2rem;
                border-bottom: 1px solid #CDCCCC;
                span{display: block;font-size: .25rem;color: #747474;}
                em{font-size: .28rem;}
                p{font-size: .28rem;margin-top: .1rem;color: #747474;}
            }
        }
    }
    .searchHistory{
        background: #fff;
        li{
            padding: .2rem;
            font-size: .28rem;
            border-bottom: 1px solid #CDCCCC;
        }
        p{
            color: #49B1E7;
            text-align: center;
            font-size: .2rem;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
}
.session .more{
    display: none;
    font-size: .2rem;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>

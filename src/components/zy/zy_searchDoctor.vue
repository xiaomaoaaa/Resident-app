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
                            <input type="search" v-model="searchContent" @keyup.13="startSearch" placeholder="搜索热门医生" class="mint-searchbar-core" autofocus>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import { Search,Cell,Toast } from 'mint-ui'
import {
    commonAjax,
    requestLoginon,
    areaAjax,dicAjax,commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {
            searchContent: '',
            pageNo: 1,
            maxData: 50
        }
    },
    methods: {
        startSearch(){
            let params = [this.searchContent,this.pageNo,this.maxData]
            commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'searchDoctors').then(res => {
            })
            Toast({
                message: '暂无该医生信息',
                position: 'middle',
                duration: 2000
            });
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
}
</style>

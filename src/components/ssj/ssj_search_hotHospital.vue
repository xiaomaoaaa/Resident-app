<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
            <div class="headerSearch">
                <button data-v-1ec0cec4="" class="mint-button fl mint-button--default mint-button--normal" @click="$router.go(-1)">
                    <span class="mint-button-icon">
                        <i class="mintui mintui-back"></i>
                    </span>
                </button>
                <div class="mint-search">
                    <div class="mint-searchbar">
                        <div class="mint-searchbar-inner">
                            <i class="mintui mintui-search"></i>
                            <input type="search" v-model="searchContent" @keyup.13="startSearch" placeholder="搜索热门医院" class="mint-searchbar-core" autofocus>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="session">
        	<a class="mint-cell" v-for="item in searchHotHospitalList" @click="$router.push({path: '/xie_mydoc', query: {orgId: item.orgId}})">
				<div class="mint-cell-left"></div>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">{{item.shortName}}<b class="hospital_level">{{hospitalLevel[item.level]}}</b></span>
						<span class="mint-cell-label address">{{item.address}}</span>
					</div>
					<div class="mint-cell-value">
						<span></span>
					</div>
				</div>
				<div class="mint-cell-right"></div>
			</a>
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
            maxData: 50,
            searchHotHospitalList:[],
            hospitalLevel: {"10":"一级","11":"一级甲等","12":"一级乙等","13":"一级丙等","20":"二级","21":"二级甲等","22":"二级乙等","23":"二级丙等","30":"三级","31":"三级特等","32":"三级甲等","33":"三级乙等","34":"三级丙等"}
        }
    },
    methods: {
        startSearch(){
            let params = [this.searchContent,this.pageNo,this.maxData]
            commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'searchHospitals').then(res => {
            	if (res.code === 200) {
                    if (res.body.length) {
                        this.searchHotHospitalList = res.body
                    } else {
                        this.searchHotHospitalList = []
                        Toast({
			                message: '暂无该医院信息',
			                position: 'middle',
			                duration: 1000
			            });
                    }
                }
            })
            
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
        background-color: #4eab52;
        padding: .3rem .2rem;
        box-sizing: border-box;
        .mint-search{
            height: .5rem;
            margin-left: .7rem;
            .mint-searchbar{
                height: 100%;
                padding: 0;
                background: #4eab52;
                .mintui{font-size: .3rem;}
                input{
                    padding: .1rem;
                    font-size: .25rem;
                }
            }
        }
        .mint-button{
            height: 100%;
            background: #4eab52;
            color: #fff;
            box-shadow: none;
        }
    }
}
.session {
    margin-top: 1rem;
}
.hospital_level{
	margin-left:10px;
	font-weight:normal;
	font-size:0.24rem;
	/*color:#f38816;*/
	/*color:#faa319;*/
	/*color:#fdad00;*/
	/*color:#fd9b00;*/
	color:#f39c0e;
}
.address{
	height:20px;
	line-height:20px;
	background:url('../../assets/img/ssj_position.png') no-repeat left center / auto 16px;
	/*background-size:auto 16px;*/
	padding-left:20px;
	margin-top:4px;
}
.mint-cell{
	min-height:54px;
}
</style>

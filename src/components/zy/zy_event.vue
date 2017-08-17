<template>
	<div class="app zy" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
		<div class="header">
			<mt-header fixed title="健康活动">
				<a @click='$router.go(-1)' slot="left">
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
			<mt-navbar fixed v-model="selected">
				<mt-tab-item v-for="(item,index) in tagList" :id="item.tagCode" @click="changeCode()">{{item.tagName}}</mt-tab-item>
			</mt-navbar>
		</div>
		<div class="session">
			<mt-tab-container v-model="selected">
			    <mt-tab-container-item id="0">
				    <ul class="list">
				    	<li class="li cbafter" v-for="(item, index) in list"  @click="send(item)" v-if="item.atype==1">
				    		<div class="li_left fl">
				    			<div class="li_left_top">
				    				{{item.title}}
				    			</div>
				    			<div class="li_left_bottom">
				    				<span>{{item.createUser}}</span>
				    				<span>阅读量<em>{{item.readCount}}</em></span>
				    				<span>{{item.createDt.split(' ')[0]}} </span>
				    			</div>
				    		</div>
				    		<div class="li_right fr">
				    			<img :src="imgurlm"/>
				    		</div>
				    	</li>
				    </ul>
			    </mt-tab-container-item>
			  	<mt-tab-container-item id="1">
			     	<ul class="list">
				    	<li class="li cbafter" v-for="(item, index) in list"  @click="send(item,index)" v-if="item.atype==1">
				    		<div class="li_left fl">
				    			<div class="li_left_top">
				    				{{item.title}}
				    			</div>
				    			<div class="li_left_bottom">
				    				<span>{{item.createUser}}</span>
				    				<span>阅读量<em>{{item.readCount}}</em></span>
				    				<span>{{item.createDt.split(' ')[0]}} </span>
				    			</div>
				    		</div>
				    		<div class="li_right fr">
				    			<img :src="imgurlm"/>
				    		</div>
				    	</li>
				    </ul>
			  	</mt-tab-container-item>
			  	<mt-tab-container-item id="2">
			     	<ul class="list">
				    	<li class="li cbafter" v-for="(item, index) in list"  @click="send(item,index)" v-if="item.atype==2">
				    		<div class="li_left fl">
				    			<div class="li_left_top">
				    				{{item.title}}
				    			</div>
				    			<div class="li_left_bottom">
				    				<span>{{item.createUser}}</span>
				    				<span>阅读量<em>{{item.readCount}}</em></span>
				    				<span>{{item.createDt.split(' ')[0]}} </span>
				    			</div>
				    		</div>
				    		<div class="li_right fr">
				    			<img :src="imgurlm"/>
				    		</div>
				    	</li>
				    </ul>
			  	</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
import {
    commonAjax, requestConfirmPassword,dicAjax,imgUrl
}
from '../../api/api'
import { Navbar,TabItem,Header,Indicator,Toast} from 'mint-ui';
export default {
    data: function() {
        return {
        	list: [],
        	tagList: [],
            selected: '0',
            imgurlm:'',
            imgUrlid: "http://122.224.131.235:9088/hcn-web/upload/",
            pageSize: '20',
            pageNo: '1',
            atype: 0
        }
    },
    //请求数据
    methods: {
        Passwordvalid() {
        		Indicator.open('加载中...');
                let params = [{"pageSize":this.pageSize,"atype":this.atype,"pageNo":this.pageNo}]
                commonAjax(params, 'pcn.pcnHealthActivitiesService', 'getPcnHealthActivitiesList').then(res => {
                    if (res.code == 200) {
                    	if(!res.body.list.length){
                    		return;
                    	}
	                  	this.list = res.body.list
                    	console.log(this.list)
	                  	this.tagList = res.body.taglist
	                  	for(var i=0;i<this.list.length;i++){
	                        //头像选择拼接
                            this.imgurlm=this.imgUrlid+this.list[i].img
                            this.list[i].tagCode
                        }
	                  	Indicator.close();
                    }
                })
            },
        //点击传ID
        send(item){
        	//点击到跳转到详情
			this.$store.dispatch('xie_common',{"id":item.id})
        	this.$router.push("/zy_event_detail")
        }
   },
   mounted() {
        this.Passwordvalid()
   }
}
</script>

<style scoped>
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
}
.header .mint-header {
    height: 1rem;
    font-size: .4rem;
    background-color: #35B46F;
}
.session {
    margin-top: 2rem;
}
.session .noResult{
    font-size: .3rem;
    text-align: center;
    color: #A09E9A;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.session .noResult img{
    width: 1rem;
    height: 1rem;
    display: block;
    margin-bottom: .2rem;
    margin-left: 0.5rem;
}
.zy .li_left_top{
	font-size: 0.28rem;
	line-height: 0.4rem;
}
.zy .li_left_bottom{
	display: flex;
	margin-top: .3rem;
	justify-content: space-between;
	color: #888;
	font-size: .1rem;
}
.zy .li_right{
	width: 20%;
	margin-right: 10px;
}
.zy .li_right img{
	width: 100%;
	height: 1.5rem;
}
.mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #35B46F;
    color: #35B46F;
}
.zy .mint-tab-item{
	display: flex;
	align-items: center;
	justify-content: center;
	color:#616161;
}
.zy .mint-navbar{
	margin-top: 1rem;
	height: 1rem;
}
.zy .mint-tab-container-wrap{
	margin-top: 2rem;
}
.zy .mint-navbar{
	border-bottom: 0.5px solid #ccc;
}
.zy .list{
	background: #fff;
}
.zy .list li{
	padding-top: .2rem;
}
.zy .list .li{border-bottom: 1px solid #ccc;}
.zy .li_left{
	width: 70%;
	font-size: 0.25rem;
	color: #000;
	padding: 0 0.2rem;
}

</style>

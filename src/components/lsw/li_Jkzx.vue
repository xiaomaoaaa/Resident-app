<!--居民咨询列表-->

<template>
	<div class="jkzx">
		<!--头部-->
		<mt-header fixed title="健康咨询">
		  <a @click='$router.go(-1)' slot="left">
		    <mt-button icon="back"></mt-button>
		</a>
		  <!--<mt-button slot="right">
		  	<img class="img1" src="../../assets/img/li_tinajia.png"/>
		  </mt-button>-->
		</mt-header>


		<mt-navbar fixed v-model="selected">
		  <mt-tab-item id="1">最新</mt-tab-item>
		  <mt-tab-item id="2">高血压</mt-tab-item>
		  <mt-tab-item id="3">糖尿病</mt-tab-item>
		  <mt-tab-item id="4">其他</mt-tab-item>
		</mt-navbar>

		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1" >
		    <ul class="list">
		    	<li class="li"  v-for="(item, index) in list"  @click="send(item)">
		    		<div class="li_left fl">
		    			<div class="li_left_top">
		    				{{item.title}}
		    			</div>
		    			<div class="li_left_bottom">
		    				<span>{{item.source}}</span>
		    				<span>阅读量<em>{{item.readCount}}</em></span>
		    				<span>{{time}} </span>
		    			</div>
		    		</div>
		    		<div class="li_right fl">
		    			<img :src="item.listpic"/>
		    		</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		     <ul class="list">
		    	<li class="li"  v-for="(item, index) in list"  @click="send(item)" v-if="item.category==1">
		    		<div class="li_left fl">
		    			<div class="li_left_top">
		    				{{item.title}}
		    			</div>
		    			<div class="li_left_bottom">
		    				<span>{{item.source}}</span>
		    				<span>阅读量<em>{{item.readCount}}</em></span>
		    				<span>{{time}}</span>
		    			</div>
		    			<!--<img class="portrait" src="../../assets/img/li_Resident.png"/>-->
		    		</div>
		    		<div class="li_right fl">
		    			<img :src="item.listpic"/>
		    		</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		     <ul class="list">
		    	<li class="li"  v-for="(item, index) in list"  @click="send(item)" v-if="item.category==2">
		    		<div class="li_left fl">
		    			<div class="li_left_top">
		    				{{item.title}}
		    			</div>
		    			<div class="li_left_bottom">
		    				<span>{{item.source}}</span>
		    				<span>阅读量<em>{{item.readCount}}</em></span>
		    				<span>{{time}}</span>
		    			</div>
		    		</div>
		    		<div class="li_right fl">
		    			<img :src="item.listpic"/>
		    		</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="4">
		     <ul class="list">
		    	<li class="li"  v-for="(item, index) in list"  @click="send(item)" v-if="item.category==3">
		    		<div class="li_left fl">
		    			<div class="li_left_top">
		    				{{item.title}}
		    			</div>
		    			<div class="li_left_bottom">
		    				<span>{{item.source}}</span>
		    				<span>阅读量<em>{{item.readCount}}</em></span>
		    				<span>{{time}}</span>
		    			</div>
		    		</div>
		    		<div class="li_right fl">
		    			<img :src="item.listpic"/>
		    		</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import {
    commonAjax, requestConfirmPassword,dicAjax,imgUrl
}
from '../../api/api';
import '../../assets/css/li_style.css'
import { Navbar,TabItem,Header,Indicator,Toast} from 'mint-ui';
var imgUrlid=require("../../assets/img/li_Resident.png")
export default {
    data: function() {
        return {
        	list: [],
            selected: '1',
            imgurlm:imgUrlid,
            time: '',
        }
    },
    //请求数据
    methods: {
        Passwordvalid() {
        		Indicator.open('加载中...');
                let params = []
                commonAjax(params, 'pcn.pcnHealthNewsService', 'getUpList').then(res => {
                    if (res.code == 200) {
                    	console.log(res)
                    	console.log(res.body.list)
	                  	this.list = res.body.list
	                 
	                  	 for(var i=0;i<res.body.list.length;i++){
	                  	 	//时间转换
	                  	 	this.time = res.body.list[i].created.split(" ")[0]
	                        //头像选择拼接
	                        if(res.body.list[i].listpic==0){
	                            res.body.list[i].listpic=this.imgurlm
	                        }else{
	                            res.body.list[i].listpic=imgUrl(res.body.list[i].listpic)
	                        }

                        }

	                  	Indicator.close();
                    }
                })

            },

        //点击传ID
        send(item){
        	//点击到跳转到详情
			this.$store.dispatch('xie_common',{"id":item.id})
        	this.$router.push("/jkzx_detail")
//      	let base = `http://122.224.131.235:9090/pcn-core/h5/views/resident/healthnews.html?`
//			let token = JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken;
//			location.href=`${base}id=${item.id}&token=${token}`
        },

        //没有数据提醒数据为空
//      Pressdown(){
//      	console.log(this.list.length)
//      	if(this.list.length == 0) {
//      		Toast({
//				  message: '没有数据',
//				  position: 'bottom',
//				  duration: 2000
//				});
//      	}
//      }
   },
   mounted() {
        this.Passwordvalid()

   },
   //年月日过滤
   filters: {
	   	data:function (input) {
	       var d = new Date(input);
	       var year = d.getFullYear();
	       var month = d.getMonth() + 1;
	       var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
	       var hour = d.getHours();
	       var minutes = d.getMinutes();
	       var seconds = d.getSeconds();
	       return  year+ '-' + month + '-' + day + ' ';
	   }
	},
}
</script>


<style scoped>
.jkzx .mint-header{
		height: 1rem;
		background-color: #35B46F;
		color: #26a2ff;
	}
.jkzx .mint-header-button{
	display: block;
	flex: 0;
}
.jkzx .mint-button{
		height: 1.5rem;
}
.jkzx .mintui-back{
		font-size: 0.37rem;
		background: #fff;
	}
.jkzx .mint-button-icon{
		color: #fff;
	}
.jkzx .mint-tab-container{
	margin-top: 2rem;
}
.jkzx .is-right{
	display: flex;
	 direction: rtl;
}
.jkzx .mint-navbar{
	margin-top: 1rem;
	height: 1rem;
	line-height: 1rem;
}

.jkzx .mint-tab-item-label{
	font-size: 0.28rem;
}
.jkzx .mint-tab-item{
	display: flex;
	align-items: center;
	justify-content: center;
}
.jkzx .mint-navbar{
	margin-top: 1rem;
	height: 1rem;
}
.jkzx .mint-tab-container-wrap{
	margin-top: 2rem;
}
.jkzx .mint-navbar{
	border-bottom: 0.5px solid #ccc;
	border-top: 0.5px solid #ccc;
}
.jkzx .mint-cell-left{
	margin-left: 0.5rem;
}
.jkzx .list{
	background: #fff;
}
.jkzx li{
	height: 2rem;
	width: 100%;
	border-bottom: 0.5px solid #ccc;
}
.jkzx .li_left{
	width: 65%;
	height: 100%;
	font-size: 0.25rem;
	height: 2rem;
	color: #000;
	padding: 0 0.2rem;
}
.jkzx .li_left_top{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 0.33rem;
	line-height: 0.4rem;
	height: 1rem;
}
.jkzx .li_left_bottom{
	display: flex;
	justify-content: space-between;
	height: 100%;
	color: #888;
	height: 1rem;
	line-height: 1rem;
}

.jkzx .li_right{
	width: 25%;
	margin: 0.1rem 0 0.1rem 0.1rem;
	display: flex;
	justify-content: flex-end;
}
.jkzx .li_right img{
	width: 1.8rem;
	height: 1.8rem;
}

</style>

<template>
	<div class="jkzx">
		

		<!--<div class="content">
			<dl>
				<dt><img :src="list.listpic"/></dt>
				<dd>
					<div class="title">
						{{list.title}}
					</div>
					<div class="source">
						<span>来源：<em>{{list.source}}</em></span>
						<span>{{time}}</span>
					</div>
				</dd>
			</dl>
		</div>

		<div class="body" v-html="datas">
			{{datas}}
		</div>-->
		
		<div id="frame_right" style="width: 100%; height: 11.3rem; margin-top: 1rem;margin-bottom: 1rem;" >
			<!--头部-->
				<mt-header fixed title="健康咨询">
				  <a @click='$router.go(-1)' slot="left">
				    <mt-button icon="back"></mt-button>
				</a>
				</mt-header>
			
			<iframe id="frame" :src="URL" style="width: 100%; height: 100%;">
				
				
			</iframe>
			
			<div class="footer">
				<!--点赞-->
				<div class="footer_left" @click="pressdown">
					<img src="../../assets/img/li_zan.png" v-show="hide"/>
					<img src="../../assets/img/li_zan1.png" v-show="!hide"/>
					<span>点赞(<em>{{list.praiseCount}}</em>)</span>
				</div>
				<!--收藏-->
				<div class="footer_right" @click="toggle">
					<img src="../../assets/img/li_sc.png" v-show="mark"/>
					<img src="../../assets/img/li_sc1.png" v-show="!mark"/>
					<span>收藏</span>
				</div>
			</div>
		</div>
		

		
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {
    commonAjax, requestConfirmPassword,dicAjax,imgUrl
}
from '../../api/api';
import '../../assets/css/li_style.css'
import { Navbar, TabItem, Toast, Header,Indicator} from 'mint-ui';
var imgUrlid=require("../../assets/img/li_Resident.png")
export default {
    data: function() {
        return {
        	list: '',
        	datas: '',
        	hide: true,
        	degree: '',
        	block: true,
        	time: '',
        	imgurlm:imgUrlid,
        	URL: '',
        	likes: '',
        	mark: '',
        }
    },
    methods: {
        Passwordvalid() {
        		Indicator.open('加载中...');
                let params = [this.xie_common.id]
				console.log(params);
                commonAjax(params, 'pcn.pcnHealthNewsService','editPcnHealthNews').then(res => {
                    if (res.code == 200) {
                    	//console.log(res)
                    	console.log(res.body)
	                  	this.list = res.body

	                        //头像选择拼接
	                        //console.log(res.body.listpic)
	                        if(res.body.listpic==0){
	                            res.body.listpic=this.imgurlm
	                        }else{
	                            res.body.listpic=imgUrl(res.body.listpic)
	                        }


	                  	this.datas = this.list.newsdesc
	                  	this.degree = this.list.praiseCount
	                  	this.time = this.list.issuanceTime.split(" ")[0]
	                  	Indicator.close();
                    }
                })

           },
        //收藏提交
        Collectionvalid() {
                let params = [{"id": this.xie_common.id,"action":"mark"}]
                commonAjax(params, 'pcn.pcnHealthNewsService','updateNewsAction').then(res => {
                    if (res.code == 200) {
                    	console.log(res)
//                  	if (res.body.remark ==1) {
//                  		this.block = true
//                  	}
//                  	if (res.body.remark ==0) {
//                  		this.block = false
//                  	}
                    }
                })

           },

        //点赞提交
        Fabulous() {
                let params = [{"id": this.xie_common.id,"action":"likes"}]
	                commonAjax(params, 'pcn.pcnHealthNewsService','updateNewsAction').then(res => {
	                    if (res.code == 200) {
	                    	console.log(res)
	                    }
	                })
                },

        //点击点赞
        pressdown(){
        	if(this.likes != true){
        		this.hide = false
        		this.likes = true;
        		this.list.praiseCount = this.degree + 1;
        		this.Fabulous()
        	}

        },
     
		//this.pressdown()
	
		//点击收藏
		toggle(){
//			console.log(111)
			this.mark = !this.mark;
			this.Collectionvalid();
		}
		
		//this.pressup()
   },
   mounted() {
   	http://122.224.131.235:9090/pcn-core/*.jsonRequest
   		console.log(this.xie_common.id)
        this.Passwordvalid()
        let params = [{"businessObjId": this.xie_common.id,"businessType":"news"}]
                commonAjax(params, 'pcn.pcnCmsActionService','detail').then(res => {
                    if (res.code == 200) {
                    	//console.log(res.body)
//                  	let likes = res.body.likes
//                  	let mark = res.body.mark

						//点击点赞
                    	if (res.body.likes) {
                    		this.hide = false
                    		this.likes = res.body.likes;
                    	}
                    	else {
                    		this.hide = true
                    		
                    	}
//                  	console.log(res.body.mark)
						//点击收藏
                    	if (res.body.mark) {
                    		this.block = false
                    		this.mark=res.body.mark;
                    	}
                    	else {
                    		this.block = true
                    	}
                    }
                })
        
        
        let base = `http://122.224.131.235:9090/pcn-core/h5/views/resident/healthnews.html?`
		let token = JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken;
		this.URL = `${base}id=${this.xie_common.id}&token=${token}`
		
		
		
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

	//接受存值
	computed:{
            ...mapState({
            	xie_common:state => state.xie_common,
            })
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
.jkzx .content dt{
	height: 4rem;
	width: 100%;
	background: #fff;
	display: flex;
}
.jkzx .content{
	margin-top: 1.2rem;
}
.jkzx .content dt img{
	flex: 1;
	height: 100%;
	padding: 0  0.2rem;
}
.jkzx .content dd{
	font-size: 0.28rem;
	color: #888;
	background: #fff;
	padding: 0  0.2rem;
	border-bottom: 1px solid #ccc;
}
.jkzx .content dd .title{
	height: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: #35B46F;
	font-size: 0.33rem;
}
.jkzx .content dd .source{
	height: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.28rem;
}
.jkzx .body{
	background: #fff !important;
	font-size: .28rem !important;
	padding: 0.5rem 0.2rem;
	margin-bottom: 1rem;
	line-height: 0.35rem !important;
}
.jkzx .body p{
	font-size: 0.28rem !important;
	line-height: 0.35rem;
	background: #fff !important;
}
.jkzx .body span{
	font-size: 2rem !important;
	line-height: 0.35rem;
	background: #fff !important;
}
.jkzx .footer{
	display: flex;
	align-items: center;
	padding: 0 1rem;
	height: 1rem;
	position: fixed;
	bottom: 0;
	background: #EBEBEB;
	width: 100%;
}
.jkzx .footer img{
	height: 0.5rem;
	width: 0.5rem;
}
.jkzx .footer .footer_left,.footer_right{
	display: flex;
	justify-content: center;
	align-items: center;
	color: #888;
	font-size: 0.33rem;
}
.jkzx .footer .footer_left{
	margin-right: 2.5rem;
}
</style>

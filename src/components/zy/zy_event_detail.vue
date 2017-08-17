<template>
	<div class="app zy">	
		<div id="frame_right" style="width: 100%; height: 11.3rem; margin-top: 1rem;margin-bottom: 1rem;" >
				<!--头部-->
			<div class="header">
				<mt-header fixed title="健康活动">
				    <a @click='$router.go(-1)' slot="left">
				    	<mt-button icon="back"></mt-button>
					</a>
				</mt-header>
			</div>
			<iframe id="frame" :src="URL" style="width: 100%; height: 100%;">
			</iframe>
			<div class="footer">
				<!--点赞-->
				<div class="footer_left" @click="pressdown">
					<img src="../../assets/img/zy_zan.png" v-show="hide"/>
					<img src="../../assets/img/zy_zan1.png" v-show="!hide"/>
					<span>点赞(<em>{{list.praiseCount}}</em>)</span>
				</div>
				<!--收藏-->
				<div class="footer_right" @click="toggle">
					<img src="../../assets/img/zy_sc.png" v-show="mark"/>
					<img src="../../assets/img/zy_sc1.png" v-show="!mark"/>
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
            commonAjax(params, 'pcn.pcnHealthActivitiesService','detailInfoForH5').then(res => {
                if (res.code == 200) {
                  	this.list = res.body
                  	this.datas = this.list.newsdesc
                  	this.degree = this.list.praiseCount
                  	Indicator.close();
                }
            })
       },
        //收藏提交
        Collectionvalid() {
            let params = [{"id": this.xie_common.id,"action":"mark"}]
             commonAjax(params, 'pcn.pcnHealthActivitiesService','updateNewsAction').then(res => {
                if (res.code == 200) {
                }
            })
       },
        //点赞提交
        Fabulous() {
            let params = [{"id":this.xie_common.id,"action":"likes"}]
            commonAjax(params, 'pcn.pcnHealthActivitiesService','updateNewsAction').then(res => {
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
		//点击收藏
		toggle(){
			this.mark = !this.mark;
			this.Collectionvalid();
		}
   },
   mounted() {
   		http://122.224.131.235:9090/pcn-core/*.jsonReque//
   		console.log(this.xie_common.id)
        this.Passwordvalid()
        let params = [{"businessType":"activity","businessObjId":this.xie_common.id}]
        commonAjax(params, 'pcn.pcnHealthActivitiesService','detailInfoForH5').then(res => {
            if (res.code == 200) {
				//点击点赞
            	if (res.body.likes) {
            		this.hide = false
            		this.likes = res.body.likes;
            	}
            	else {
            		this.hide = true
            	}
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
        let base = `http://122.224.131.235:9090/pcn-core/h5/views/resident/healthactivities.html?`
		let token = JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken;
		this.URL = `${base}id=${this.xie_common.id}&token=${token}`
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
.zy .mint-tab-container{
	margin-top: 2rem;
}
.zy .is-right{
	display: flex;
	 direction: rtl;
}
.zy .mint-navbar{
	margin-top: 1rem;
	height: 1rem;
	line-height: 1rem;
}

.zy .mint-tab-item-label{
	font-size: 0.28rem;
}
.zy .mint-tab-item{
	display: flex;
	align-items: center;
	justify-content: center;
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
	border-top: 0.5px solid #ccc;
}
.zy .mint-cell-left{
	margin-left: 0.5rem;
}
.zy .content dt{
	height: 4rem;
	width: 100%;
	background: #fff;
	display: flex;
}
.zy .content{
	margin-top: 1.2rem;
}
.zy .content dt img{
	flex: 1;
	height: 100%;
	padding: 0  0.2rem;
}
.zy .content dd{
	font-size: 0.28rem;
	color: #888;
	background: #fff;
	padding: 0  0.2rem;
	border-bottom: 1px solid #ccc;
}
.zy .content dd .title{
	height: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: #35B46F;
	font-size: 0.33rem;
}
.zy .content dd .source{
	height: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.28rem;
}
.zy .body{
	background: #fff !important;
	font-size: .28rem !important;
	padding: 0.5rem 0.2rem;
	margin-bottom: 1rem;
	line-height: 0.35rem !important;
}
.zy .body p{
	font-size: 0.28rem !important;
	line-height: 0.35rem;
	background: #fff !important;
}
.zy .body span{
	font-size: 2rem !important;
	line-height: 0.35rem;
	background: #fff !important;
}
.zy .footer{
	display: flex;
	align-items: center;
	padding: 0 1rem;
	height: 1rem;
	position: fixed;
	bottom: 0;
	background: #EBEBEB;
	width: 100%;
}
.zy .footer img{
	height: 0.5rem;
	width: 0.5rem;
}
.zy .footer .footer_left,.footer_right{
	display: flex;
	justify-content: center;
	align-items: center;
	color: #888;
	font-size: 0.33rem;
}
.zy .footer .footer_left{
	margin-right: 2.5rem;
}
</style>

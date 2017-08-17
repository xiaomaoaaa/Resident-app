<template>
	<div class="header_grop" style="background-color:#fff;">
		<!--搜索-->
		<div class="header_top">
			<div class="search_box">
				<div class="erweima">
					<img class="img_er" src="../../assets/img/erweima1.png">
						<router-link to="/zy_search" class="input_box">
						<img class="img_sear" src="../../assets/img/xie_search.png">
						<input type="text" placeholder="搜索医院、科室、医生、疾病">
						</router-link>
						<!-- <img src="../../assets/img/usericon.png" alt=""> -->
						<!-- <span style='font-size:0.1rem;float:right;margin-top:20px;color:#fff;' @click='$router.push("/mybaseinfo2")'>完善</span> -->
				</div>
			</div>
		</div>
		<!--轮播-->
		<div class="box_img">
			<mt-swipe :auto="3000" style="height:2.5rem" >
				  <mt-swipe-item><img src="../../assets/img/xie_banner.png" alt="" /></mt-swipe-item>
				  <mt-swipe-item><img src="../../assets/img/xie_banner.png" alt="" /></mt-swipe-item>
				  <mt-swipe-item><img src="../../assets/img/xie_banner.png" alt="" /></mt-swipe-item>
			</mt-swipe>
		</div>

		<!--mydoctor-->

		<div class="mydoctor">
			<!--<div class="mydoctor_left">-->
				<a class="mydoctor_left">
				<div class="jiayi left">
					<h1>家医签约</h1>
					<h3 class="hei">签约享受健康医疗服务</h3>
					<div>
						<span @click='signNow'>立即签约</span>
						<!-- <span v-else @click='$router.push("/mybaseinfo2")'>完善个人信息</span> -->
					</div>
				</div>
					<!--<router-link to="/qyxq_signed" class="mydoctor_right1">-->
						<a class="mydoctor_right1" @click = "ishomepage()">
							<img src="../../assets/img/xie_doctor.png" />
						</a>
					<!--</router-link>-->
				</a>
			<!--</div>-->
			</router-link>
			<div class="mydoctor_right" @click="toVisitRecord">

				<div class="jiayi_right left" >
					<h1>就医记录</h1>
					<span class="hei_right left">口袋里的档案夹</span>

				</div>
				<!--<router-link to="/" class="mydoctor_right1_right">-->
					<div class="mydoctor_right1_right">
						<img src="../../assets/img/xie_jyjl.png" />
					</div>
				<!--</router-link>-->

			</div>
		</div>

		<!--点击图标-->
		<div class="box_img1">
			<div class="box_top">
						<div class="box_1">
							<a @click='$router.push("/zy_personal_doctor")'>
							<dt>
								<dl>
									<dt>
										<img src="../../assets/img/xie_srys.png">
									</dt>
									<dd>私人医生</dd>
								</dl>
							</dt>
						</a>
						</div>
					<div class="box_2">
						<a @click='isgy_zjzf()'>
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_zjzf.png">
								</dt>
								<dd>诊间支付</dd>
							</dl>
						</dt>
					</a>
					</div>
					<div class="box_3">
						<router-link to="/Reportone">
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_bgcx.png">
								</dt>
								<dd>报告查询</dd>
							</dl>
						</dt>
						</router-link>
					</div>
				</div>
				<div class="box_bottom">
					<div class="box_4">
						<a href="http://115.236.19.147:14188/intelligenceserver/view/index ">
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_zzzc.png">
								</dt>
								<dd>症状自查</dd>
							</dl>
						</dt>
						</a>
					</div>
					<div class="box_5">
						<!--<router-link to="/">-->
							<a href="http://115.236.19.147:14188/ckbserver/view/index">
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_jkbk.png">
								</dt>
								<dd>健康百科</dd>
							</dl>
						</dt>
							</a>
						<!--</router-link>-->
					</div>
					<div class="box_6">
						<a @click='noOpen'>
							<dt>
								<dl>
									<dt>
										<img src="../../assets/img/xie_jkjc.png">
									</dt>
									<dd>健康监测</dd>
								</dl>
							</dt>
						</a>
					</div>
				</div>
		</div>

		<!--健康资讯-->
		<div class="jkzx">
			<div class="jkzx_top">
				<div class="span1">
					<img src="../../assets/img/xie_jkzx1.png">
					<span >健康资讯</span>
				</div>
				<!--<div class="span2">-->
					<router-link to="/jkzx" class="span2">
					<span>查看全部</span>
					<img src="../../assets/img/xie_search.png">
				<!--</div>-->
				</router-link>
			</div>

		  <mt-tab-container-item>
		    <ul class="list">
		    	<li class="li"  v-for="(item, index) in list"  @click="send(item)">
		    		<div class="li_left fl">
		    			<div class="li_left_top">
		    				<span>{{item.title}}</span>
		    			</div>
		    			<div class="li_left_bottom">
		    				<span>{{item.source}}</span>
		    				<span>阅读量<em>{{item.readCount}}</em></span>
		    				<span>{{item.created.split(" ")[0]}} </span>
		    			</div>
		    		</div>
		    		<div class="li_right fl">
		    			<img :src="imgReqUrl + item.listpic" style="border-radius:100%"/>
		    		</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		</div>

		<!--底部按钮-->
		<div class="flexbox">
				<router-link to="/xie_home" class="flex_left" >
						<div class="xie_img_box">
							<img src="../../assets/img/xie_shouye1.png">
						</div>
						<span>首页</span>
				</router-link>
				<router-link to="/xie_xiaoxi" class="flex_center">
						<div class="xie_img_box">
							<img src="../../assets/img/xie_mess.png" >
							<b v-show="con>0">{{con}}</b>
						</div>
						<span>消息</span>
				</router-link>
				<router-link to="/zy_service" class="flex_right">
						<div class="xie_img_box">
							<img src="../../assets/img/xie_fuwu.png" >
						</div>
						<span>服务</span>
				</router-link>
				<router-link to="/jia_person" class="flex_right1">
						<div class="xie_img_box">
							<img src="../../assets/img/xie_my.png" >
						</div>
						<span>我的</span>
				</router-link>
			</div>
			<!--<mt-tabbar class="xie_selected">
			  <mt-tab-item @click.native='$router.push("/xie_home")'>
			    <img slot="icon" src="../../assets/img/xie_shouye1.png">首 页

			  </mt-tab-item>
			  <mt-tab-item @click.native="$router.push('/xie_xiaoxi')">
			    <img slot="icon" src="../../assets/img/xie_my.png">
			    消 息
			  </mt-tab-item>
			  <mt-tab-item @click.native='$router.push("/zy_service")'>
			    <img slot="icon" src="../../assets/img/xie_my.png">
			    服 务
			  </mt-tab-item>
			  <mt-tab-item @click.native='$router.push("/jia_person")'>
			    <img slot="icon" src="../../assets/img/xie_my.png">
			    我 的
			  </mt-tab-item>
			</mt-tabbar>-->

	</div>
</template>

<script>var md5 = require("md5");
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { commonAjax } from '../../api/api'
import { commonAjaxKy } from '../../api/api'
import { GoMyhApp } from '../../assets/js/txb_lifesea.wx.jssdk.js'
import { mapState } from 'vuex'

export default {
	compoents: {

	},
	data() {
		return {
			list: [],
			serverUrl: 'fzx.lifesea.com:8099', //生命海赋值
			// openId:sessionStorage.getItem('userInfo').certificate.certificateNo,//患者信息唯一标识
			openId: '',
			appKey: '8jczFSmHiXKcZEjf', //生命海赋值
			cryptkey: '190ee8a2f6d44fc4', //生命海赋值
			xie_common: {},
			imgReqUrl: 'http://122.224.131.235:9088/hcn-web/upload/',
			flag: '',
			firstLogin: false,
			con: '',
		}
	},
	computed: {

	},
	methods: {
		//健康信息的推送
		getAppInfoByDevice() {
			let params = []
			commonAjaxKy(JSON.stringify(params), 'hcn.device', 'getAppInfoByDevice').then(res => {
				if(res.code == 200) {
					if(res.body.hasOwnProperty('user')) {
						this.firstLogin = false
					} else {
						this.firstLogin = true
					}
					this.openId = res.body.user.certificate.certificateNo
					this.$store.dispatch('xie_common', { "certificateNo": res.body.user.certificate.certificateNo, "userName": res.body.userName })
					sessionStorage.setItem('phoneNo', res.body.user.phoneNo)
					sessionStorage.setItem('userInfoDetail', JSON.stringify(res.body.user))
				}
			})
		},
		noOpen() {
			Toast({
				message: '暂未开通',
				duration: 1000
			})
		},
		getAllNotificationCount() {
			let params = []
			let me = this
			commonAjaxKy(JSON.stringify(params), 'hcn.notification', 'getAllNotificationCount').then(res => {
				if(res.code == 200) {
					//					this.$store.dispatch('xie_common',{"body":res.body})
					let count = 0
					res.body.forEach(item => {
						count += item.count
						me.con = count
					})
					console.log(me.con)
				}
			})
		},
		getUpList() {
			let params = []
			commonAjax(params, 'pcn.pcnHealthNewsService', 'getUpList').then(res => {
				if(res.code == 200) {
					this.list = res.body.list
				}
			})
		},
		querySignApplyInfo() {
			let params = ["hcn.shenzhen", JSON.parse(sessionStorage.getItem("userInfo")).body.userId]
			// console.log(params);
			commonAjax(JSON.stringify(params), 'pcn.residentSignService', 'querySignApplyInfo').then(res => {
				if(res.code == 200) {
					sessionStorage.setItem('common_signApplyInfo', JSON.stringify(res.body));
				}
			})
		},
		send(item) {
			//点击到跳转到已解约
			this.$store.dispatch('xie_common', { "id": item.id })
			this.$router.push("/jkzx_detail")
		},
		//      	跳转生命还就医记录
		toVisitRecord() {
			// alert("患者信息唯一标识" + this.openId);
			GoMyhApp({ "serverUrl": this.serverUrl, openId: this.openId, appKey: this.appKey, cryptkey: this.cryptkey });
		},
		//判断是否第一次登陆
		signNow() {
			if(this.firstLogin) {
				MessageBox({
					title: '提示',
					message: '请先完善个人信息'
				}).then(() => {
					this.$router.push("/mybaseinfo2")
				})
			} else {
				this.$router.push("/zbl_jmqy")
			}
		},
		ishomepage() {
			if(this.firstLogin) {
				MessageBox({
					title: '提示',
					message: '请先完善个人信息'
				}).then(() => {
					this.$router.push("/mybaseinfo2")
				})
			} else {
				this.$router.push("/qyxq_signed")
			}
		},
		isgy_zjzf() {
			if(this.firstLogin) {
				MessageBox({
					title: '提示',
					message: '请先完善个人信息'
				}).then(() => {
					this.$router.push("/mybaseinfo2")
				})
			} else {
				this.$router.push("/gy_zjzf")
			}
		}
	},

	created() {
		this.querySignApplyInfo()
		this.getAppInfoByDevice()
		this.getAllNotificationCount()
		this.getUpList()
	},

}</script>

<style scoped>
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	/*.header_grop{
		width: 100%;
		height: 100%;
	}*/
	.header_top{
		width: 100%;
		height: 1rem;
		 background: linear-gradient(to right, #2FB86D, #68CC70)
	}
	.erweima .img_er{
		height: .4rem;
		width: 0.4rem;
		margin-top: 0.3rem;
		margin-left: .3rem;
		float: left;

	}
	.input_box{
		height: .7rem;
		float: left;
		width: 6rem;
		margin-left: .3rem;
		margin-top: .15rem;
		border-radius: .1rem;
		background: #fff;
	}
	.img_sear{
		height: .4rem;
		width: 0.4rem;
		margin-top: 0.2rem;
		margin-left: .6rem;
		float: left;
	}
	.input_box input{
		width: 4rem;
		height: .6rem;
		line-height: .6rem;
		border: none;
		outline: none;
		float: left;
		padding-top: .1rem;
		font-size: .3rem;
	}

	.box_img img{
		height: 2.5rem;
		width: 100%;
		/*margin-bottom: .1rem;*/
	}
	.box_img{
	height: 2.5rem;
	}


	.mydoctor{
		margin-top: .2rem;
		display: flex;
		/*flex-direction: column;*/
		height: 2.5rem;
	}
	.mydoctor_left,.mydoctor_right{
		flex: 1 1 40%;
	}
	.mydoctor_left{
		background:#fdfcef;
		margin-right: .2rem;
		margin-left: .1rem;
	}
	.mydoctor_right{
		background: #F4FEFE;v
		margin-left: .1rem;
		margin-right: .1rem;
	}
	.jiayi{
		padding:.3rem .1rem
	}
	.jiayi_right{
		padding: .7rem .1rem;
	}
	.jiayi h1,.jiayi_right h1{
		color:#323232;
		font-size: .35rem;
		font-weight: 600;
	}
	.jiayi .hei,.hei_right{
		font-size: 0.2rem;
		margin-top: .2rem;
		color: #999;
	}
	/*.jiayi span{
		font-size:.25rem
	}*/
	.jiayi span{
		padding: .1rem .2rem;
		border: 1px solid #2FB86D;
		color: #2FB86D;
		font-size: .3rem;
		border-radius: .1rem;
	}
	.mydoctor_right1_right img{
		width: 1rem;
		height: 1rem;
		float: right;
		margin-top: .6rem;
		margin-right: .2rem;
	}
	.mydoctor_right1{
		position: relative;
	}
	.mydoctor_right1 img{
		width: 1rem;
		height: 1rem;
		position: absolute;
		top: .5rem;
		left: 0rem;
	}
	.box_top,.box_bottom,.box_bottom1{
	flex: 1 1 33%;
	display: flex;
}
.box_1,.box_2,.box_3,.box_4,.box_5,.box_6{
	flex: 1 1 33%;
}

.header_grop dt img{
	width: 1.2rem;
	height: 1.2rem;
	padding-top:0.3rem
}
dd{
	font-size: 0.3rem;
	color: #666;
	/*margin-bottom: .2rem;*/
	margin-top: .2rem;
}
dt{
	text-align: center;
}
.box_img1{
	margin-bottom: .3rem;
}
/*健康资讯*/
.jkzx{
	/*height: 5rem;*/
}

/*底部*/
.flexbox{
	border-top: 1px solid #ccc;
	height: 1rem;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	background: #fff;
}
.flex_left,.flex_center,.flex_right,.flex_right1{
	flex: 1 1 25%;
	display: flex;
	flex-direction:column;
}
.xie_img_box{
	height: 0.5rem;
}
.xie_img_box b{
	font-size: .3rem;
	width:.8rem;
	height:.4rem;
	line-height: .4rem;
	border-radius: 50%;
	line-height: .3rem;
	color: #FFFFff;
	background: red;
}
.flexbox img{
	width: 0.4rem;
	height: 0.4rem;
	float: left;
	padding-left: .75rem;
	margin-top: 0.1rem;
	justify-content: center;
	align-content: center;

}
.flexbox span{
	font-size: 0.3rem;
	text-align: center;
	height: 0.5rem;
	padding-top: 0.1rem;
}


.jkzx_top{
	height: .8rem;
	border-bottom: 1px solid #ccc;
	display: flex;
	 justify-content:space-between;
	 align-items: center;
}
.jkzx_top .span1{
	/*height: .8rem;*/
	font-size: .4rem;
	display: flex;
	align-items: center;
}
.jkzx_top .span2{
	/*height: .8rem;*/
	font-size: .3rem;
	display: flex;
	align-items: center;
}
.span1 img{
	width: .5rem;
	height: .5rem;
	/*padding-top: .2rem;*/
	margin: 0 .2rem 0 .2rem;
}

.span2 img{
	width: .5rem;
	height: .5rem;
/*	margin-top: .2rem;*/
}
 a:hover{color: #333333}
 a:link {color: #333333}
 a:visited{color: #333333}

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

.mint-tab-item-label{
	font-size: 0.28rem;
}
.mint-tab-item{
	display: flex;
	align-items: center;
	justify-content: center;
}
.mint-navbar{
	margin-top: 1rem;
	height: 1rem;
}
.mint-tab-container-wrap{
	margin-top: 2rem;
}
.mint-navbar{
	border-bottom: 0.5px solid #ccc;
	border-top: 0.5px solid #ccc;
}
.mint-cell-left{
	margin-left: 0.5rem;
}
.list{
	background: #fff;
}
li{
	height: 1.2rem;
	width: 100%;
	border-bottom: 0.5px solid #ccc;
}
.li_left{
	width: 65%;
	height: 100%;
	font-size: 0.25rem;
	height: 1.2rem;
	color: #000;
	padding: 0 0.2rem;
}
.li_left_top{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 0.28rem;
	height: .6rem;
	overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
    width: 20em;/*不允许出现半汉字截断*/
   color: #323232;
}
.li_left_top span{
	overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
    width: 5rem;/*不允许出现半汉字截断*/
}
.li_left_bottom{
	display: flex;
	justify-content: space-between;
	height: 100%;
	color: #999;
	height: .6rem;
	line-height: .6rem;
}

.li_right{
	width: 25%;
	margin: 0.1rem 0 0.1rem 0.1rem;
	display: flex;
	justify-content: flex-end;
}
.li_right img{
	width: 1rem;
	height: 1rem;
}
.mint-tab-container-item{
	margin-bottom: 1rem;
}

/*插件*/
/*.xie_selected{
	position:fixed;
}
.xie_selected img{
	width: .5rem;
	height:.5rem
}
.xie_selected .mint-tab-item{
	display: flex;
	flex-direction:column;
}
.xie_selected .mint-tab-item-icon,.xie_selected .mint-tab-item-label{
	flex: 1 1 50%;
}*/

</style>

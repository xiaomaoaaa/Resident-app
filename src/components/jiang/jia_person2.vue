<template>
<div class="person">
	<div class="header">
		<div class="avatar">
			<div class="avatar-box">
				<img ref ='avatarimage' :src="src" width="50" height="50">
			</div>
			<form  role="form" id="imgupload" v-on:submit.prevent>
	   			<input type="file" name="upload" id="avatar_load" @change="uploadimg" accept="image/*" />
			 </form>
			 <div class="name">{{name}}</div>
		</div>
		<div class="cert" @click="$router.push('/mybaseinfo')">
			
			<span class="txt">已认证<span class="icon-more"></span></span>
		</div>
		<div class="erweima" @click='showMa'></div>
	</div>
	<div class="serv">
		<div class="item">
			<span class="img"></span>
			<span class="text">卡管理</span>
		</div>
		<div class="item">
			<span class="img"></span>
			<span class="text" @click="$router.push('/zy_myfamily')">我的家庭</span>
		</div>
		<div class="item">
			<span class="img"></span>
			<span class="text">我的档案</span>
		</div>
		<div class="item">
			<span class="img"></span>
			<span class="text">已收藏</span>
		</div>
	</div>
	<div class="divide"></div>
	<div class="components">
		<router-link to='/jia_sign'>
			<mt-cell title='签约记录' is-link>
				 <img class="icon" slot="icon" src='../../assets/img/jia_sign.png' width="24" height="24">
			</mt-cell>
		</router-link>
		<router-link to='/jia_service'>
			<mt-cell title='服务记录' is-link>
				 <img class="icon" slot="icon" src='../../assets/img/jia_rate.png' width="24" height="24">
			</mt-cell>
		</router-link>
		<router-link to='/jia_health'>
			<mt-cell title='健康指标' is-link>
				 <img class="icon" slot="icon" src='../../assets/img/jia_jkzb.png' width="24" height="24">
			</mt-cell>
		</router-link>
		<div class="divide"></div>
		<router-link to='/jia_callback'>
			<mt-cell title='意见反馈' is-link>
				 <img class="icon" slot="icon" src='../../assets/img/jia_yj.png' width="24" height="24">
			</mt-cell>
		</router-link>
	</div>
	<transition name='slide'>
		<div class="ma-content" v-show="ma_show">
			<div class="ma-header">
				<div class="back" @click="hideMa">
					
				</div>
				<h1 class="title">我的二维码</h1>
			</div>
			<div class="desc">
				<h1 class="title">我的邀请码</h1>
				<div class="ma-num-box">
					<span class="left"></span>
					<div class="ma-num">
						{{inviteCode}}
					</div>
					<span class="right"></span>
				</div>
				<p class="text">我成功邀请了{{count}}人</p>
			</div>
			<div class="ma-img">
				<h1 class="my-ma">我的二维码</h1>
				<div class="ma-box" ref='maBox' id="erweima">
					<!-- <canvas id="erweima"></canvas> -->
					<img :src="srcErweima" width="100%" height="100%">
					<img class="avatar-img" id="avatarImg"width="60" height="60" :src="src">
				</div>
				<p class="text">直接扫描二维码邀请好友安装鹏云健康</p>
			</div>
		</div>
	</transition>
		<!--底部按钮-->
		<router-link to="/">
				<div class="out">
					<div class="button">退出</div>
				</div>
		</router-link>
</div>
</template>
<script>
import api from '../../api/index.js'
// import AraleQRCode from '../common/qrCode.js';
import { Cell,Button } from 'mint-ui'
export default{
	data(){
		return {
			src: require('../../assets/img/zbl_avatar.png'),
			srcErweima: require('../../assets/img/zbl_eiweima.png'),
			name: '',
			ma_show: false,
			count:'',
			inviteCode: '',
			mpiId:'',
			base: 'http://122.224.131.235:9088/hcn-web/appDownload.html?',
			myMpiId: ''
		}
	},
	methods:{
		uploadimg(){
			let imguploadform = document.getElementById('imgupload');
  			let load = document.getElementById('avatar_load');
  			let file = load.files[0],
  				reader = new FileReader(),
  				img = this.$refs.avatarimage;
  				// console.log(img);
  				// console.log(imguploadform);
  				// console.log(load)
  				// console.log(file)
  				http://122.224.131.235:9088/hcn-web//upload
  				reader.readAsDataURL(file);
	  			reader.onload = (e)=>{
	  				let result = reader.result;
	  				// console.log(result)
	  				if(result){
	  					img.src = result;
	  				}
	  			}

			let formData = new FormData(imguploadform);
			
			formData.append('url',load.files[0])
			console.log(formData)
			api.imguploadAjax(formData).then((res)=>{
				if(res.code===200){
					console.log('图片上传成功了')
				}
			})
		},
		getData(){
			let user =JSON.parse(sessionStorage.getItem('userInfo')).body;
			console.log(user.userAvatar)
			if(user.userAvatar != 0){
				this.src=api.imgview(user.userAvatar)
			}
			// console.log(this.src)
			this.name = user.userName;
		},
		getCount(){
			let params=[this.inviteCode];
			api.commonAjaxKy(JSON.stringify(params),'hcn.userService','getCountByRequestPCode')
				.then((res)=>{
					if(res.code==200){
						this.count = res.body;
					}
				})
		},
		getAppInfo(){
			let params = [];
			api.commonAjaxKy(JSON.stringify(params),'hcn.device','getAppInfoByDevice')
				.then((res)=>{
					if(res.code ==200){
						console.log(res.body);
						this.inviteCode = res.body.properties.inviteCode;
						this.mpiId = res.body.user.mpiId;
						this.myMpiId = res.body.user.mpiId;
						// console.log(this.inviteCode)
						this.getCount();
					}	
				})
		},
		// http://122.224.131.235:9088/hcn-web/appDownload.html?invitationcode
		hideMa(){
			// let target = event.currentTarget;
			// if(target.id == 'mask'){
				this.ma_show = false;
			// }
		},
		showMa(){
			this.ma_show = true;
		// 	console.log(11)
		// 	let erweima = document.getElementById('erweima');
		// 	let size = this.$refs.maBox.offsetWidth;
		// 	// let maxBox = this.$refs.maBox;
		// 	let qrcode = require('../common/qrCode.js');
		// 	let avatar = document.getElementById('avatarImg');
		// 	// console.log(maxBox);
		// let base=`${base}invitationcode=${this.inviteCode}&type=jmQRCode&qrVersion=1.0&mpiId=${this.myMpiId}`
		// 	let qrCode = new qrcode({
		// 		render: 'canvas',
		// 		correctLevel: 0,
		// 		text: base,
		// 		size: 300
		// 	})
		// 	erweima.insertBefore(qrCode, avatar);
			// this.srcErweima = new AraleQRCode({
			// 	render:,
			// 	text: ''
			// });
		}
	},
	created(){
		
	},
	mounted(){
		this.getData();
		this.getAppInfo();
	},
	components:{
		'mt-cell':Cell,
		'mt-button': Button
	}
}
</script>
<style lang="less">
.person{
	.header{
		width: 100%;
		padding-top: 35%;
		background:url('../../assets/img/jia_bg.png') no-repeat;
		background-size: cover;
		position: relative;
		.avatar{
			position: absolute;
			left:0.3rem;
			bottom: 0.3rem;
			width: 50px;
			.avatar-box{
				width: 40px;
				height: 40px;
				position: absolute;
				top:0;
				border-radius: 50%;
				overflow: hidden;
			}
			#avatar_load{
				opacity: 0;
				padding:0.5rem 0 0 0;
				width: 50px;
			}
			.name{
				font-size: 16px;
				color:#fff;
				position: absolute;
				right:-1rem;
				bottom: 15px;
			}
		}
		.cert{
			color:#fff;
			position: absolute;
			right: 0.2rem;
			bottom: 25px;
			.txt{
				font-size: 16px;
				padding-right: 0.2rem;
			}
			.icon-more{
				// margin:0.1rem 0 0 0.2rem;
				// padding-top: 0.1rem;
				position: relative;
				top:1px;
				left:0.2rem;
				display: inline-block;
				width: 0.14rem;
				height: 0.28rem;
				background: url('../../assets/img/jia_more.png') no-repeat;
				background-size: contain;
			}
		}
		.erweima{
			width: 20px;
			height: 20px;
			background: url('../../assets/img/zbl_erweima.png') no-repeat;
			background-size: cover;
			position: absolute;
			top:0.3rem;
			right:0.2rem;
		}
	}
	.serv{
		display: flex;
		padding-bottom: 0.3rem;
		.item{
			width: 25%;
			font-size: 0;
			
			.img{
				display: inline-block;
				width: 30px;
				height: 30px;
				background-repeat: no-repeat;
				background-size: cover;
				margin:0.5rem 0 0 0.65rem;
				// padding:0.2rem 0 0 0.2rem;
			}
			.text{
				margin-top: 0.3rem;
				display: inline-block;
				width: 100%;
				font-size: 16px;
				text-align: center;
			}
		}
		.item:nth-child(1){
			.img{
				background-image: url('../../assets/img/jia_ka.png');
			}
		}
		.item:nth-child(2){
			.img{
				background-image: url('../../assets/img/jia_fam.png');
			}
		}
		.item:nth-child(3){
			.img{
				background-image: url('../../assets/img/jia_da.png');
			}
		}
		.item:nth-child(4){
			.img{
				background-image: url('../../assets/img/jia_save.png');
			}
		}
		// .item:nth-child(2){
		// 	background-image: url('../../assets/img/jia_ka.png')
		// }
	}
	.divide{
		height: 0.2rem;
		background-color: #f0f0f0;
	}
	.components{
		.icon{
			padding-right: 0.2rem
		}
	}
	.slide-enter-active,.slide-leave-active{
		transition:all 0.3s;
	}
	.slide-leave-to,.slide-enter{
		transform:translateX(100%);
	}
	.ma-content{
		position: fixed;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f2f2f2;
		.ma-header{
			width: 100%;
			height:1.2rem;
			text-align: center;
			border-bottom: 1px solid #e0e0e0;
			background-color: #35b46f;
			.back{
				width: 0.27rem;
				height: 0.5rem;
				position: absolute;
				left:10px;
				top:14px;
				background-image: url('../../assets/img/jia_back.png');
				background-size: cover;
			}
			.title{
				font-size: 20px;
				line-height: 1.2rem;
				color:#fff;
				font-weight: 300;
			}
		}
		.desc{
			background-color: #fff;
			.title{
				font-size: 16px;
				text-align: center;
				color:#333;
				padding: 0.2rem 0;
			}
			.ma-num-box{
				position: relative;
				overflow: hidden;
				width: 31%;
				margin-left: 50%;
				transform:translateX(-50%);
				.ma-num{
					// width: 100%;
					font-size: 16px;
					color:#35b46f;
					border: 1px solid #35b46f;
					padding: 0.3rem 0;
					text-align: center;
				}
				span{
					display: inline-block;
					width: 16px;
					height: 16px;
					border: 1px solid #35b46f;
					border-radius: 50%;
					background-color: #fff;
				}
				.left{
					position: absolute;
					left:-8px;
					top:50%;
					transform:translateY(-50%);
					// z-index: 10000;
				}
				.right{
					position: absolute;
					right:-8px;
					top:50%;
					transform:translateY(-50%);
				}
			}	
			.text{
				font-size: 14px;
				color:#888;
				text-align: center;
				padding: 0.2rem 0;
			}
		}
		.ma-img{
			padding: 0.2rem 0 0 0;
			.my-ma{
				font-size: 16px;
				text-align: center;
				padding: 0.2rem 0;
			}
			.ma-box{
				position: relative;
				width: 70%;
				margin-left: 15%;
				.avatar-img{
					position: absolute;
					top:50%;
					left:50%;
					margin-left: -30px;
					margin-top: -30px;
				}
			}
			.text{
				font-size: 14px;
				color:#666;
				text-align: center;
				padding: 0.3rem 0;
			}
		}
	}
}
.out{
		width: 90%;
		height: 0.8rem;
		margin-top: 1.5rem;
		margin-left: 50%;
		transform: translateX(-50%);
		background-color: #ff4444;
		border-radius: 5px;
		text-align: center;
		.button{
			line-height: 0.8rem;
			font-size: 0.4rem;
			color: #d0f2f5;
		}
	}
</style>
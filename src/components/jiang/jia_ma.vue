<template>
<div class="ma">
	<div class="ma-content" >
		<div class="ma-header">
			<router-link to='/jia_setter'>
				<div class="back">
				</div>
			</router-link>
			<h1 class="title">我的二维码</h1>
		</div>
		<div class="desc">
			<h1 class="title">我的邀请码</h1>
			<div class="ma-num-box">
				<span class="left"></span>
				<div class="ma-num">
					{{jia_maLink[1]}}
				</div>
				<span class="right"></span>
			</div>
			<p class="text">我成功邀请了{{ jia_maLink[2] }}人</p>
		</div>
		<div class="ma-img">
			<h1 class="my-ma">我的二维码</h1>
			<div class="ma-box"  id="erweima1">
				<!-- <canvas id="erweima"></canvas> -->
				<!-- <img :src="srcErweima" width="100%" height="100%"> -->
				<img class="avatar-img" id="avatarImg1" width="60" height="60" :src="jia_maLink[3]">
			</div>
			<p class="text">直接扫描二维码邀请好友安装鹏云健康</p>
		</div>
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex' 
import AraleQRCode from '../common/qrCode.js';
export default{
	data(){
		return{
		}
	},
	methods:{
		getMa(){
			let maBox1 = document.getElementById('erweima1')
			let avatarImg1 = document.getElementById('avatarImg1')
			let size1 = window.screen.width*0.7;
			let qrnode1 = new AraleQRCode.AraleQRCode({
				render: 'canvas',
				correctLevel: 0,
				text: this.jia_maLink[0],
				size: size1
			})
			maBox1.insertBefore(qrnode1, avatarImg1)
		}
	},
	mounted(){
		this.getMa();
		console.log(this.jia_maLink[1])
	},
	computed:mapState({
		jia_maLink:state=>state.jia_maLink
	})
}
</script>
<style lang="less">
.ma{
	.header{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height:1.76rem;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		background-color: #35b46f;
		.back{
			width: 0.6rem;
			height: 0.6rem;
			position: absolute;
			left:0.3rem;
			top:0.4rem;
			background-image: url('../../assets/img/jia_back.png');
			background-size: cover;
		}
		.title{
			font-size: 22px;
			line-height: 1.5rem;
			color:#fff;
			font-weight: 300;
		}
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
</style>
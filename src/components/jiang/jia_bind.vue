<!-- 绑定新手机界面 -->
<template>
<div class="bind">
	<div class="header">
		<!-- <router-link to='/jia_phone'> -->
			<div class="back" @click="goBack">
			</div>
		<!-- </router-link> -->
		<h1 class="title">绑定手机</h1>
	</div>
	<div class="pad"></div>
	<div class="progress">
		<div class="pro">
			<dl class="item first">
				<dt class="cir"></dt>
				<dd class="des">验证方式</dd>
			</dl>
			<dl class="item second">
				<dt class="cir"></dt>
				<dd class="des">安全验证</dd>
			</dl>
			<dl class="item third">
				<dt class="cir">3</dt>
				<dd class="des">修改绑定</dd>
			</dl>
		</div>
	</div>
	<div class="content">
		<div class="item first">
			<span class="name">新手机号</span>
			<input type="text" v-model="phoneNumber" placeholder="请输入新手机号">
			<span class="yz-btn" v-show='!validateFlag' @click="validate">获取验证码</span>
			<span class="yz-btn" v-show='validateFlag'>已发送{{this.timeOut}}s</span>
		</div>
		<div class="item">
			<span class="name">验证码</span>
			<input type="text" v-model= 'validateNumber' placeholder="请输入验证码">
		</div>
	</div>
	<div class="yz" @click='bindPhoneNumber'>
		<div class="button">绑定</div>
	</div>
</div>
</template>
<script>
// import header from '../common/jia_back.vue'
import { MessageBox } from 'mint-ui'
import api from '../../api/index.js'
import {mapState} from 'vuex'
export default{
	data(){
		return {
			phoneNumber: '',
			timeOut: 60,
			validateFlag: false,
			validateNumber: ''
		}
	},
	methods:{
		validate(){
			let reg = /^1[34578]\d{9}$/;
			if(this.phoneNumber === ''){
				MessageBox.alert('电话号码不能为空')
			}else{
				if(!(reg.test(this.phoneNumber))){
					MessageBox.alert('请输入正确的电话号码')
				}else{
					this.validateFlag = !this.validateFlag;
					// this.timeOut=60;

					let params =["hcn.shenzhen","patient",this.phoneNumber,"register"]
					api.commonAjaxKy(JSON.stringify(params),'hcn.smsService','getIdentifyingCode')
						.then((res)=>{
							if(res.code === 900){
								this.timeOut = 0;
								MessageBox.alert('该号码已被占用');
							}else if(res.code === 200){
								// this.validateNumber = res.body
							}
							
						}).catch((err)=>{
							console.log('验证码出错了')
						})
					let that = this;
					let timer = setInterval(()=>{
						if(that.timeOut === 0){
							clearInterval(timer);
							that.validateFlag = !that.validateFlag;
							that.timeOut = 60;
						}
						that.timeOut--;
					}, 1000)
				}
			}
			
		},
		bindPhoneNumber(){
			let params = [this.phoneNumber,this.validateNumber];
			// api.commonAjax(params,'pcn.pcnSmsService','validateCode')
			// 	.then((res)=>{
					// console.log(11)
					// if(res.code === 200){
					// 	// console.log(22)
					// 	X-Service-Id: 
					// 	X-Service-Method: 
					  // let params2 = [`${this.oldPhoneNumber}`,`${this.phoneNumber}`];
					  api.commonAjaxKy(JSON.stringify(params),'hcn.device','changePhoneNo')
					  	  .then((res)=>{
					  	  	if(res.code === 200){
					  	  		this.$router.push({path:'jia_account'})
					  	  	}else{
					  	  		MessageBox.alert('绑定失败')
					  	  	}
					  	  })
					  	  .catch(err=>{
					  	  	MessageBox.alert('绑定失败')
					  	  })
						// this.$router.push({path:'jia_bind'})
					// }else{
					// 	MessageBox.alert('验证码输入错误')
					// }
				// })
				// .catch((err)=>{
				// 	console.log('出错了')
				// })
		},
		goBack(){
			this.$router.go(-1);
		}
	},
	computed:mapState({
		oldPhoneNumber: 'jia_phoneNumber'
	})
}
</script>
<style lang="less" scoped>
.bind{
	.header{
		position: fixed;
		top:0;
		left:0;
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
			top:16px;
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
	.pad{
		height: 1.4rem;
		background-color: transparent;
	}
	.progress{
		padding: 0.6rem 0 1.2rem 0;
		.pro{
			width: 90%;
			margin-left: 5%;
			border-top: 1px solid #d6d6d6;
			position: relative;
			.item{
				width: 60px;
				position: absolute;
				top:-0.2rem;
				.cir{
					display: block;
					width: 0.4rem;
					height: 0.4rem;
					border-radius: 50%;
					font-size: 12px;
					line-height: 0.4rem;
					text-align: center;
					margin-left: 20px;
				}
				.des{
					font-size: 14px;
					margin-top: 10px;
				}
			}
			.first{
				left:0.4rem;
				.cir{
					background-image: url('../../assets/img/jia_wo_choose.png');
					background-repeat: no-repeat;
					background-size: cover;
				}
				.des{
					color: #35b46f;
				}
			}
			.second{
				left: 50%;
				transform:translateX(-50%);
				.cir{
					background-image: url('../../assets/img/jia_wo_choose.png');
					background-repeat: no-repeat;
					background-size: cover;
				}
				.des{
					color: #35b46f;
				}
			}
			.third{
				right:0.4rem;
				.cir{
					background-color: #fcc648;
					color:#fff;
				}
				.des{
					color: #fcc648;
				}
			}
		}
	}
	.content{
		padding: 0 20px;
		background-color: #fff;
		.item{
			font-size: 16px;
			line-height: 1rem;
			.name{
				color:#5b5b5b;
				font-weight: 500;
			}
			input{
				margin-left: 0.3rem;
				outline-style: none;
				border-color: transparent;
				width: 40%;
				font-size: 16px;
				// color: #b3b3b3;
			}
			input::placeholder{
				color:#bdbdbd;
			}
			.yz-btn{
				display: inline-block;
				float:right;
				width: 2rem;
				line-height: 0.7rem;
				background-color: #fcc648;
				color:#fff;
				margin-top: 0.18rem;
				text-align: center;
				border-radius: 5px;
			}
		}
		.first{
			border-bottom: 1px solid #e7e7e7;
		}
	}
	.yz{
		width: 90%;
		height: 0.8rem;
		margin-top: 1.5rem;
		margin-left: 50%;
		transform: translateX(-50%);
		background-color: #35b46f;
		border-radius: 5px;
		text-align: center;
		.button{
			line-height: 0.8rem;
			font-size: 0.4rem;
			color: #d0f2f5;
		}
	}
}
</style>
<!-- 短信验证界面 -->
<template>
<div class="message">
	<div class="header">
		<router-link to='/jia_phone'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">修改手机</h1>
	</div>
	<div class="pad"></div>
	<div class="progress">
		<div class="pro">
			<dl class="item first">
				<dt class="cir"></dt>
				<dd class="des">验证方式</dd>
			</dl>
			<dl class="item second">
				<dt class="cir">2</dt>
				<dd class="des">安全验证</dd>
			</dl>
			<dl class="item third">
				<dt class="cir">3</dt>
				<dd class="des">修改绑定</dd>
			</dl>
		</div>
	</div>
	<div class="content" >
		<phone-validate></phone-validate>
		<div class="item">
			<span class="name">验证码</span>
			<input type="text" v-model='ValidateNumber' placeholder="请输入验证码">
		</div>
	</div>
	<div class="yz" @click="validateNumber">
		<div class="button">下一步</div>
	</div>
</div>
</template>
<script>
import phoneValidate from '../common/jia_PhoneValidate'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import api from '../../api/index'
export default{
	data(){
		return {
			timeOut: 60,
			validateFlag: false,
			ValidateNumber: ''
		}
	},
	methods:{
		validateNumber(){
			let params = [this.phoneNumber,this.ValidateNumber];
			// X-Service-Id: 
			// X-Service-Method: validateCode
			api.commonAjaxKy(JSON.stringify(params),'hcn.smsService','validateCode')
				.then((res)=>{
					// console.log(11)
					if(res.code === 200){
						// console.log(22)
						if(res.body){
							this.$router.push({path:'jia_bind'})
						}else{
							Toast({
								message: '验证失败'
							})
						}	
					}
				})
				.catch((err)=>{
					Toast({
						message: '验证失败'
					})
				})
			// this.$router.push('/jia_bind')
		}
	},
	computed:mapState({
		phoneNumber: state=>state.jia_phoneNumber,
		phoneValidateNumber: state=>staate.jia_PhoneValidateNumber
	}),
	components:{
		'phone-validate':phoneValidate
	}
}
</script>
<style lang="less" scoped>
.message{
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
					background-color: #fcc648;
					color:#fff;
				}
				.des{
					color: #fcc648;
				}
			}
			.third{
				right:0.4rem;
				.cir{
					background-color: #f2f2f2;
					color:#acacac;
				}
				.des{
					color:#acacac;
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
			border-top: 1px solid #e7e7e7;
			border-bottom: 1px solid #e7e7e7;
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
			}
			input::placeholder{
				color:#bdbdbd;
			}
			.yz-btn{
				display: inline-block;
				float:right;
				width: 2rem;
				line-height: 0.7rem;
				background-color: #6091ed;
				color:#f0f0f0;
				margin-top: 0.18rem;
				text-align: center;
				border-radius: 5px;
			}
		}
	}
	.yz{
		width: 90%;
		height: 0.8rem;
		margin-top: 1.5rem;
		margin-left: 50%;
		transform: translateX(-50%);
		text-align: center;
		.button{
			border-radius: 5px;
			line-height: 0.8rem;
			font-size: 0.4rem;
			color: #d0f2f5;
			background-color: #35b46f;
		}
	}
}
</style>
<!-- 身份证验证界面 -->
<template>
<div class="card">
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
	<div class="content">
		<div class="item first">
			<span class="name">手机号</span>
			<input type="text" v-model="oldPhoneNumber" placeholder="请输入手机号码">
		</div>
		<div class="item">
			<span class="name">身份证</span>
			<input type="text" v-model='cardNumber' placeholder="请输入身份证号码">
		</div>
	</div>
	<!-- <router-link to='/cardBind'> -->
		<div class="yz" @click='validate'>
			<div class="button">下一步</div>
		</div>
	<!-- </router-link> -->
</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { mapState } from 'vuex'
import api from '../../api/index'
export default{
	data(){
		return {
			cardNumber: '',
		}
	},
	computed:mapState({
			oldPhoneNumber: state=>state.jia_phoneNumber
	}),
	methods:{
		validate(){
			let reg1 = /^1[34578]\d{9}$/;
			let reg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			let params=[this.oldPhoneNumber,this.cardNumber]
			if(this.oldPhoneNumber === ''){
				MessageBox.alert('手机号码不能为空')
			}else{
				if(!(reg1.test(this.oldPhoneNumber))){
					MessageBox.alert('请输入正确的手机号码');	
				}else{
					if(this.cardNumber === ''){
						MessageBox.alert('身份证号码不能为空')
					}else{
						if(!(reg2.test(this.cardNumber))){
							MessageBox.alert('请输入正确的身份证号码');	
						}else{

							// this.$router.push({path:'jia_bind'})
							api.commonAjaxKy(JSON.stringify(params),'hcn.device','certificate')
								.then((res)=>{
									if(res.code === 200){
										if(!res.body){
											MessageBox.alert('验证失败')
										}else{
											this.$router.push({path:'jia_bind'})
										}
									}else{
										MessageBox.alert('验证失败')
									}
								})
								.catch((err)=>{
									
								})
						}
					}
				}
			}
		}
	}
}
</script>
<style lang="less" scoped>
.card{
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
					background-color: #fff;
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
			border-bottom: 1px solid #e7e7e7;
			// border-top:1px solid #e7e7e7;
			.name{
				color:#35b46f;
				font-weight: 500;
			}
			input{
				margin-left: 0.3rem;
				outline-style: none;
				border-color: transparent;
				width: 50%;
				font-size: 16px;
				// color: #bababa;
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
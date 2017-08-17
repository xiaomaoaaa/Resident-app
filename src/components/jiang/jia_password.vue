<template>
<div class="password">
	<div class="header">
		<router-link to='/jia_account'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">密码设置</h1>
	</div>
	<div class="pad"></div>
	<div class="content">
		<mt-field label="密码" placeholder="输入原密码" type="password" v-model="pass"></mt-field>
		<mt-field label="密码" placeholder="输入新密码" type="password" v-model="newPass"></mt-field>
	</div>
	<p class="tip">密码由6-20位数字、英文字母或符号组成</p>
	<div class="out" @click="submit">
		<div class="button">提交</div>
	</div>
</div>
</template>
<script>
import  { Field,Toast } from 'mint-ui';
import api from '../../api/index.js'
import md5 from 'md5'
export default{
	data(){
		return{
			pass: '',
			newPass: ''
		}
	},
	methods:{
		submit(){
			// {"originalPwd":"e10adc3949ba59abbe56e057f20f883e","newPwd":"c33367701511b4f6020ec61ded352059"}
			let params = {"originalPwd":md5(this.pass),"newPwd":md5(this.newPass)}
			api.requestChangepwd1(JSON.stringify(params))
				.then((res)=>{
					if(res.code === 200){
						Toast({
							message:'修改成功'
						});
						this.$router.push('/jia_account');
					}
				})
		}
	},
	components:{
		'mt-field':Field
	}
}
</script>
<style lang="less" scoped>
.password{
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
	.content{
		border-bottom: 1px solid #e0e0e0;
	}
	.tip{
		font-size: 14px;
		padding:0.2rem 0 0 0.2rem;
		line-height: 24px;
		color:#999;
	}
	.out{
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
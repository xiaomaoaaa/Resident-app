<template>
<div class="bind-phone">
	<div class="header">
		<router-link to='/jia_appeal'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">{{title}}</h1>
	</div>
	<div class="pad"></div>
	<div class="progress">
		<div class="pro">
			<dl class="item first">
				<dt class="cir"></dt>
				<dd class="des">资料验证</dd>
			</dl>
			<dl class="item second">
				<dt class="cir"></dt>
				<dd class="des">身份证照片</dd>
			</dl>
			<dl class="item third">
				<dt class="cir">3</dt>
				<dd class="des">手机号验证</dd>
			</dl>
		</div>
	</div>
	<div class="content">
		<div class="item first">
			<span class="name">新手机号</span>
			<span class="phone-number">{{contactNo}}</span>
			
		</div>
		<div class="item">
			<span class="name">验证码</span>
			<input type="text" ref="code" placeholder="请输入">
			<span class="yz-btn" v-show='!validateFlag' @click="validate">获取验证码</span>
			<span class="yz-btn" v-show='validateFlag'>已发送{{this.timeOut}}s</span>
		</div>
	</div>
	<div class="yz" @click='submit'>
		<div class="button">提交申诉</div>
	</div>
</div>
</template>

<script>
import { Field,Cell,MessageBox,Indicator } from 'mint-ui'
import api from '../../api/index.js'
import { mapState } from 'vuex'
export default{
	data(){
		return{
			validateFlag: false,
			timeOut:60,
			validateCode: '',
			complete: [],
			certificatePicture: [],
			contactNo:''
		}
	},
	components:{
		
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
					let params =["hcn.shenzhen","patient",this.contactNo,"zhongshan"]
					api.commonAjaxKy(JSON.stringify(params),'hcn.smsService','getIdentifyingCode')
						.then((res)=>{
							if(res.code == 200){
								this.validateCode = res.body;
							}else if(res.code == 603){
								MessageBox.alert('当前用户已注册')
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
		submit(){
			if(this.validateCode == this.$refs.code.value){
				Indicator.open()
				console.log(this.formDatas[0]);
				console.log(this.appealInfo);
				
				for(let i=0,len=this.formDatas.length;i<len;i++){
					api.imguploadAjax(this.formDatas[i]).then((res)=>{
						this.complete[i]=res.success;
						this.certificatePicture[i] = res.record.fileId;
						// this.certificatePicture.push(res.record.fileId)
					})
				}
				setTimeout(()=>{
						Indicator.close();
						if(this.complete[0]&&this.complete[1]&&this.complete[2]){
						let params =Object.assign(this.appealInfo,{"certificatePicture": this.certificatePicture.join(',')});
						let params2= [params];
						console.log(params2)
						api.commonAjaxKy(JSON.stringify(params2),'hcn.appealService','saveAppealInfo').then((res)=>{
							if(res.code==200){
								this.$router.push('/jia_success')
							}else if(res.code == 632){
								MessageBox.alert('您输入的证件与原登陆账号完善信息中的证件不一致')
							}else{
								MessageBox.alert('验证失败，请检查信息是否填写正确')
							}
						})
					}
				}, 1000)
			}
		}
	},
	computed:mapState({
		phoneNumber: state=>state.jia_phoneNumber,
		formDatas: state=>state.jia_formDatas,
		appealInfo: state=> state.jia_appealInfo,
		title: state=>state.jia_title
	}),
	mounted(){
		if(this.title =="账号申诉"){
			this.contactNo = this.appealInfo.newAccountNo;
			console.log(this.contactNo)
		}else if(this.title == "证件申诉"){
			this.contactNo = this.phoneNumber;
			console.log(this.contactNo)
		}

	},
}
</script>
<style lang="less" scoped>
.bind-phone{
	.header{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height:1.2rem;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		background-color: #35b46f;
		z-index: 1000;
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
		border-bottom: 1px solid #d6d6d6;
		.pro{
			width: 90%;
			margin-left: 5%;
			border-top: 1px solid #d6d6d6;
			position: relative;
			.item{
				width: 70px;
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
					margin-left: 30px;
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
					margin-left: 0.4rem;
				}
				.des{
					color: #fcc648;
				}
			}
			.second{
				left: 50%;
				transform:translateX(-50%);
				.cir{
					background-image: url('../../assets/img/jia_wo_choose.png');
					background-repeat: no-repeat;
					background-size: cover;
					margin-left: 30px;
				}
				.des{
					color:#fcc648;
				}
			}
			.third{
				right:0.4rem;
				.cir{
					background-color: #fcc648;
					color:#fff;
				}
				.des{
					color:#fcc648;
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
				margin-right: 0.3rem;
			}
			input{
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
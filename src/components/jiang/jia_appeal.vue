<template>
<div class="appeal">
	<div class="header">
		<router-link to='/jia_account'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">申诉设置<span class="his" @click="toHistory">历史申诉</span></h1>
	</div>
	<div class="pad"></div>
	<h2 class="tip">目前申诉的证件类型仅支持身份证</h2>
	<div class="content">
		<div class="item">
			<p class="alert" v-show="tips[0]">{{tips[0]}}</p>
			<div class="item-content">
				<div class="icon"><span class="shensu"></span></div>
				<div class="detail">
					<h1 class="name">账号申诉</h1>
					<p class="intro">适用情况:<br/>新的手机号已被自己注册，无法通过[账号设置]-[修改手机]的方式进行修改</p>
				</div>
			</div>
			<div class="btn" @click="toAccount" v-show="!tips[0]">账号申诉</div>
			<div class="btn disabled" v-show="tips[0]">账号申诉</div>
		</div>
		<p class="tip2">新手机号未注册情况下请在原手机号登陆后，进入[我的]-[设置]-[账号设置]-[手机绑定]修改</p>
		<div class="item">
			<p class="alert" v-show="tips[1]">{{tips[1]}}</p>
			<div class="item-content">
				<div class="icon"><span class="zhengjian"></span></div>
				<div class="detail">
					<h1 class="name"><span class="icon2"></span>证件申诉</h1>
					<p class="intro">适用情况:<br/>1.证件信息输入错误，无法修改<br/>2.证件信息提交时，提示已存在</p>
				</div>
			</div>
			<div class="btn" @click="toCard" v-show="!tips[1]">证件申诉</div>
			<div class="btn disabled" v-show="tips[1]">证件申诉</div>
		</div>
		<p class="tip3">证件号码申诉成功后不可再次申诉，请谨慎操作!</p>
		<h2 class="tip4">如对申诉操作存在疑问，可<span class="clock"@click='showAction'>咨询客服热线</span></h2>
	</div>
	<div class="mask" v-show="sheetVisible"></div>
	<transition name='silder'>
		<div class="tel" v-show="sheetVisible">
			<div class="tel-content">
				<span class="tip">服务热线</span>
				<a class="number" :href="'tel:'+number" v-for="number in serPhoneNumber">{{number}}</a>
			</div>
			<div class="cancle" @click="hideAction">取消</div>
		</div>
	</transition>
	<transition name="slide">
		<div class="history" v-show='showHistory'>
			<div class="header">
				<div class="back" @click="toNow"></div>
				<h1 class="title">历史申诉</h1>
			</div>
			<div class="pad"></div>
			<div class="content">
				<div class="shensu-item" @click="toDetail" v-for="shensu in hisShensu">
					<div class="icon1" v-show="shensu.appealType == 1">
						
					</div>
					<div class="icon2" v-show="shensu.appealType == 2">
						
					</div>
					<div class="detail">
						<p class="text">{{shensu.appealTypeText}}</p>
						<p class="time">{{shensu.appealTime}}</p>
					</div>
					<div class="status fr">{{shensu.appealStatusText}}</div>
				</div>	
			</div>
		</div>
	</transition>
</div>
	
</template>
<script>
import { mapState } from 'vuex'
import api from '../../api/index.js'
import { Toast } from 'mint-ui'
export default{
	data(){
		return {
			sheetVisible: false,
			showHistory: false,
			tips: ['',''],
			hisShensu: [],
		}
	},
	methods:{
		toHistory(){
			this.getHistory();
			this.showHistory = true;
		},
		showAction(){
			this.sheetVisible = true;
		},
		hideAction(){
			this.sheetVisible = false;
		},
		toAccount(){
			// console.log(11)
			this.$router.push('/jia_accountShensu');
		},
		toCard(){
			this.$router.push('/jia_cardShensu')
		},
		toNow(){
			this.showHistory = false;
		},
		checkAppeal(){
			let params = [];
			api.commonAjaxKy(JSON.stringify(params),'hcn.appealService','checkAppealInfo')
				.then((res)=>{
					if(res.code == 200){
						console.log(11)
						console.log(res.body);
						res.body.forEach((item)=>{
							if(item.appealType == '02'){
								this.tips.splice(1,1,item.tip)
							}else{
								this.tips.splice(0, 1, item.tip)
							}
						})
						// console.log(this.tips)
					}
				})
		},
		toDetail(){
			// Toast({
			// 	'message':'暂未开发'
			// })
		},
		getHistory(){
			let params = []
			api.commonAjaxKy( JSON.stringify(params),'hcn.appealService','queryHistoryUserAppeal').then(res=>{
				if(res.code == 200){
					this.hisShensu = res.body;
					console.log(this.hisShensu)
				}
			})
		}
	},
	components:{
		
	},
	computed:mapState({
		serPhoneNumber(state){
			let number = state.jia_serPhoneNumber;
			let arr = [];
			if(number.indexOf(',')){
				arr = number.split(',');
			}else{
				arr.push(number)
			}
			return arr;
		}
	}),
	mounted(){
		this.checkAppeal();
	}
}
</script>
<style lang="less" scoped>
.appeal{
	width: 100%;
	background: #fafafa;
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
			text-align: center;
			padding-left: 1.7rem;
			.his{
				font-size: 18px;
				padding-right: 10px;
				float:right;
			}
		}
		
	}
	.pad{
		height: 1.25rem;
		background-color: transparent;
	}
	.tip{
		font-size: 14px;
		text-align: center;
		background-color: #fffad0;
		color:#ffce51;
		line-height: 30px;
	}
	.content{
		font-size: 0;
		.item{
			width: 90%;
			margin-left: 5%;
			background-color: #fff;
			margin-top: 0.3rem;
			padding: 0.2rem 0;
			.alert{
				font-size: 18px;
				background-color: red;
				text-align: center;
				color:#fff;
				padding: 0.2rem 0;
				margin-bottom: 0.2rem;
				border-radius: 0.15rem 0.15rem 0 0;
			}
			.item-content{
				display: flex;
				.icon{
					flex:0 0 1rem;
					text-align: center;
					.shensu{
						display: inline-block;
						width: 0.5rem;
						height: 0.5rem;
						background: url('../../assets/img/li_shensu.png');
						background-size: contain;
					}
					.zhengjian{
						display: inline-block;
						width: 0.5rem;
						height: 0.5rem;
						background: url('../../assets/img/li_zhengjian.png');
						background-size: contain;
					}
				}
				.detail{
					.name{
						font-size: 20px;
						color: #35b46f;
						line-height: 0.5rem;
						padding-bottom: 0.2rem;
					}
					.intro{
						font-size: 16px;
						line-height: 28px;
					}
					
				}
			}
			.btn{
				display: inline-block;
				padding: 0.2rem 0.5rem;
				font-size: 16px;
				color:#fff;
				border-radius: 10px;
				background-color: #f1c50e;
				font-weight:100;
				margin-top:0.3rem;
				margin-left: 50%;
				transform:translateX(-50%);
			}
			.disabled{
				background-color: #aaa;
			}
		}
		.tip2{
			font-size: 14px;
			color:#b0b0b0;
			padding: 0 5%;
			line-height: 24px;
			padding-top: 0.2rem;
		}

		.tip3{
			padding: 0.1rem 5%;
			font-size: 14px;
			color:#ffce51;
			line-height: 28px;
		}
		.tip4{
			margin-top: 0.3rem;
			text-align: center;
			color:#a1a1a1;
			.clock{
				display: inline-block;
				color:red;
				// font-size: 
			}
		}
	}
	.mask{
		position: fixed;
		top:0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: rgba(0,0,0,0.7);
		// z-index: 1000;
	}
	.slider-enter-active,.slider-leave-active{
		transition:all 0.5s;
	}
	.slider-enter.slider-leave-to{
		transform:translateY(100%);
	}
	.tel{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		.tel-content{
			width: 95%;
			margin-left: 2.5%;
			background-color: #fff;
			font-size: 0;
			border-radius: 0.2rem;
			.tip{
				width: 100%;
				display: block;
				color:#666;
				font-size: 14px;
				line-height: 0.8rem;
				background-color: #fff;
				border-bottom: 1px solid #666;
				border-radius: 0.2rem 0.2rem 0 0;
			}
			.number{
				width: 100%;
				display: block;
				color:#3879d9;
				background-color: #fff;
				font-size: 18px;
				line-height: 0.8rem;
				text-align: center;
				border-radius: 0 0 0.2rem 0.2rem;
			}
		}
		.cancle{
			background-color: #fff;
			width: 95%;
			margin: 0.2rem 2.5%;
			border-radius: 0.2rem;
			text-align: center;
			line-height: 0.8rem;
			font-size: 18px;
			color:#3879d9;
		}
	}
	
	.slide-enter-active,.slide-leave-active{
		transition:all 0.3s;
		}
	.slide-leave-to,.slide-enter{
		transform:translateX(100%);
	}
	.history{
		position: fixed;
		top:0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #fff;
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
				text-align: center;
				padding-right: 1.3rem;
				.his{
					font-size: 18px;
					padding-right: 10px;
					float:right;
				}
			}
			
		}
		.pad{
			height: 1.25rem;
			background-color: transparent;
		}
		.content{
			padding: 0.2rem;
			.shensu-item{
				display: flex;
				font-size: 18px;
				padding: 0.2rem 0;
				border-bottom:1px solid #ccc;
				.icon1{
					flex:0 0 1rem;
					width: 1rem;
					height: 1rem;
					background: url('../../assets/img/li_shensu.png') no-repeat;
					background-size: contain;
				}
				.icon2{
					flex:0 0 1rem;
					width: 1rem;
					height: 1rem;
					background: url('../../assets/img/li_zhengjian.png') no-repeat;
					background-size: cover;
				}
				.detail{
					flex:1;
					padding-left: 0.2rem;
					line-height: 0.5rem;
					.time{
						font-size: 16px;
						color:#777;
					}
				}
				.status{
					flex:0 0 1.2rem;
					padding-top: 0.25rem;
					color:#ffce51;
				}
			}
		}
	}
}

</style>
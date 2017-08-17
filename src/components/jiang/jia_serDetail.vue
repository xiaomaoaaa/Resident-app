<template>
<div class="detail">
	<div class="head-box" ref='head'>
		<div class="header">
			<div class="back" @click='back'>
			</div>
			<h1 class="title">服务详情</h1>
		</div>
		<div class="desc">
			<h1 class="title">{{service.serviceName}}</h1>
			<h2 class="times">总次数：{{service.times}}次 剩余{{service.remainTimes}}次</h2>
			<p class="text">{{service.serviceDesc}}</p>
		</div>
	</div>
	<div class="pad"></div>
	<div class="divide"></div>
	<div class="content">
		<div class="item" v-for='item in execList'>
			<div class="cir">
				<div class="cir-in"></div>
			</div>
			<div class="text-content">
				<div class="tip-box">
					<span class="tip">服务时间</span>
					<span class="tip">服务人</span>
					<span class="tip">服务方式</span>
					<span class="tip">服务地点</span>
				</div>
				<div class="val-box">
					<span class="val">{{item.exeDt.slice(0,10)}}</span>
					<span class="val">{{item.exeUserName}}</span>
					<span class="val">{{item.exeWay | serMethodFilter}}</span>
					<span class="val">{{item.exeAddr}}</span>
				</div>
			</div>
			<div class="intro">服务说明</div>
		</div>
	</div>
</div>
</template>
<script>
import api from '../../api/index.js'
import { Indicator } from 'mint-ui';
export default{
	data(){
		return{
			id:'',
			service: {},
			execList: []
		}
	},
	methods:{
		getDetail(){
			Indicator.open();
			this.id = this.$route.params.packid;
			let id = Number(this.id);
			// console.log(this.id)
			let params =[id]; 
			api.commonAjax(params,'pcn.pcnSignServiceService','queryPcnSignServiceAndExecs')
				.then((res)=>{
					if(res.code ==200){
						this.service = res.body.service;
						this.execList = res.body.execList;
						// console.log(this.service);
						Indicator.close();
						console.log(this.execList);
					}
				})
		},
		back(){
			this.$router.go(-1);
		}
	},
	filters:{
		serMethodFilter(value){
			if(value == '01'){
				return '上门服务'
			}else if(value == '02'){
				return '电话服务'
			}
		}
	},
	mounted(){
		this.getDetail();
		// let length = this.$refs.head.offsetHeight;
		// console.log(length)
	}
}
</script>
<style lang="less" scoped>
.detail{
	.head-box{
		position: fixed;
		top:0;
		left:0;
		right: 0;
		background-color: #fff;
		z-index: 100;
		.header{
			position: relative;
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
			padding: 0.2rem;
			background-color: #fff;
			.title{
				font-size: 16px;
				color:#333;
				line-height: 24px;
			}
			.times{
				font-size: 14px;
				color:#fd8f0e;
				line-height: 24px;
				padding: 0.1rem 0 0.2rem 0;
			}
			.text{
				font-size: 14px;
				color:#444;
				font-weight: 100;
				line-height: 18px;
				padding-bottom: 0.2rem;
			}
		}
	}
	.pad{
		height: 210px;
	}
	.divide{
		height: 0.3rem;
		background-color: #f2f2f2;
	}
	.content{
		margin-left: 0.5rem;
		.item{
			// height: 5rem;
			border-left: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			position: relative;
			padding-bottom: 0.5rem;
			.cir{
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 50%;
				background-color:#bfecc7;
				position: absolute;
				top:0.7rem;
				left:-0.25rem;
				// padding: 0.1rem;
				.cir-in{
					width: 0.3rem;
					height: 0.3rem;
					border-radius: 50%;
					background-color: #64cd70;
					position: relative;
					left:0.1rem;
					top:0.1rem;
				}
			}
			.text-content{
				padding: 0.5rem 0 0 0.5rem;
				display: flex;
				font-size: 16px;
				.tip-box{
					// padding-left: 0.2rem;
					.tip{
						display: block;
						font-size: 16px;
						margin-top: 0.2rem;
						color:#999;
					}
				}
				.val-box{
					padding-left: 0.5rem;
					.val{
						display: block;
						margin-top: 0.2rem;
						// margin-left: 0.3rem;
				 		color:#000;
					}
				}
				// .tip{
				// 
				// 	margin-top: 0.2rem;
				// 	.val{
				// 		
				// 	}
				// }
			}
			.intro{
				// width: 100%;
				// padding:0.5rem 0;
				margin:0.5rem 0.5rem 0 0.5rem;
				height: 1.3rem;
				background-color: #ebebeb;
				padding: 0.4rem;
				font-size: 16px;
				color:#fd8f0e;
			}
		}
	}
}
</style>
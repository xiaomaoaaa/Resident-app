<template>
<div class="about">
	<div class="header">
		<router-link to='/jia_setter'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">关于我们</h1>
	</div>
	<div class="pad"></div>
	<div class="avatar">
		<img class="img" src="../../assets/img/jia_1024.png" width="60" height="60">
		<h1 class="title">{{app}}</h1>
	</div>
	<div class="cell-container">
		<mt-cell title="功能介绍" @click.native="showSet" is-link></mt-cell>
	</div>
	<div class="intro" v-show='introShow'>
		<div class="header">
			<div class="back" @click="hideSet">
			</div>
			<h1 class="title">功能介绍</h1>
		</div>
		<div class="pad"></div>
		<div class="content">
			<p class="text" id="text"></p>
		</div>
	</div>
</div>
</template>
<script>
import { Cell } from 'mint-ui'
import api from '../../api/index.js'
export default{
	data(){
		return{
			app: '鹏云健康',
			introShow: false,
			intro:''
		}
	},
	methods:{
		showSet(){
			this.introShow = true;
		},
		hideSet(){
			this.introShow = false;
		},
		getData(){
			let params=["hcn.shenzhen.patient_android"];
			api.commonAjaxKy(JSON.stringify(params) ,'hcn.tenantProductsService','getProductTenantByTenantPCode')
				.then((res)=>{
					if(res.code==200){
						this.intro = res.body;
						document.getElementById('text').innerText = this.intro;
						// console.log(this.intro)
					}
				})
		}
	},
	mounted(){
		this.getData();
	},
	components:{
		'mt-cell':Cell
	}
}
</script>
<style lang="less" scoped>
.about{
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
		height: 1.2rem;
		background-color: transparent;
	}
	.avatar{
		width: 100%;
		background-color: #f2f2f2;
		padding: 0.7rem 0;
		.img{
			// width: 1rem;
			// height: 1rem;
			border-radius: 0.3rem;
			margin-left: 50%;
			transform:translateX(-50%);
		}
		.title{
			text-align: center;
			font-size: 16px;
		}
	}
	.cell-container{
		margin-top: -1px;
	}
	.intro{
		position: absolute;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
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
			}
		}
		.pad{
			height: 1.2rem;
			background-color: transparent;
		}
		.content{
			.text{
				padding: 0.2rem;
				font-size: 14px;
				line-height: 20px;
			}
		}
	}
}
</style>
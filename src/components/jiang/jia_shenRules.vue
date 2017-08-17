<template>
<div class="rules">
	<div class="header">
		<!-- <router-link to='/jia_appeal'> -->
			<div class="back" @click="back">
			</div>
		<!-- </router-link> -->
		<h1 class="title">申诉规则</h1>
	</div>
	<div class="pad"></div>
	<p class="regular" id="regular">{{regular}}</p>
</div>
</template>
<script>
import api from '../../api/index.js'
export default{
	data(){
		return {
			regular: ''
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		getRule(){
			// http://122.224.131.235:9088/hcn-web/*.jsonRequest
			let params = []; 
			api.commonAjaxKy(JSON.stringify(params),'hcn.appealService','getUserAppealRegular')
				.then((res)=>{
					if(res.code ==200){
						this.regular = res.body.appealRegularDesc.split('\r\n').join('<br/>');
						document.getElementById('regular').innerHTML = this.regular;
					}
				})
		}
	},
	mounted(){
		this.getRule();
	}
}
</script>
<style lang="less">
.rules{
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
	.regular{
		padding: 0 0.2rem;
		font-size: 16px;
		line-height: 28px;
	}
}
</style>
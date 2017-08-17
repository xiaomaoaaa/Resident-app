<template>
<div class="setter">
	<div class="header">
		<router-link to='/jia_person'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">设置</h1>
	</div>
	<div class="pad"></div>
	<div class="content">
		<mt-cell title="账号设置" @click.native='toAccount' is-link></mt-cell>
		<!-- <div class="divide"></div> -->
		<mt-cell title="我的二维码" @click.native='toMa' is-link></mt-cell>
		<mt-cell title="关于" @click.native='toAbout'  is-link></mt-cell>
	</div>
</div>
</template>
<script>
import {Cell} from 'mint-ui'
export default{
	components:{
		'mt-cell':Cell
	},
	methods:{
		toAccount(){
			// console.log(11)
			this.$router.push('/jia_account');
		},
		toMa(){
			this.$router.push('/jia_ma');
		},
		toAbout(){
			this.$router.push('/jia_about');
		}
	}
}
</script>
<style lang="less">
.setter{
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
		.divide{
			height: 0.3rem;
			background: #f2f2f2;
		}
	}
}
</style>
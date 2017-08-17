<template>
<div class="success">
	<div class="header">
		<router-link to='/jia_appeal'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">证件申诉</h1>
	</div>
	<div class="pad"></div>
	<div class="content">
		<div class="img"></div>
		<h1 class="tip">证件申诉修改申请已发送，正在等待审核</h1>
		<p class="text">待信息核对无误后<br/>即可为您修改身份证号码<br/>后续请关注短信及APP推送消息</p>
	</div>
	<div class="yz" @click='submit'>
		<div class="button">知道了</div>
	</div>
</div>
</template>
<script>
export default{
	methods:{
		submit(){
			this.$router.push('/jia_appeal');
		}
	}
}
</script>
<style lang="less" scoped>
.success{
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
	.content{
		.img{
			width: 1.7rem;
			height: 1.7rem;
			margin:0.5rem auto;
			background: url('../../assets/img/jia_wo_choose.png') no-repeat;
			background-size: cover;
		}
		.tip{
			font-size: 16px;
			text-align: center;
			padding-bottom: 0.3rem;
		}
		.text{
			font-size: 14px;
			text-align: center;
			line-height: 30px;
			color:#666;
		}
	}
	.yz{
		width: 90%;
		height: 0.8rem;
		margin-top: 1rem;
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
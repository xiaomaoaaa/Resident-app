<template>
	<div class="Jmzx_detail">
		<!--头部-->
		<mt-header fixed title="咨询记录">
		  <router-link to="/jmzx" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button slot="right">
		  	结束咨询
		  </mt-button>
		</mt-header>
		
		<div class="top">
			医生的回复仅为建议，具体诊疗前往医院进行。
		</div>
	</div>
</template>

<script>
import '../../assets/css/li_qygl_detail.css'	
</script>

<style scoped>
.Jmzx_detail .mint-header{
		height: 1rem;
		background-color: #fff;
		color: #26a2ff;
	}
.Jmzx_detail .mint-header-button{
	display: block;
	flex: 0;
}		
.Jmzx_detail .mint-button{
		height: 1.5rem;
	}
.Jmzx_detail .mint-header{
		font-size: 0.33rem;
	}
.Jmzx_detail .mintui-back{
		font-size: 0.37rem;
	}	
.Jmzx_detail .top{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 0.6rem;
	margin-top: 0.94rem;	
	background: #D8F2FF;
	color: #26A2FF;
	font-size: 0.28rem;
}
	
</style>
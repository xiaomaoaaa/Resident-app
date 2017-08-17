<template>
<div class="account">
	<div class="header">
		<router-link to='/jia_setter'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">账号设置</h1>
	</div>
	<div class="pad"></div>
	<div class="content">
		<mt-cell title="登陆密码" @click.native="toPas"  is-link>修改</mt-cell>
		<mt-cell title="手机绑定" @click.native="toPhone" is-link>{{ jia_phoneNumber | numberFilter }}</mt-cell>
		<mt-cell title="账号信息申诉" @click.native="toAppeal" is-link>用于账号、证件信息</mt-cell>
	</div>
</div>
</template>
<script>
import { Cell } from 'mint-ui'
import { mapState } from 'vuex'
export default{
	components:{
		'mt-cell':Cell
	},
	computed:mapState({
		jia_phoneNumber: state=>state.jia_phoneNumber
	}),
	methods:{
		toPas(){
			this.$router.push('/jia_pas');
		},
		toPhone(){
			this.$router.push('/jia_phone')
		},
		toAppeal(){
			this.$router.push('/jia_appeal')
		}
	},
	filters:{
		numberFilter(value){
			let arr = value.split('');
			arr.splice(3, 4, ['****']);
			let value1 = arr.join('');
			return value1;
		}
	}
}
</script>
<style lang="less">
.account{
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
}
</style>
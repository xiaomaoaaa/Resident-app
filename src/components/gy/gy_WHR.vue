<template>
	<div class="bmi">
		<mt-header fixed title="腰臀比计算">
			<a @click='$router.go(-1)' slot="left">
				<mt-button icon="back"></mt-button>
			</a>
		</mt-header>
		<div class="content">
			<div class="sex">
				<span class="sex_title">性别</span>
				<label class="mint-switch">
					<input type="checkbox" class="mint-switch-input" v-model="sex"/> 
					<span class="mint-switch-core">
						<span class="gy_switch_left">女</span>
						<span class="gy_switch_right">男</span>
					</span> 
					<div class="mint-switch-label"></div>
				</label>
			</div>
			<mt-field label="腰围（cm）" placeholder="请输入" v-model="waistline"></mt-field>
			<mt-field label="臀围（cm）" placeholder="请输入" v-model="hipline"></mt-field>
		</div>
		<mt-button size="large" @click="makesure">确定</mt-button>
	</div>
</template>

<script>
	import {
		commonAjax,
		requestConfirmPassword,
		dicAjax,
		imgUrl
	}
	from '../../api/api';
	import '../../assets/css/li_style.css'
	import { Navbar, TabItem, Header, Indicator, Toast, Switch } from 'mint-ui';
	export default {
		data: function() {
			return {
				sex: false,//false: 男，ture: 女
				waistline: '',
				hipline: ''
			}
		},
		//请求数据
		methods: {
			makesure() {
				if (!this.waistline) {
					Toast('请输入正确的腰围');
					return;
				}
				if (!this.hipline) {
					Toast('请输入正确的臀围');
					return;
				}
				this.$router.push({
					path: '/gy_WHR_result',
					query: {
						sex: this.sex ? 2 : 1,
						waistline: this.waistline,
						hipline: this.hipline
					}
					
				});
			}
		}
	}
</script>

<style>
	.bmi .content {
		margin-top: 1rem;
		padding: 0.2rem;
		background: #fff;
		margin-bottom: 1rem;
	}
	.bmi .content .sex {
		font-size: 0.33rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1rem;
		padding: 0 0.2rem;
	}
	.bmi .content .sex .sex_title {
		color: #888;
	}
	.mint-field-core{
		text-align: right;
	}
	.mint-switch-core{
		width: 70px;
		border: 1px solid #46c9af;
		background: #46c9af;
	}
	.mint-switch-core span{
		color: #fff;
		line-height: 32px;
		font-size: 15px;
		margin: 0 5px;
	}
	.gy_switch_right {
		float: right;
	}
	.mint-switch-input:checked + .mint-switch-core {
	    border-color: #f3ef0a;
	    background-color: #f3ef0a;
	}
	.bmi .content .sex .mint-switch-core::before{
		width: 0;
		background: #46c9af;
	}
	.mint-switch-input:checked + .mint-switch-core::after {
	    -webkit-transform: translateX(38px);
	    transform: translateX(38px);
	}
</style>
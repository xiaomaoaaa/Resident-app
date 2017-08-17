<template>
	<div class="app">
		<div class="header">
			<mt-header title="家庭成员添加">
				<a slot="left" @click='$router.push("/zy_myfamily")'>
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
		</div>
		<div class="session">
			<div class="progress">
				<div class="pro">
					<dl class="item first">
						<dt class="cir">1</dt>
						<dd class="des">证件验证</dd>
					</dl>
					<dl class="item second">
						<dt class="cir">2</dt>
						<dd class="des">信息完善</dd>
					</dl>
				</div>
			</div>
			<div class="body">
				<mt-cell title='*国籍' :value='zone' is-link @click.native='showZone'></mt-cell>
				<transition name='slide'>
					<div class="zone" v-show='zoneShow'>
						<mt-radio align="right" title='国籍' v-model='zoneValue' :options='zones' @click.native='zoneHide'></mt-radio>
					</div>
				</transition>
				<mt-cell title='*证件类型' :value='cardType' is-link @click.native='showCard'></mt-cell>
				<transition name='slide'>
					<div class="type" v-show='cardShow'>
						<mt-radio align="right" title='证件类型' v-model='cardIndex' :options='cardTypes' @click.native='cardHide'></mt-radio>
					</div>
				</transition>
				<mt-field label="*证件号码" placeholder="请输入证件号码" v-model="certificateNo"></mt-field>
				<div class="gy_butn">
					<mt-button type="primary" @click.native="gy_djcxyz">下一步</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Cell } from 'mint-ui'
	import { Radio, Button, MessageBox, Toast } from 'mint-ui'
	import '../../assets/css/gy_style.css'
	export default {
		data() {
			return {
				zone: '中国',
				cardType: '居民身份证',
				zoneValue: '01',
				cardIndex: '01',
				zoneShow: false,
				cardShow: false,
				cardTypes: [
					{
						label: '居民身份证',
						value: '01'
					},
					{
						label: '军官证',
						value: '04'
					},
					{
						label: '出生证明',
						value: '11'
					}
				],
				zones: [
					{
						label: '中国',
						value: '01'
					},
					{
						label: '中国台湾',
						value: '03'
					},
					{
						label: '中国香港澳门',
						value: '02'
					},
					{
						label: '海外',
						value: '04'
					}
				],
				zonesDic: {'01': '中国','03': '中国台湾', '02': '中国香港澳门', '04': '海外'},
				cardTypesDic: {'01': '居民身份证', '04': '军官证', '11': '出生证明', '07': '台湾居民来往内地通行证', '06': '港澳居民来往内地通行证', '03': '护照'},
				types: {
					'01': [
						{
							label: '居民身份证',
							value: '01'
						},
						{
							label: '军官证',
							value: '04'
						},
						{
							label: '出生证明',
							value: '11'
						}
					],
					'03': [{
						label: '台湾居民来往内地通行证',
						value: '07'
					}],
					'02': [{
						label: '港澳居民来往内地通行证',
						value: '06'
					}],
					'04': [{
						label: '护照',
						value: '03'
					}]
				},
				certificateNo: ""
			}
		},
		methods: {
			showZone() {
				this.zoneShow = !this.zoneShow
			},
			showCard() {
				this.cardShow = !this.cardShow
			},
			zoneHide() {

				this.zoneShow = false
			},
			cardHide() {
				this.cardShow = false
			},
			validate(event) {
				let target = event.target;
				let value = target.value;
				// console.log(value)
				value = value.replace(/[^\d]/, '');
				target.value = value;
			},
			validateForm(event) {
				let value = event.currentTarget.value;
				switch(this.cardIndex) {
					case '0':
						// console.log(value)
						break;
					case '1':
						// console.log(value)
						break;
					case '2':
						// console.log(value)
						break;
					case '3':
						// console.log(value)
						break;
					case '4':
						// console.log(value)
						break;
					case '5':
						// console.log(value)
				}
			},
			gy_djcxyz() {
				if(this.cardType == "居民身份证") {
					if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.certificateNo)) {
						var birthdayStr = this.certificateNo.substring(6, 14);
						sessionStorage.setItem("otherBirthday", birthdayStr.substring(0, 4) + "-" + birthdayStr.substring(4, 6) + "-" + birthdayStr.substring(6));
					} else {
						Toast('身份证信息有误');
						return;
					}
				}
				if(this.cardType == "台湾居民来往内地通行证") {
					if(/[A-Z][0-9]{9}/.test(this.certificateNo)) {
						sessionStorage.removeItem("otherBirthday");
					} else {
						Toast('通行证信息有误');
						return;
					}
				}
				if(this.cardType == "港澳居民来往内地通行证") {
					if(/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(this.certificateNo)) {
						sessionStorage.removeItem("otherBirthday");
					} else {
						Toast('通行证信息有误');
						return;
					}
				}
				if(this.cardType == "护照") {
					if(/^[a-zA-Z]{5,17}$/.test(this.certificateNo) | /^[a-zA-Z0-9]{5,17}$/.test(this.certificateNo)) {
						sessionStorage.removeItem("otherBirthday");
					} else {
						Toast('护照信息有误');
						return;
					}
				}
				sessionStorage.setItem("gy_source", this.zoneValue);
				sessionStorage.setItem("gy_certificateType", this.cardIndex);
				sessionStorage.setItem("certificateNo", this.certificateNo);
				this.$router.push("/gy_add_family_detail")
			}
		},
		watch: {
			zoneValue() {
				this.zone = this.zonesDic[this.zoneValue]
				this.cardTypes = this.types[this.zoneValue]
				this.cardIndex = this.cardTypes[0].value
			},
			cardTypes() {
				this.cardType = this.cardTypes[0].label;
			},
			cardIndex() {
				this.cardType = this.cardTypesDic[this.cardIndex]
			}
		},
		components: {
	        'mt-cell':Cell,
			'mt-radio':Radio,
			"mt-button":Button
		}
	}
</script>
<style scoped>
	.progress {
		padding: 0.6rem;
    	margin-bottom: .6rem;
	}
	.progress .pro {
		width: 90%;
		margin-left: 5%;
		border-top: 1px solid #d6d6d6;
		position: relative;
	}
	.progress .item {
		width: 60px;
		position: absolute;
		top: -0.2rem;
	}
	.progress .first {
		left: 0.8rem;
		color: #fcc648
	}
	.progress .first .cir {
		background-color: #fcc648
	}
	.progress .first .des {
		text-align: center;
		color: #fcc648;
	}
	.progress .cir {
		display: block;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		font-size: 12px;
		line-height: 0.4rem;
		text-align: center;
		margin-left: 20px;
		color: #fff;
	}
	.progress .des {
		font-size: 14px;
		margin-top: 10px;
	}
	.progress .second {
		right: .8rem;
		color: #888;
	}
	.progress .second .cir {
		color: #888;
		background-color: #fff;
	}
	.progress .second .des {
		text-align: center;
	}
	.zone, .type{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color: #fff;
		z-index: 1000;
	}
	.body .mint-radiolist-title{
		font-size: 18px;
		color:#60c8f5;
		text-align: center;
	}
	.gy_butn{width:80%;margin:0 auto;margin-top:.6rem;}
	.gy_butn button{width:100%;background-color: #4eab52;}
</style>
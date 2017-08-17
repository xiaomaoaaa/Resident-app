<template>
	<div class="app">
		<div class="header">
			<mt-header title="家庭成员添加">
				<a slot="left" @click='$router.push("/gy_add_family")'>
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
		</div>
		<div class="session">
			<div class="progress">
				<div class="pro">
					<dl class="item first">
						<dt class="cir">√</dt>
						<dd class="des">证件验证</dd>
					</dl>
					<dl class="item second">
						<dt class="cir">2</dt>
						<dd class="des">信息完善</dd>
					</dl>
				</div>
			</div>
			<div class="body">
				<form class="add_family_form" action="">
					<mt-field label="*姓名" placeholder="请填写" v-model="person.personName"></mt-field>
					<mt-cell title="*性别" :value="sex" is-link @click.native='showSexs'></mt-cell>
					<transition name='slide'>
						<div class="sexs" v-show='sexsShow'>
							<mt-radio title='性别' align='right' v-model='sexsIndex' :options='sexTypes' @click.native='hideSexs'></mt-radio>
						</div>
					</transition>
					<mt-cell title="*出生日期" is-link @click.native="openPicker">{{birthdayStr}}</mt-cell>
					<mt-datetime-picker v-model="person.dob" type="date" ref='picker'
						year-format="{value} 年"
						month-format="{value} 月"
						date-format="{value} 日"
						:startDate="new Date(0,0,1)"
						:endDate="new Date()"
						@confirm="handleConfirm"
					></mt-datetime-picker>
					<mt-field label="*手机号码" placeholder="请填写" type="tel" v-model="person.phoneNo"></mt-field>
					<mt-cell title="*家庭关系" :value="familyType" is-link @click.native='showFamilyTypes'></mt-cell>
					<transition name='slide'>
						<div class="familyTypes" v-show='familyTypesShow'>
							<mt-radio title='家庭关系' align="right" v-model='familyTypesIndex' :options='familyTypes' @click.native='hideFamilyTypes'></mt-radio>
						</div>
					</transition>
				</form>
				<div class="gy_butn">
					<mt-button type="primary" @click="gy_add_family">完成</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Cell, Field, DatetimePicker, Radio, Button, Toast, Indicator } from 'mint-ui';
	import { commonAjaxKy } from '../../api/api.js'
	import "../../assets/css/gy_style.css";
	export default {
		data() {
			return {
				person: {
					nationality: sessionStorage.getItem("gy_source"),
					mpiId: "",
					avatar: "",
					personName: "",
					sex: "1",
					dob: new Date(sessionStorage.getItem("otherBirthday")),
					phoneNo: "",
					certificate: {
						certificateNo: sessionStorage.getItem("certificateNo"),
						source: sessionStorage.getItem("gy_source"),
						certificateType: sessionStorage.getItem("gy_certificateType")
					}
				},
				birthdayStr: new Date(sessionStorage.getItem("otherBirthday")).toLocaleString().slice(0,9),
				sex: "男",
				sexsShow: false,
				sexsIndex: '0',
				sexTypes: [
					{
						label: '男',
						value: '1'
					},
					{
						label: '女',
						value: '2'
					}
				],
				sexDics: {'1': '男', '2': '女'},
				familyType: "",
				familyTypesShow: false,
				familyTypesIndex: '0',
				familyTypes: [
					{
						label: '配偶',
						value: '1'
					},
					{
						label: '子',
						value: '2'
					},
					{
						label: '女',
						value: '3'
					},
					{
						label: '孙',
						value: '4'
					},
					{
						label: '父母',
						value: '5'
					},
					{
						label: '祖辈',
						value: '6'
					},
					{
						label: '兄弟姐妹',
						value: '7'
					},
					{
						label: '其他',
						value: '8'
					}
				],
				familyTypesDic: {'1': '配偶', '2': '子', '3': '女', '4': '孙', '5': '父母', '6': '祖辈', '7': '兄弟姐妹', '8': '其他'}
			}
		},
		methods: {
			showSexs() {
				this.sexsShow = !this.sexsShow
			},
			hideSexs() {
				this.sexsShow = false
			},
			showFamilyTypes() {
				this.familyTypesShow = !this.familyTypesShow
			},
			hideFamilyTypes() {
				this.familyTypesShow = false
			},
			openPicker() {
		    	this.$refs.picker.open();
			},
			handleConfirm(value){
				this.person.dob = (value).toLocaleString().slice(0,9)
			},
			gy_add_family() {
				if (!this.person.personName) {
					Toast('请输入姓名');
					return;
				}
				if (!this.person.dob) {
					Toast('请选择生日');
					return;
				}
				if (!this.person.phoneNo) {
					Toast('请输入手机号');
					return;
				}
				if (!this.person.familyType) {
					Toast('请选择家庭关系');
					return;
				}
				Indicator.open('正在提交,请等待...');
				let params = [this.person, this.familyTypesIndex];
		        commonAjaxKy(JSON.stringify(params), 'hcn.person', 'saveFamilyMember').then(res => {
		        	Indicator.close()
		            if (res.code === 200) {
		            	this.$router.push('/zy_myfamily');
		            } else {
		            	Indicator.close()
						Toast(res.msg)
		            }
		        });
			}
		},
		watch: {
			sexsIndex() {
				this.sex = this.sexDics[this.sexsIndex],
				this.person.sex = this.sexsIndex
			},
			familyTypesIndex() {
				this.familyType = this.familyTypesDic[this.familyTypesIndex],
				this.person.familyType = this.familyTypesIndex
			}
		},
		mounted() {
			Indicator.open();
	        let params = [this.person.certificate]
	        commonAjaxKy(JSON.stringify(params), 'hcn.person', 'checkFamilyMember').then(res => {
	        	Indicator.close()
	            if (res.code == 200) {
	            	if (res.body) {
		            	var person = res.body;
		            	this.person.mpiId = person.mpiId;
		            	this.person.personName = person.personName;
		            	this.person.phoneNo = person.phoneNo;
		            	this.person.sex = person.sex;
	            	}
	            } else {
	            	Toast(res.msg)
	            	this.$router.push('/gy_add_family')
	            }
	        })
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
		color: #fcc648
	}
	.progress .second .cir {
		background-color: #fcc648;
	}
	.progress .second .des {
		text-align: center;
		color: #fcc648;
	}
	.sexs, .familyTypes{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color: #fff;
		z-index: 1000;
	}
	.gy_butn{width:80%;margin:0 auto;margin-top:.6rem;}
	.gy_butn button{width:100%;background-color: #4eab52;}
</style>
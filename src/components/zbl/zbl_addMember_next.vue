<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
	<div class="header">
		<mt-header title="家庭成员添加">
			<a slot="left" @click='$router.push("/qyxq_addMember")'>
				<mt-button icon="back"></mt-button>
			</a>
		</mt-header>
	</div>

	<div class="body">
		<mt-field label="姓名" placeholder="请输入" v-model='zbl_name'></mt-field>

		<mt-cell title="性别" is-link @click.native='sheetVisible = true'>
			<span class="sexType" v-if='sexText'>{{sexText.slice(0,1)}}</span>
			<span class="sexType" v-else>男</span>
		</mt-cell>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

		<mt-cell title="出生日期" is-link @click.native='openPicker'>
			<span class="birthDay" v-if='zbl_addFamilyPerInfo.certificate.certificateNo'>{{zbl_addFamilyPerInfo.certificate.certificateNo.slice(6,10) + '-' + zbl_addFamilyPerInfo.certificate.certificateNo.slice(10,12) + '-' + zbl_addFamilyPerInfo.certificate.certificateNo.slice(12,14)}}</span>
			<span class="birthDay" v-else>请选择</span>
		</mt-cell>
		<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="new Date(40,0,1)" :endDate="new Date()" @confirm="handleConfirm"></mt-datetime-picker>

		<mt-field label="手机号码" placeholder="请输入" type="tel" v-model='zbl_phoneNo'></mt-field>

		<mt-cell title="家庭关系" is-link @click.native='sheetVisible2 = true'>
			<span class="relationShip">请选择</span>
		</mt-cell>
		<mt-actionsheet :actions="actions2" v-model="sheetVisible2"></mt-actionsheet>

		<div class="button">
			<mt-button type="primary" @click="next">完成添加</mt-button>
		</div>
	</div>

</div>
</template>

<script>
import {
	Navbar,
	TabItem,
	Header,
	Button,
	Cell,
	Field,
	DatetimePicker,
	MessageBox,
	Toast,
	Indicator
} from 'mint-ui';
import {
    mapActions,
    mapState
} from 'vuex'
import {
    commonAjaxKy,commonAjax
} from '../../api/api.js'
export default {
	data: function() {
		return {
			sheetVisible: false,
			sheetVisible2: false,
			actions: [{
				'name': '男',
				'method': this.sexType
			}, {
				'name': '女',
				'method': this.sexType
			}],
			actions2: [{
				'name': '配偶',
				'method': this.relationShip
			}, {
				'name': '子',
				'method': this.relationShip
			}, {
				'name': '女',
				'method': this.relationShip
			}, {
				'name': '孙',
				'method': this.relationShip
			}, {
				'name': '父母',
				'method': this.relationShip
			}, {
				'name': '祖辈',
				'method': this.relationShip
			}, {
				'name': '兄弟姐妹',
				'method': this.relationShip
			}, {
				'name': '其他',
				'method': this.relationShip
			}, ],
			zbl_phoneNo: '',
			zbl_name: '',
			relationShipDic: ['','配偶','子','女','孙','父母','祖辈','兄弟姐妹','其他'],
			sexText: '',
			mpiId: ''
		}
	},
	computed: {
		...mapState({
            zbl_addFamilyPerInfo: state => state.zbl_addFamilyPerInfo,
			zbl_familyMemberInfo: state => state.zbl_familyMemberInfo
        })
	},
	watch: {
		// zbl_familyMemberInfo: function() {
		// 	console.log(this.zbl_familyMemberInfo);
		// 	this.zbl_name = this.zbl_familyMemberInfo.personName
		// 	this.sexText = this.zbl_familyMemberInfo.sexText
		// 	this.zbl_phoneNo = this.zbl_familyMemberInfo.phoneNo
		// 	this.mpiId = this.zbl_familyMemberInfo.mpiId
		// }
	},
	methods: {
		//选择性别
		sexType(e) {
			document.querySelector('.sexType').innerText = e.name
		},
		openPicker() {
			document.querySelector('.mint-datetime-picker').style.display = 'block'
			this.$refs.picker.open()
		},
		//处理选中时间格式
		handleConfirm(e) {
			let arrTemp = e.toLocaleString().slice(0, 10).split(' ')[0].split('/')
			if (arrTemp[1].length === 1) {
				arrTemp[1] = '0' + arrTemp[1]
			}
			if (arrTemp[2].length === 1) {
				arrTemp[2] = '0' + arrTemp[2]
			}
			let result = arrTemp[0] + "-" + arrTemp[1] + "-" + arrTemp[2]
			document.querySelector('.birthDay').innerText = result
		},
		//选择家庭关系
		relationShip(e) {
			document.querySelector('.relationShip').innerText = e.name
		},
		next() {
			if (this.zbl_name) {
				if (document.querySelector('.sexType').innerText) {
					if (document.querySelector('.birthDay').innerText != '请选择') {
						if (this.zbl_phoneNo) {
							if (/^1[34578]\d{9}$/.test(this.zbl_phoneNo)) {
								if (document.querySelector('.relationShip').innerText != '请选择') {
									let sexType = ''
									document.querySelector('.sexType').innerText == '男' ? sexType = '1' : sexType = '2'
									let relationShipMark = this.relationShipDic.indexOf(document.querySelector('.relationShip').innerText)
									let params = [
										{
										"nationality": "",
										"certificate": this.zbl_addFamilyPerInfo.certificate,
										"mpiId": this.mpiId,
										"dob": document.querySelector('.birthDay').innerText,
										"avatar": "",
										"personName": this.zbl_name,
										"sex": sexType,
										"phoneNo": this.zbl_phoneNo
									},
									relationShipMark  //代表家庭关系
								]
								console.log(params)
									Indicator.open('正在提交,请等待...')
									commonAjaxKy(JSON.stringify(params), 'hcn.person', 'saveFamilyMember').then(res => {
										if (res.code === 200) {
											Indicator.close()
							                MessageBox('提示', '提交成功!').then(() => {
												let obj = {}
												this.zbl_getfamilyMemberInfo(JSON.stringify(obj))
												this.$router.push('/zbl_jmqy')
											})

										} else if(res.code === 620) {
											Indicator.close()
											MessageBox.alert('提示', '证件已被注册!').then(() => {
												this.$router.push('/qyxq_addMember')
											})
										} else if(res.code === 624) {
											Indicator.close()
											MessageBox.alert('提示',res.msg).then(() => {
												this.$router.push('/mybaseinfo2')
											})
										} else if(res.code === 629) {
											Indicator.close()
											MessageBox.alert('提示',res.msg).then(() => {
												this.$router.push('/mybaseinfo2')
											})
										} else {
											Indicator.close()
											MessageBox.alert('提示', '服务器开小车啦').then(() => {
												this.$router.push('/qyxq_addMember')
											})
										}
									})
								} else {
									Toast({
										message: '请选择家庭关系',
										duration: 1000
									})
								}
							} else {
								Toast({
									message: '手机号码格式错误',
									duration: 1000
								})
							}
						} else {
							Toast({
								message: '请先输入手机号码',
								duration: 1000
							})
						}
					} else {
						Toast({
							message: '请选择出生日期',
							duration: 1000
						})
					}
				}
			} else {
				Toast({
					message: '请输入姓名',
					duration: 1000
				})
			}
		},
		...mapActions(['zbl_getfamilyMemberInfo'])
	},
	mounted() {
		this.zbl_name = this.zbl_familyMemberInfo.personName
		this.sexText = this.zbl_familyMemberInfo.sexText
		this.zbl_phoneNo = this.zbl_familyMemberInfo.phoneNo
		this.mpiId = this.zbl_familyMemberInfo.mpiId
	},
	beforeRouteEnter(to,from,next) {

		next()
	}

}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
.mint-header {
	height: 1rem;
	font-size: .4rem;
	background-color: #35B46F;
}
.button {
	padding-top: 50px;
	width: 70%;
	margin: 0 auto;
	text-align: center;
	.mint-button {
		width: 100%;
		background-color: #35B46F;
	}
}
.mint-popup-bottom {
	top:60%;
	right: 0;
}
</style>

<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
	<div class="header">
		<mt-header title="完善信息">
			<a slot="left" @click='$router.push("/jia_person")'>
				<mt-button icon="back"></mt-button>
			</a>
			<a slot="right" @click='updateInfo'>
				<mt-button class="smallbtn">保存</mt-button>
			</a>
		</mt-header>
	</div>

	<div class="body">
		<div class="warnInfo">请填写个人证件上的信息，证件信息提交之后不可修改。</div>
		<mt-field label="*姓名" v-model='zbl_personName'></mt-field>
		<mt-cell title="*国籍">
			<span class="marginRight" v-if='getPersonInfo'>{{getPersonInfo.nationalityText}}</span>
		</mt-cell>
		<mt-cell title="*证件类型">
			<span style='margin-right:25px' v-if='getPersonInfo.certificate'>{{getPersonInfo.certificate.certificateTypeText}}</span>
		</mt-cell>
		<mt-cell title="*证件号码">
			<span style='margin-right:25px' v-if='getPersonInfo.certificate'>{{getPersonInfo.certificate.certificateNo.slice(0,-4) + '****'}}</span>
		</mt-cell>
		<mt-cell title="*性别" is-link @click.native='sheetVisible = true'>
			<span class="sexType" v-if='getPersonInfo.sexText'>{{getPersonInfo.sexText.slice(0,1)}}</span>
		</mt-cell>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

		<mt-cell title="出生日期" is-link @click.native='openPicker'>
			<span class="birthDay" v-if='getPersonInfo.dob'>{{getPersonInfo.dob.slice(0,10)}}</span>
		</mt-cell>
		<mt-datetime-picker type="date" ref="picker" :startDate="new Date(40,0,1)" :endDate="new Date()" @confirm="handleConfirm"></mt-datetime-picker>

		<mt-cell title="*手机号码">
			<span class="phoneNo" style='margin-right:25px' v-if='getPersonInfo.phoneNo'>{{getPersonInfo.phoneNo.slice(0,3) + '****' + getPersonInfo.phoneNo.slice(7,11)}}</span>
		</mt-cell>
		<div class="divide"></div>

		<mt-cell title="身高" @click.native='selectChoose' class="height2">
			<span class="marginRight height" v-if='getPersonInfo.height'>{{getPersonInfo.height}}</span>
			<span class="marginRight height" v-else>请选择</span>
		</mt-cell>
		<mt-cell title="体重" @click.native='selectChoose' class="weight2">
			<span class="marginRight weight" v-if='getPersonInfo.weight'>{{getPersonInfo.weight}}</span>
			<span class="marginRight weight" v-else>请选择</span>
		</mt-cell>

		<mt-cell title="血型" is-link @click.native='sheetVisible2 = true'>
			<span class="bloodType" v-if='getPersonInfo.bloodTypeText'>{{getPersonInfo.bloodTypeText}}</span>
			<span class="bloodType" v-else>请选择</span>
		</mt-cell>
		<mt-actionsheet :actions="actions2" v-model="sheetVisible2"></mt-actionsheet>

		<mt-cell title="婚姻" is-link @click.native='sheetVisible3 = true'>
			<span class="married" v-if='getPersonInfo.maritalStatusText'>{{getPersonInfo.maritalStatusText}}</span>
			<span class="married" v-else>请选择</span>
		</mt-cell>
		<mt-actionsheet :actions="actions3" v-model="sheetVisible3"></mt-actionsheet>

		<mt-cell title="职业" is-link @click.native='sheetVisible4 = true'>
			<span class="career" v-if='getPersonInfo.professionText'>{{getPersonInfo.professionText}}</span>
			<span class="career" v-else>请选择</span>
		</mt-cell>
		<mt-actionsheet :actions="actions4" v-model="sheetVisible4"></mt-actionsheet>

		<mt-cell title="生活习惯" is-link @click.native='gettedHabitsFunc'>
			<span class="habits" v-if='getPersonInfo.dietHabits || getPersonInfo.smokingHabits || getPersonInfo.drinkingHabits || getPersonInfo.exerciseHabits'>已填选</span>
			<span class="habits" v-else>请选择</span>
		</mt-cell>

		<mt-cell title="居住地址" is-link @click.native='$router.push("/mybaseinfo_selectaddress")'>
			<span class="address" v-if='zbl_address.decText'>{{zbl_address.decText}}</span>
			<span class="address" v-else-if='getPersonInfo.provinceText'>{{getPersonInfo.provinceText + getPersonInfo.cityText + getPersonInfo.districtText + getPersonInfo.streetText}}</span>
			<span class="address" v-else>请选择</span>
		</mt-cell>
		<div class="tail"></div>
	</div>

</div>
</template>

<script>
import {
	Picker,MessageBox
} from 'mint-ui'
import {
	mapActions,
	mapState
} from 'vuex'
import {
	commonAjaxKy,
	commonAjax
} from '../../api/api.js'
import {
	zbl_commonPicker
} from '../../assets/js/zbl_commonPicker.js'
import axios from 'axios'
export default {
	data: function() {
		return {
			sheetVisible: false,
			sheetVisible2: false,
			sheetVisible3: false,
			sheetVisible4: false,
			pickerVisible: false,
			pickerVisible2: false,
			actions: [{
				'name': '男',
				'method': this.sexType
			}, {
				'name': '女',
				'method': this.sexType
			}],
			actions2: [{
				'name': 'A型',
				'method': this.bloodType
			}, {
				'name': 'B型',
				'method': this.bloodType
			}, {
				'name': 'O型',
				'method': this.bloodType
			}, {
				'name': 'AB型',
				'method': this.bloodType
			}, {
				'name': '未知血型',
				'method': this.bloodType
			}],
			actions3: [{
				'name': '未婚',
				'method': this.married
			}, {
				'name': '已婚',
				'method': this.married
			}],
			actions4: [{
				'name': '国家公务员',
				'method': this.career
			}, {
				'name': '专业技术人员',
				'method': this.career
			}, {
				'name': '职员',
				'method': this.career
			}, {
				'name': '企业管理人员',
				'method': this.career
			}, {
				'name': '工人',
				'method': this.career
			}, {
				'name': '农民',
				'method': this.career
			}, {
				'name': '学生',
				'method': this.career
			}, {
				'name': '现役军人',
				'method': this.career
			}, {
				'name': '自由职业者',
				'method': this.career
			}, {
				'name': '个体经营者',
				'method': this.career
			}, {
				'name': '无业人员',
				'method': this.career
			}, {
				'name': '退(离)休人员',
				'method': this.career
			}, {
				'name': '其他',
				'method': this.career
			}],
			getPersonInfo: {},
			zbl_personName: '',
			bloodCode: ['', 'A型', 'B型', 'O型', 'AB型', '', '', '', '', '未知血型'],
			professionDic: {
				'国家公务员': '11',
				'专业技术人员': '13',
				'职员': '17',
				'企业管理人员': '21',
				'工人': '24',
				'农民': '27',
				'学生': '31',
				'现役军人': '37',
				'自由职业者': '51',
				'个体经营者': '54',
				'无业人员': '70',
				'退(离)休人员': '80',
				'其他': '90'
			},
		}
	},
	computed: {
		...mapState({
			zbl_addFamilyPerInfo: state => state.zbl_addFamilyPerInfo,
			zbl_address: state => state.zbl_address,
			// zbl_userHabits: state => state.zbl_userHabits,
		})
	},
	methods: {
		//保存提交
		updateInfo() {
			let
				sexCode = '',
				birthDay = '',
				maritalStatus = '',
				height = '',
				weight = '',
				bloodType = '',
				profession = '',
				exerciseHabits = '',
				drinkingHabits = '',
				smokingHabits = '',
				dietHabits = '',
				defaultText = '请选择'
				if(Object.keys(this.zbl_userHabits).length) {
					exerciseHabits = this.zbl_userHabits.exerciseHabits
					drinkingHabits = this.zbl_userHabits.drinkingHabits
					smokingHabits = this.zbl_userHabits.smokingHabits
					dietHabits = this.zbl_userHabits.dietHabits
				}
			document.querySelector('.sexType').innerText === '男' ? sexCode = '1' : sexCode = '2'
			birthDay = document.querySelector('.birthDay').innerText
			height = document.querySelector('.height').innerText
			if(height === defaultText) {
				height = ''
			}
			weight = document.querySelector('.weight').innerText
			if(weight === defaultText) {
				weight = ''
			}
			if(document.querySelector('.bloodType').innerText === defaultText) {
				bloodType = ''
			} else {
				bloodType = this.bloodCode.indexOf(document.querySelector('.bloodType').innerText) + ''
			}
			if(document.querySelector('.married').innerText === defaultText) {
				maritalStatus = ''
			} else {
				document.querySelector('.married').innerText === '未婚' ? maritalStatus = '10' : maritalStatus = '20'
			}
			for (let prop in this.professionDic) {
				if (prop === document.querySelector('.career').innerText) {
					profession = this.professionDic[prop]
				}
			}

			let params = [{
				"address": this.zbl_address.addressDetail || this.getPersonInfo.address,
				"profession": profession || this.getPersonInfo.profession,
				"bloodType": bloodType,
				"exerciseHabits": exerciseHabits,
				"drinkingHabits": drinkingHabits,
				"certificate": {
					"certificateNo": this.getPersonInfo.certificate.certificateNo,
					"source": this.getPersonInfo.certificate.source,
					"certificateType": this.getPersonInfo.certificate.certificateType
				},
				"mpiId": this.getPersonInfo.mpiId,
				"dob": birthDay,
				"city": this.zbl_address.cityCode || this.getPersonInfo.city,
				"avatar": this.getPersonInfo.avatar,
				"height": height,
				"province": this.zbl_address.parentCode || this.getPersonInfo.province,
				"personName": this.zbl_personName,
				"weight": weight,
				"phoneNo": this.getPersonInfo.phoneNo,
				"street": this.zbl_address.streetKeyCode || this.getPersonInfo.street,
				"maritalStatus": maritalStatus,
				"smokingHabits": smokingHabits,
				"dietHabits": dietHabits,
				"district": this.zbl_address.regionCode || this.getPersonInfo.district,
				"sex": sexCode
			}]

			console.log(JSON.stringify(params))
			commonAjaxKy(JSON.stringify(params), 'hcn.person', 'saveSelfInfo').then(res => {
				if (res.code === 200) {
					MessageBox('提示', '保存成功').then(() => {
						this.$destroy(true)
						this.$router.push('/jia_person')
					})
				}
			})
		},
		//选择性别
		sexType(e) {
			document.querySelector('.sexType').innerText = e.name
		},
		bloodType(e) {
			document.querySelector('.bloodType').innerText = e.name
		},
		married(e) {
			document.querySelector('.married').innerText = e.name
		},
		career(e) {
			document.querySelector('.career').innerText = e.name
		},
		openPicker() {
			document.querySelector('.mint-datetime-picker').style.display = 'block'
			this.$refs.picker.open()
		},
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
		selectChoose(e) {
			if (e.currentTarget.classList.contains('height2')) {
				let slots = [],
					nameEle = document.querySelector('.height')
				for (let i = 130; i <= 230; i++) {
					let obj = {}
					obj.text = i + ''
					slots.push(obj)
				}
				zbl_commonPicker(nameEle, slots, '请选择身高')  //nameEle为填充内容的元素,slots为循环数组,最后一个参数为显示的title
			} else {
				let slots = [],
					nameEle = document.querySelector('.weight')
				for (let i = 20; i <= 150; i++) {
					let obj = {}
					obj.text = i + ''
					slots.push(obj)
				}
				zbl_commonPicker(nameEle, slots, '请选择体重')
			}
		},
		gettedHabitsFunc() {
			let obj = {}
			obj.dietHabits = this.getPersonInfo.dietHabits
			obj.smokingHabits = this.getPersonInfo.smokingHabits
			obj.drinkingHabits = this.getPersonInfo.drinkingHabits
			obj.exerciseHabits = this.getPersonInfo.exerciseHabits
			// this.zbl_userHabits(JSON.stringify(obj))
			sessionStorage.setItem('zbl_userHabits',JSON.stringify(obj))
			this.$router.push("/mybaseinfo_habits")
		},
		...mapActions(['zbl_selectAddress','zbl_userHabits'])
	},
	created() {
		// this.zbl_selectAddress({})
		let params = []
		commonAjaxKy(JSON.stringify(params), 'hcn.person', 'getSelfInfo').then(res => {
			if (res.code === 200) {
				this.getPersonInfo = res.body
				this.zbl_personName = this.getPersonInfo.personName
			}
		})
	},
	mounted() {
	},
	// beforeRouteEnter(to,from,next) {
	// 	if(from.path === '/jia_person') {
	// 		let params = []
	// 		commonAjaxKy(JSON.stringify(params), 'hcn.device', 'getAppInfoByDevice')
	// 			.then(res => {
	// 				if (res.code === 200) {
	// 					if (res.body.hasOwnProperty('user')) {
	// 						next()
	// 					} else {
	// 						next('/mybaseinfo2')
	// 					}
	// 				}
	// 			})
	// 	} else {
	// 		next()
	// 	}
	// },
	// deactivated() {  //强制刷新页面
    //   this.$destroy(true)
	// }
}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
.mint-header {
	height: 1rem;
	font-size: .4rem;
	background-color: #35B46F;
}
.body {
	.warnInfo {
		font-size: .25rem;
        background-color: #FFFAD0;
        color: #F79E30;
		text-align: center;
		padding: .2rem;
		// border-bottom: 1px solid #d9d9d9;
	}
	.sexType,.birthDay,.height,.weight,.address,.bloodType,.married,.career,.habits {
		color: #000;
	}
	.address {
		width: 4.5rem;
        text-align:right;
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
	}
	.pickerCont {
		position: relative;
		.cover {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.5;
			background: #000;
			z-index: 105;
		}
		.picker {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
	    	z-index: 120;
		}
		.btn {
			position: absolute;
			bottom: -22px;
			background-color: #fff;
			font-size: 25px;
			padding: 10px;
			width: 100%;
			border-bottom: 1px solid #ddd;
			text-align: center;
			z-index: 120;
			opacity: 1;
		}
	}
	.divide {
        height: 10px;
        background-color: #F2F2F2;
    }
	.tail {
		height: 20px;
		background-color: #F2F2F2;
	}
	.mint-popup-bottom {
		top:60%;
		right: 0;
	}
	.marginRight {
		margin-right:25px;
	}
}

</style>

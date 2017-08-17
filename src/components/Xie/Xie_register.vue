<template>
<div class="header_group">
	<!--头部注册-->
	<div class="header_top">
		<img @click='$router.push("/xie_homepage")' class="header_icon" src="../../assets/img/xie_go_1.png">
		<div class="header_center">
			<div class="header_img">
				<img src="../../assets/img/1024.png" />
			</div>
			<span>注册</span>
		</div>
	</div>
	<!--中间form-->
	<div class="Nosubmint">
		<mt-field label="手机号" placeholder="请输入您的手机号" type="tel" v-model="phone"></mt-field>
		<mt-field label="验证码" v-model="captcha">
			<b v-show="!isshow" @click="getcaptcha()">获取验证码</b>
			<b v-show="isshow">{{time}}s</b>
		</mt-field>
		<mt-field label="密码" placeholder="6-20位数字、字母或字符" type="password" v-model="password">

		</mt-field>
	</div>
	<mt-button size="large" @click="succ" style="background:#35B46F;margin-top: .3rem;">注册</mt-button>
</div>
</template>

<script>
var md5 = require("md5");
import {
	commonAjax,
	commonAjaxKy,
	residentRegister
} from '../../api/api';
import {
	MessageBox
} from 'mint-ui';
export default {
	components: {

	},
	data() {
		return {
			phone: '',
			errshow: false,
			yanzm: '',
			phones: '',
			isshow: '',
			time: 60,
			captcha: '',
			password: '',
			isshow1: '',
		}

	},
	computed: {

	},
	methods: {
		getcaptcha() {
			//验证手机格式是否正确
			if (/^1[34578]\d{9}$/.test(this.phone)) {
				this.getyanzm()
			} else {
				MessageBox('提示', '手机号输入错误');

			}
		},
		getyanzm() {
			this.getIdentifyingCode()
			this.isshow = !this.isshowl
			let timeOut = setInterval(() => {
				let that = this
				if (that.time === 0) {
					clearInterval(timeOut);
					that.isshow = !that.isshow;
					that.time = 60;
				}
				this.time--
			}, 1000)
		},
		//		获取验证码
		getIdentifyingCode() {
			let params = ["hcn.shenzhen", "patient", this.phone, "register"]
			residentRegister(JSON.stringify(params), 'hcn.smsService', 'getIdentifyingCode').then(res => {
				console.log(res);
				if (res.code == 200) {
					//  console.log(res.body)
				} else if (res.code == 603) {
					MessageBox('提示', '当前用户已注册');
				} else if (res.code == 606) {
					MessageBox('提示', '1分钟内不允许重新获得验证码');
				}
			})

		},
		//      设置密码

		registerPatientWithInviteCode() {
			let params = ["hcn.shenzhen", this.phone, md5(this.password), this.captcha, ""]
			residentRegister(JSON.stringify(params), 'hcn.register', 'registerPatientWithInviteCode').then(res => {
				if (res.code == 200) {
					this.$router.push('/xie_homepage')
				} else {
					MessageBox('提示', res.msg);
				}
			})
		},
		//点击注册
		succ() {
			if (/^[\w.]{6,20}$/.test(this.password)) {
				this.registerPatientWithInviteCode()
			} else {
				MessageBox('提示', "密码由6-20位数字英文字母组成")
			}

		},
		changge() {
			if (this.isshow1 == false) {
				this.isshow1 = true
				this.$refs.changeimg.type = "text"

			} else {
				this.isshow1 = false
				this.$refs.changeimg.type = "password"
			}

		},

	},

	mounted() {

	},

}
</script>

<style scoped>
.header_group {
	/*text-align: center;*/
}

.header_top {
	height: 2rem;
	line-height: 2rem;
	background: #5EC671;
	text-align: center;
}

.header_top img {
	width: .5rem;
	height: .5rem;
	margin-top: .2rem;
	margin-left: .1rem;
}

.header_icon {
	height: .8rem;
	width: .8rem;
	float: left;
}

.header_center img {
	height: .7rem;
	width: .7rem;
	margin-top: .5rem;
	float: left;
	margin-left: 1rem;
}

.header_center {
	font-size: .3rem;
	height: 2rem;
	width: 2rem;
	float: left;
	margin-left: 1.8rem;
	text-align: center;
}

.header_center span {
	width: 1rem;
	height: .6rem;
	font-size: .3rem;
	float: left;
	position: absolute;
	top: .5rem;
	left: 3.2rem;
	color: #fff;
}

.header_img {
	position: relative;
}


/*验证码*/

.mint-field-other b {
	/*color: #5EC671;*/
	color: #fff;
	background: #FFB02D;
	padding: .1rem .2rem;
	border-radius: .1rem
}

.Nosubmint {
	margin-top: 0.3rem;
}
</style>

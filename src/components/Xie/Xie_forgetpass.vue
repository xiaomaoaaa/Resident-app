<template>
	<div class="header-grop">
		<mt-header title="忘记密码" style="background: #FFFFFF;font-size: 0.3rem;color: #000000;">
			  <router-link to="/xie_homepage" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
		</mt-header>
			<div class="Nosubmint">
			<div class="sjh">手机号</div>
			<div class="box_yam">
				<input type="text" placeholder="请输入手机号" v-model="phones"/>
				<div class="geiyzm">
					<b v-show="!isshow" @click="getyanzm1">获取验证码</b>
					<b v-show="isshow">{{time}}s</b>
				</div>
			</div>
			<div class="yzm">验证码</div>
			<input class="getyzm" type="text" placeholder="请输入验证码" v-model="yanzm">
			<div class="for_button" >
				<!--<button>dian</button>-->
					<mt-button type="primary" size="large" @click.native='login1' style="background: #5EC671;">下一步</mt-button>

			</div>
		</div>
		<div class="foote">
					<div class="error" v-if="errshow">{{error}}</div>
		</div>

	</div>
</template>
<script>
import { commonAjax }
from '../../api/api';
import {MessageBox }from 'mint-ui';
export default {

    components: {

    },
    data() {
        return {
			error:'',
			errshow:false,
			yanzm:'',
			phones:'',
			isshow:'',
			time:60,
        }

    },
    computed: {

    },
    methods: {
		login1(){
  		//非空可登录
  		if(this.phones!=''&&this.yanzm!=''){
			this.checkPhone();

  		//用户名为空
  		}else if(this.phones.length==0){
  			MessageBox('提示', '手机号不能为空');

  		//密码为空
	  		}else if(this.yanzm.length==0){
	  			MessageBox('提示', '验证码不能为空');
  			}
  		},
  		checkPhone(){
		    let phone = this.phones
		  	let yanzm1=this.yanzm
		  	//验证手机格式是否正确
		    if(/^1[34578]\d{9}$/.test(phone)){
				if(/^\d{6}$/.test(yanzm1)){
					this.Passwordvalid()

				}else{
					MessageBox('提示', '验证码必须是6位数字');

				}

		    }else{
		    	MessageBox('提示', '手机号输入错误');

		    		}
		},

		getyanzm1(){
			let phone = this.phones
			let yanzm=this.yanzm
		  	//验证手机格式是否正确
		    if(/^1[34578]\d{9}$/.test(phone)){
					this.getyanzm()

			}else{
				MessageBox('提示', '手机号输入错误');

				}
		},
		getyanzm(){

			this.getPassword()
			this.isshow=!this.isshow
			let timeOut= setInterval(()=>{
				let that=this
				if(that.time===0){
					clearInterval(timeOut);
					that.isshow=!that.isshow;
					that.time=60;
				}
				this.time--
			},1000)
		},
//		18672992712
		getPassword() {
                let params = ["hcn.shenzhen","patient",this.phones,"pwd"]
//              let params= ["hcn.shenzhen","patient","13570038205","pwd"]
                commonAjax(params, 'hcn.smsService', 'getIdentifyingCode').then(res => {
                     if (res.code == 200) {
                    //  console.log(res.body)

                    }else{
                    	MessageBox('提示', '当前用户未注册');

                    }
                })

            },
        Passwordvalid() {
                let params = [this.phones,this.yanzm]
                commonAjax(params, 'hcn.smsService', 'validateCode').then(res => {
                     if (res.code == 200) {
                     	sessionStorage.setItem("xie_username",this.phones);
						this.$router.push('xie_homepage_child')
						
                    }else {
                    	MessageBox('提示', '验证码输入错误');

                    }
                })

            },
    },
    mounted() {
//  	this.getPassword()
//  	this. Passwordvalid()
    },
}
</script>
<style scoped>
	.sjh{
		margin-top: 2rem;
		font-size: 0.4rem;
		color:#22B2F5;
		color: black;
	}
	.yzm{
		font-size: 0.4rem;
		margin-top:0.3rem;
		color:black;

	}
	.Nosubmint{margin:2.3rem 10% 0 10%;}
	.box_yam {
		border-bottom: 1px solid rgba(0,0,0,.3);
		height: 1.2rem;
	}
	.box_yam input{
	font-size: 0.3rem;
	border: none;
	outline: none;
	width: 60%;
	height: 0.6rem;

	}
	.getyzm{
		font-size: 0.3rem;
		border: none;
		outline: none;
		width: 100%;
		height: 0.6rem;
		border-bottom:1px solid rgba(0,0,0,.3);
	}
	.for_button{
		margin-top:0.5rem
	}
	.foote{
	width: 50%;
	background: #ECECEC;
	text-align: center;
	/*padding:0.2rem;*/
	border-radius: 0.2rem;
	margin-left: 1.6rem;
	/*border: 1px solid red;*/
}
.foote .error{
	font-size: 0.2rem;
	padding:0.2rem;

}
.geiyzm{
	font-size: 0.3rem;
	background: #5EC671;
	padding: 0.15rem;
	width: 35%;
	float: right;
	color: #fff;
	border-radius: 0.1rem;
	margin-top: 0.5rem;
	text-align: center;
}
.geiyzm span{
	-webkit-padding-before: 0.2rem;
}
</style>

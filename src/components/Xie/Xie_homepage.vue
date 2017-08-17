<template>
	<div class="header_grop">
		<div class="home_header">
			<img src="../../assets/img/1024.png" />
			<div class="xie_zc" @click='$router.push("/xie_register")'>注册</div>
		</div>
		<div class="home_input">
			<div class="phone">
				<div class="home_phone">
					<img  class="user" src="../../assets/img/xie_uesrname.png"  />
					<input  type="username" placeholder="请输入手机号" v-model="vall">
					<img @click="empty" class="home_delete" src="../../assets/img/xie_delete.png" >
				</div>
				<div class="home_pwd" @keydown.enter = "login1()">
					<img class="user" src="../../assets/img/xie_password.png"  />
					<input type="password" placeholder="请输入密码" v-model="valpwd" ref="pass">


					<div @click="valp" class="home_delete" v-show="isshow" >
						<img src="../../assets/img/xie_express.png">
					</div>
					<div @click="valp" class="home_delete" v-show="!isshow">
						<img  src="../../assets/img/xie_the_dark.png" >
					</div>


				</div>
				<div class="home_button" @click="login1">
					<mt-button type="primary" size="large" style="background: #5EC671;">登&nbsp&nbsp录</mt-button>
				</div>
				<router-link to="/xie_forgetpass">
					<div class="home_nopwd">忘记密码</div>
				</router-link>


			</div>
		</div>
	</div>
</template>
<script>
var md5 = require("md5");
import { Header } from 'mint-ui';
import { requestLoginon1 }
from '../../api/api';
import {   Indicator,Button,MessageBox }from 'mint-ui';
	import { commonAjaxKy} from '../../api/api'
export default {
    components: {

    },
    data() {
        return {
			vall:localStorage.getItem("loginName") ? localStorage.getItem("loginName") :'',
			valpwd:localStorage.getItem("password") ? localStorage.getItem("password") :'',
			username:'',
			password:'',
			isshow:'',
			type:'',
			autoLoginFlag:localStorage.getItem("autoLoginFlag")
        }

    },
    computed: {

    },
    methods: {
		empty(){
			this.vall='';

		},
		valp(){
			if(this.isshow==false){
				this.isshow=true;
				this.$refs.pass.type='text'
				// console.log(this.$refs.pass.type)

			}else{
				this.isshow=false;
				this.$refs.pass.type='password'
			}

		},
	login1(){
  		//非空可登录
  		if(this.vall!='' && this.valpwd!=''){
  			this.checkPhone();

  		//用户名为空
  		}else if(this.vall.length==0){
  			MessageBox('提示', '手机号不能为空');
  		//密码为空
  		}else if(this.valpwd.length==0){
  			MessageBox('提示', '密码不能为空');
  		}
  	},

		login() {
			// console.log(this.vall);
			// console.log(this.valpwd);
			let password = this.valpwd;//未加密密码
                let params = {
                    "loginName": this.vall,
                    "pwd": md5(this.valpwd),//需要MD5加密
                    "rid":"patient",
                   	"forAccessToken":true,
                    "tenantId": "hcn.shenzhen",
                };
//			let params={"loginName":"13570038205","pwd":"e10adc3949ba59abbe56e057f20f883e","rid":"patient","forAccessToken":true,"tenantId":"hcn.shenzhen"}
                if (params.loginName != "" && params.pwd != "") {
                	Indicator.open('加载中...')
                    requestLoginon1(JSON.stringify(params)).then(res => {
                    	// console.log(res)
                        if (res.code == 200) {

                            sessionStorage.setItem('userInfo', JSON.stringify(res));
                            localStorage.setItem("loginName",this.vall);
							localStorage.setItem("password",password);
							localStorage.setItem("autoLoginFlag",1);
                            this.$router.push('xie_home')
							console.log(res.body)

                        } else {
                        	if(res.msg=="PasswordNotRight"){
                        		MessageBox('提示', '密码错误');
                        	}else {
                        		MessageBox('提示', '用户不存在');
                        	}
                        }
                       Indicator.close();
                    })
                } else {
					MessageBox('提示', '用户名密码错误');

                }
            },

		checkPhone(){
    let phone = this.vall
    if(/^1[34578]\d{9}$/.test(phone)){
      	this.login();
    }else{
    	MessageBox('提示', '请输入正确的手机号');

    		}
		}
    },
    mounted() {

    },
    created() {
		if(this.vall!='' && this.valpwd!='' && this.autoLoginFlag !=0){
  			this.login();
  		}
    }

}
</script>
<style scoped>
.header_grop{
	height: 100%;
	width: 100%
}
.home_header{
	height: 6rem;
	width: 100%;
	background: #5EC671;
	text-align: center;
}
.home_header img{
	width: 2rem;
	height: 2.1rem;
	padding-top: 1rem;
}
.home_input{
	position: absolute;
	top:3.5rem;
	left: .65rem;
	width: 80%;
	height: 5rem;
	border-radius: 0.2rem;
	background: #fff;
	font-size:0.3rem;
}
.home_button{
	width: 80%;
	margin-left: 10%;
	margin-top: 10%;
	height:0.8rem;
}
.home_phone{
	margin-top: 10%;
	width: 80%;
	margin-left: 10%;
	height:1.0rem;
	border: 1px solid #ECECEC;
	text-align: center;
}
.user,.home_delete{
	width:10%;
	height: 0.5rem;
	float: left;
	padding-top: 0.25rem;
	margin-left: 0.15rem;

}
.home_delete img{
	height: 0.5rem;
}
.home_phone input,.home_pwd input{
	width: 68%;
	height: .6rem;
	float: left;
	margin-left: 0.2rem;
	margin-top: 0.2rem;
	border: none;
	outline: none;
}
.home_pwd{
	width: 80%;
	margin-left: 10%;
	margin-top: 5%;
	height:1rem;
	border: 1px solid #ECECEC;
}
.home_nopwd{
	font-size: 0.3rem;
	margin-top: 0.3rem;
	margin-left: 70%;
}
.xie_zc{
	font-size: 0.3rem;
	float: right;
	color: #fff;
	position: absolute;
	top: 0.5rem;
	right: 0.3rem;
	/*padding-right: 0.5rem;
	padding-top: 0.5rem;*/
}
a:hover{color: #B7B7B7}
a:link {color: #B7B7B7}
a:visited{color: #B7B7B7}
</style>

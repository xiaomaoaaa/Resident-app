<template>
	<div class="bmi">
		<mt-header fixed title="医院详情">
		  <a @click='$router.push("/zy_service")' slot="left">
		    <mt-button icon="back"></mt-button>
		  </a>
		</mt-header>  
		
		<div class="content">
			<div class="sex">
				<span>性别</span> 
				<mt-switch v-model="value"><span class="msex1" v-show="shownv">女</span><span class="msex2" v-show="nanshow">男</span></mt-switch>
			</div>
			<mt-field label="体重(kg)" placeholder="请输入" v-model="weight"></mt-field>
			<mt-field label="身高(cm)" placeholder="请输入" v-model="height "></mt-field>
		</div>
		
		<mt-button size="large" @click="makesure">确定</mt-button>
	</div>		
</template>

<script>
import {
    commonAjax, requestConfirmPassword,dicAjax,imgUrl
}
from '../../api/api';
import '../../assets/css/li_style.css'
import { Navbar,TabItem,Header,Indicator,Toast,Switch } from 'mint-ui';	
export default {
    data: function() {
        return {
        	list: '',
        	weight: '',
        	height: '',
			shownv:false,
			nanshow:true,
			value:"",
			sex:""
        }	
    },
    //请求数据
   methods: {
       makesure(){
		   if(this.weight==""||this.height==""){
			   Toast('请完善信息');
		   }else{
			   sessionStorage.setItem("sgtzsex",JSON.stringify({"weight":this.weight,"height":this.height,"sex":this.sex}))
			   this.$router.push("/bmidetection")
		   }  		
       }
   },
   mounted() {
		this.value=true;
   },
   watch:{
	    value(curVal,oldVal){
		   if(curVal){
			   this.shownv=true;
			   this.nanshow=false;
			   this.sex="女"
		   }else{
			   this.shownv=false;
			   this.nanshow=true;
			   this.sex="男"
		   }
	   }
   }
}
</script>

<style scoped>
.bmi .content{
	margin-top: 1rem;
	padding: 0.2rem;
	background: #fff;
	margin-bottom: 1rem;
}
.bmi .content .sex{
	font-size: 0.33rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 1rem;
	padding: 0 0.2rem;
}
.bmi .content .sex span{
	color: #888;
}
.bmi .content .sex .msex1{
	position:absolute;
	left:.1rem;
	top:.1rem;
	color:#fff;
}
.bmi .content .sex .msex2{
	position:absolute;
	left:1.2rem;
	top:.1rem;
	color:#fff;
}

</style>
<template>
	<div class="li_Repoer_Advanced_query">
	    <mt-header title="高级查询">
		  <router-link to="/Reportone" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">实时报告查询</mt-tab-item>
		  <mt-tab-item id="2">历史批量查询</mt-tab-item>
		</mt-navbar>
		
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div class="content">
		  		<mt-cell title="医院名称" value="请选择医院" is-link to="/mmap"></mt-cell>
			   	<mt-cell title="报告类型" value="请选择报告类型" is-link to="//github.com"></mt-cell>
			   	<!--<mt-cell title="姓名" value="请输入姓名"></mt-cell>-->
			    <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
			    <div class="bar_code">
			    	<span>条形码</span>
			    	<span class="input">请输入或扫描条形码
			    		<img src="../../../assets/img/li_erweima.png"/>
			    	</span>
			    </div>
		  	</div>
		  	<mt-button  type="danger" size="large">查询</mt-button>
		  </mt-tab-container-item>
		  		
		  <mt-tab-container-item id="2">
		   		<div class="top">
		   			仅查询本人的历史报告，需帮他人查请点击实时查询
		   		</div>
		   		<mt-cell title="医院名称(可选)" value="所有医院" is-link to="//github.com"></mt-cell>
		   		<div class="Range">
		   			<div class="small fl"></div>
		   			<div class="big fl">请检查时间范围</div>
		   		</div>
		   		
		   		<ul class="time" >
		   			<li :class="{active:index==isActive}"  v-for="(item, index) in list" @click="changeClass(index)">
		   				{{item.select}}
		   			</li>
		   		</ul>
		   		<div class="surface" v-show="current">
		   			<span @click="openPicker">2017-08-03</span>
		   			<img src="../../../assets/img/li_surface.png"/>
		   			<span @click="openPicker">2017-08-03</span>
		   		</div>
		   		<mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm"></mt-datetime-picker>
		   		
		   		<mt-button  type="danger" size="large">提交</mt-button>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import { Cell,MessageBox,Toast,Header,Navbar,TabItem,DatetimePicker} from 'mint-ui';
import { commonAjaxKy } from "../../../api/api.js";
import "../../../assets/css/mao_style.css";
var imgUrl1=require("../../../assets/img/mao_jcxm.png")
var imgUrl2=require("../../../assets/img/mao_jybg.png")
    export default {
        data:function(){
            return{
            	isActive:-1,
                selected: '1',
                current: false,
                list:[
　　　　　　　　　　{index:0,select:'今天'},
　　　　　　　　　　{index:1,select:'本周'},
　　　　　　　　　　{index:2,select:'本月'},
　　　　　　　　　　{index:3,select:'今年'},
				  {index:4,select:'自定义'},
　　　　　　　　	],
				time: '',
				username: '',
				ifshow: true,
				pickerValue: new Date("January 12,2006 22:19:35"),
				mao_baocuntime: '2017-07-17',
				
            }
        },
        methods: {
        	//点击显示
	　　　　changeClass(index){
			 this.isActive=index;
			 console.log(index)
			 if (index === 4) {
			 	this.current = true
			 }else{
			 	this.current = false
			 }
		   },
		   
		   //日期选择
			openPicker() {          
				this.$refs.picker.open();
				//this.ifshow = false 
			},
			
			handleConfirm(value) {
				this.mao_baocuntime = value.toLocaleString().slice(0, 9).split('/').join('-')
			}
	　　},

        
        mounted:function(){
			
        },

    }
</script>

<style scoped>
    .li_Repoer_Advanced_query .content{
    	margin-top: 0.3rem;
    	border-top: 0.5px solid #ccc;
    	border-bottom: 0.5px solid #ccc;
    }
    .li_Repoer_Advanced_query .top{
    	height: 0.6rem;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	font-size: 0.28rem;
    	background: #FFFBCE;
    	color: #DFB469;
    }
    .li_Repoer_Advanced_query .Range{
    	height: 1.12rem;
    	font-size: 0.33rem;
    	border-top: 0.5px solid #ccc;
    	border-bottom: 0.5px solid #ccc;
    	display: flex;
    	justify-content: flex-start;
    	align-items: center;
    }
    .li_Repoer_Advanced_query .small{
    	height: 0.6rem;
    	width: 0.2rem;
    	background: #35B46F;
    	margin-right: 0.2rem;
    }
    .li_Repoer_Advanced_query .big{
    	color: #888;
    }
    .li_Repoer_Advanced_query .time{
    	margin: 0 0.4rem;
    	display: flex;
    	font-size: 0.33rem;
    	flex-wrap: wrap;
    }
    .li_Repoer_Advanced_query .time li{
    	flex-wrap: wrap;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	background: #E6E6E6;
    	width: 1.9rem;
    	height: 0.8rem;
    	border-radius: 10px;
    	margin: 0.2rem 0.15rem;
    	color: #fff;
    }
    /*.li_Repoer_Advanced_query .time li:hover{
    	background: #FDB12A;
    }*/
    .li_Repoer_Advanced_query .bar_code{
    	margin-left: 0.2rem;
    	padding-right: 0.2rem;
    	font-size: 0.33rem;
    	height: 1.12rem;
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	border-top: 0.5px solid #ccc;
    }
    .li_Repoer_Advanced_query .bar_code .input{
    	color: #888;
    	direction: right;
    	display: flex;
    	align-items: center;
    }
    .li_Repoer_Advanced_query .bar_code img{
    	width: 0.712rem;
    	height: 0.712rem;
    	margin-left: 0.3rem;
    }
    .li_Repoer_Advanced_query .surface{
    	font-size: 0.33rem;
    	margin-top: 0.4rem;
    	margin-bottom: 0.4rem;
    	display: flex;
    	justify-content: space-between;
    }
    .li_Repoer_Advanced_query .surface span{
    	flex: 1;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	border-bottom: 1px solid #ccc;
    	margin: 0 0.4rem;
    	color: #35B46F;
    }
    .li_Repoer_Advanced_query .surface img{
    	height: 0.5rem;
    	width: 0.5rem;
    }
	.li_Repoer_Advanced_query .time li.active{
		background: #FDB12A;
	}
	html,body{
		display: block;
	}
</style>

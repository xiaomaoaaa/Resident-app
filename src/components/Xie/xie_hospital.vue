<template>
	<div class="yndh">
		<!--头部-->
		<mt-header title="医院主页" style="background:#34B26E;color:#fff">
			  <router-link to="/xie_mydoc" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
		</mt-header>
		<div class="content">
			<div class="content_top">
				{{list.fullName}}
			</div>
			<div class="content_center">
				<span>{{level_value}}</span>
				<em>{{nature_value}}</em>
			</div>
			<div class="content_bottom">
				<div class="Stars ">
					<img src="../../assets/img/li_wjx.png"/>
					<img src="../../assets/img/li_wjx.png"/>
					<img src="../../assets/img/li_wjx.png"/>
					<img src="../../assets/img/li_wjx.png"/>
					<img src="../../assets/img/li_wjxx.png"/>
				</div>
				<router-link :to="'/lsw_wypj?orgName='+list.fullName">
					<div class="evaluate">
						我要评价
					</div>
				</router-link>
			</div>
		</div>
		
		<div class="margin"></div>
		
		<div class="location">
			<mt-cell :title="list.address" to="/mmap" is-link>
			  <img slot="icon" src="../../assets/img/xie_map.png">
			</mt-cell>
		</div>
		
		<div class="bottom">
			<ul>
				<li v-for='(item,index) in listobj' @click="sendsave(item)">{{item.name}}</li>
			</ul>
		</div>
		
		<!--<div class="margin"></div>-->
	</div>
</template>

<script>
import {
    commonAjax, requestConfirmPassword,dicAjax,imgUrl,commonAjaxKy
}
from '../../api/api';
import { Navbar,TabItem,Header,Indicator,Toast} from 'mint-ui';
var imgUrlid=require("../../assets/img/li_Resident.png")
export default {
    data: function() {
        return {
        	list: '',
        	listobj:'',
        	natureDic: {
				"综合医院": '01',
				"体检中心": '02',
				"妇幼保健院": '03',
				"妇产(科)医院": '04',
				"儿童医院": '05',
				"肿瘤医院": '06',
				"心血管病医院": '07',
				"胸科医院": '08',
				"口腔医院": '09',
				"眼科医院": '10',
				"耳鼻喉科医院": '11',
				"血液病医院": '12',
				"精神病医院": '13',
				"传染病医院": '14',
				"皮肤病医院": '15',
				"结核病医院": '16',
				"麻风病医院": '17',
				"职业病医院": '18',
				"骨科医院": '19',
				"康复医院": '20',
				"整形美容": '21',
			},
			levelDic: {
				"一级": '10',
				"一甲": '11',
				"一乙": '12',
				"一丙": '13',
				"二级": '20',
				"二甲": '21',
				"二乙": '22',
				"二丙": '23',
				"三级": '30',
				"三特": '31',
				"三甲": '32',
				"三乙": '33',
				"三丙": '34',
			},
			nature_value: '',
			level_value: '',
        }
    },
    //请求数据
    methods: {
        Hospital_details() {
        		Indicator.open('加载中...');
                let params = ["e6e3fb82-7868-4614-95eb-345ec0bb1c01"]
                commonAjax(params, 'hcn.easyDoctor', 'getHospitalDetail').then(res => {
                    if (res.code == 200) {
	                  	this.list = res.body
	                  	//获取字典值等级和医院
	                  	let nature = res.body.nature
	                  	let level = res.body.level
	                  	for (var i in this.natureDic) {
	                  		//console.log(this.natureDic[i])
	                  		//console.log(i)
	                  		if (this.natureDic[i] ==  nature) {
	                  			this.nature_value = i
	                  		}
	            
	                  	}
	                  	for (var i in this.levelDic) {
	                  		if (this.levelDic[i] ==  level) {
	                  			this.level_value = i
	                  		}
	            
	                  	}
	                
	                  	Indicator.close();
                    }
                })

            },
            
			getDeptList(){
				let params = ["e6e3fb82-7868-4614-95eb-345ec0bb1c01"]
				commonAjax(JSON.stringify(params),'hcn.department','getDeptList').then(res=>{
					if(res.code==200){
						console.log(res.body)
						this.listobj = res.body
					}
				})
			},
        //点击跳到评价界面
        submit(){
        	this.$router.push("/")
        },
        sendsave(item){
			this.$store.dispatch('xie_sendsave',{"deptId":item.deptId,"userName":item.orgId})
			this.$router.push('/zy_departDoctorInfo')
        }

   },
   mounted() {
		this.Hospital_details()
		this.getDeptList()
   },
  
}
</script>


<style scoped>	
.yndh{
	width:100%;
    height: 100%;
    background:#eee;
    position: absolute;
}
.yndh .content{
	font-size: 0.33rem;
	padding-left: 0.3rem;
	padding-right: 0.2rem;
	background: #fff;
}
.yndh .content_top{
	height: 0.8rem;
	line-height: 0.8rem;
	color: #35B46F;
}
.yndh .content_center{
	font-size: 0.28rem;
}
.yndh .content_center span{
	color: #E59932;
	margin-right: 0.5rem;
}
.yndh .content_center em{
	color: #888;
}
.yndh .content_bottom img{
	width: 0.5rem;
	height: 0.5rem;
}
.yndh .content_bottom{
	height: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.yndh .content_bottom .evaluate{
	height: 0.5rem;
	width: 2rem;
	background: #F39D12;
	color: #fff;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.yndh .margin{
	height: 0.2rem;
	width: 100%;
	background: #EEE;
}
.yndh .contact{
	font-size: 0.33rem;
}
.location img{
	width:.5rem;
	height: .5rem;
}
li{
	width:40%;
	float: left;
	font-size: .35rem;
	color:#34B26E;
	text-align: center;
	height: 1rem;
	line-height: 1rem;
	border: 1px solid #34B26E;
	margin-left: 6%;
	margin-top: .3rem;
}

</style>

<template>
	<div class="yndh">
		<!--头部-->
		<mt-header fixed title="院内导航">
		  <a @click='$router.go(-1)' slot="left">
		    <mt-button icon="back"></mt-button>
		</a>
		  <!--<mt-button slot="right">
		  	<img class="img1" src="../../assets/img/li_tinajia.png"/>
		  </mt-button>-->
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
				<div class="scoreToStar">
				    <i class="icon-star-full lightdown" v-for='(item,index) in starItems' ref='starItems'></i>
				</div>
				<div class="evaluate" >
					<router-link :to="{name:'score_fullName',query:{'orgName': list.fullName}}">
					我要评价
					</router-link>
				</div>
			</div>
		</div>
		
		<div class="margin">
			
		</div>
		
		<div class="location">
			<mt-cell :title="list.address" to="/li_Wypj.vue" is-link>
			  <img slot="icon" src="../../assets/img/li_location.png">
			</mt-cell>
		</div>
		
	</div>
</template>

<script>
import {
    commonAjax, requestConfirmPassword,dicAjax,imgUrl,commonAjaxKy
}
from '../../api/api';
import '../../assets/css/li_style.css'
import { Navbar,TabItem,Header,Indicator,Toast} from 'mint-ui';
var imgUrlid=require("../../assets/img/li_Resident.png")
export default {
    data: function() {
        return {
        	list: '',
        	starItems: ['', '', '', '', ''],
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
			score: '',
        }
    },
    //请求数据
    methods: {
        Hospital_details() {
        		Indicator.open('加载中...');
                let params = [sessionStorage.getItem("orgId")]
                commonAjax(params, 'hcn.easyDoctor', 'getHospitalDetail').then(res => {
                    if (res.code == 200) {
                    	console.log(res)
	                  	this.list = res.body
	                  	//获取星星
	                  	this.score = res.body.avglevel
	                  	this.scoreToStar(this.score)
	                  	console.log(this.score)
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
       
        scoreToStar(score) {
            if (score > 4.5 || score==0 || !score) {
                this.starFunc(5)
            } else if (score > 3.5 && score <= 4.5) {
                this.starFunc(4)
            } else if (score > 2.5 && score <= 3.5) {
                this.starFunc(3)
            } else if (score > 1.5 && score <= 2.5) {
                this.starFunc(2)
            } else if (score > 0.5 && score <= 1.5) {
                this.starFunc(1)
            } 
            
        },
        starFunc(num) {
            let starItems = this.$refs.starItems
            for (var i = 0; i < num; i++) {
                starItems[i].classList.add('lighton')
            }
        },
            

   },
   mounted() {
		this.Hospital_details()

		//获取医生ID和orgid
		console.log(sessionStorage.getItem("orgId"))
		let params = []
			commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'getHomePageData')
				.then(res => {
					if(res.code === 200) {
						console.log(res.body)
						console.log(res.body.doctor)
						for (var i=0;i<res.body.doctor.length;i++) {
							 //console.log(res.body.doctor[i].doctorId)
							 sessionStorage.setItem("doctorId",res.body.doctor[i].doctorId)
						}
					}
				})
   },
   
}
</script>


<style scoped>	
.yndh{
	
}
.yndh .content{
	margin-top: 1rem;
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
.yndh .content_bottom .evaluate a{
	color: #fff;
}
.yndh .margin{
	height: 0.2rem;
	width: 100%;
	background: #EEE;
}

.scoreToStar .lightdown {
    color: #ccc;
}

.scoreToStar .lighton {
    color: #fc0;
}

@font-face {
    font-family: 'icomoon';
    src: url('../../assets/font/star.ttf');
    font-weight: normal;
    font-style: normal;
}

[class^="icon-"],
[class*=" icon-"] {
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    letter-spacing: 0;
    -webkit-font-feature-settings: "liga";
    -moz-font-feature-settings: "liga=1";
    -moz-font-feature-settings: "liga";
    -ms-font-feature-settings: "liga" 1;
    font-feature-settings: "liga";
    -webkit-font-variant-ligatures: discretionary-ligatures;
    font-variant-ligatures: discretionary-ligatures;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-star-full:after {
    content: "\e9d9";
    font-size: 20px;
    margin-right: 5px;
}
</style>

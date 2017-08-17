<template>
	<div class="header_grop">
		<mt-header title="医院主页" style="background:#34B26E;color:#fff">
			 <a slot="left" @click='$router.push("/zy_personal_doctor")'>
				<mt-button icon="back"></mt-button>
			</a>
		</mt-header>
		<div class="box_img">
				<mt-swipe :auto="3000" style="height:2.5rem" >
					  <mt-swipe-item><img src="../../assets/img/xie_banner1.png" alt="" /></mt-swipe-item>
					  <mt-swipe-item><img src="../../assets/img/xie_banner1.png" alt="" /></mt-swipe-item>
					  <mt-swipe-item><img src="../../assets/img/xie_banner1.png" alt="" /></mt-swipe-item>
				</mt-swipe>
		</div>
		<div class="xie_center">
			<div class="top">
				<span class="span1">{{listone.fullName}}</span>
				<span class="span2">一级</span>
				<span class="span3">综合医院</span>
				<div class="xie_center_img">
					<img @click="good()" v-show = "isshow" src="../../assets/img/xie_shouchan.png" >
					<img @click="nogood()" v-show = "isshow1" src="../../assets/img/xie_shouchan1.png" >
				</div>
			</div>
			<router-link to="/mmap">
				<div class="xie_map" >
					<img class="img1" src="../../assets/img/xie_map.png">
					<div>
						{{listone.address}}
					</div>
					<img class="img2" src="../../assets/img/xie_goright.png">
				</div>
			</router-link>
			<div class="center">
				<div class="box1">
						<router-link to="/lsw_yyxq">
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_doc_yyjs.png">
								</dt>
								<dd>医院介绍</dd>
							</dl>
						</dt>
						</router-link>
				</div>
				<div class="box2">
						<router-link to="/xie_hospital">
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_doc_srys.png">
								</dt>
								<dd>科室医生</dd>
							</dl>
						</dt>
						</router-link>
				</div><div class="box3">
						<router-link to="/lsw_yndh">
						<dt>
							<dl>
								<dt>
									<img src="../../assets/img/xie_doc_yndh.png">
								</dt>
								<dd>院内导航</dd>
							</dl>
						</dt>
						</router-link>
				</div>
			</div>
			<div class="xie_height"></div>
			<div class="fuwu">
				<div class="xie_fuwu">医院服务</div>
			</div>
			<ul>
				<!--send为以后做页面留着-->
					<li class="li_box" v-for="(item,index) in list" @click="send(item)">
						<img :src="item.xie_img" >
						<div class="xie_jtgl">
							<p>{{item.serviceName}}</p>
						</div>
						<div class="xie_sj">{{item.serviceGuide}}</div>
					</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { commonAjaxKy } from '../../api/api.js'
	import { Indicator,MessageBox }from 'mint-ui';
export default {
    components: {
	listone:''
    },
    data() {
        return {
        	orgId: this.$route.query.orgId,
			listone:'',
			isshow:true,
			isshow1:false,
			list:[],
			dictionaries: [{
					"serviceCode": "0101",
					"xie_p": "预约挂号",
					"xie_img": require('../../assets/img/xie_doc_yygh.png'),
					"xie_go": "zy_family_manage"
				},
				{
					"serviceCode": "0102",
					"xie_p": "排队叫号",
					"xie_img": require('../../assets/img/zy_family_manage.png'),
					"xie_go": "zy_family_notification"
				},
				{
					"serviceCode": "0104",
					"xie_p": "报告查询",
					"xie_img": require('../../assets/img/zy_family_manage.png'),
					"xie_go": "zy_report_history"
				},
				{
					"serviceCode": "0105",
					"xie_p": "满意评价",
					"xie_img": require('../../assets/img/zy_family_manage.png'),
					"xie_go": "zy_doc_sign"
				},
				{
					"serviceCode": "0106",
					"xie_p": "健康体检",
					"xie_img": require('../../assets/img/zy_family_manage.png'),
					"xie_go": "zy_consult"
				},
				{
					"serviceCode": "0107",
					"xie_p": "签到取号",
					"xie_img": require('../../assets/img/zy_report_history.png'),
					"xie_go": "zy_service_record"
				},
				{
					"serviceCode": "0108",
					"xie_p": "诊间支付",
					"xie_img": require('../../assets/img/xie_doc_zjzf.png'),
					"xie_go": "zy_service_record"
				},
				{
					"serviceCode": "0110",
					"xie_p": "床位查询",
					"xie_img": require('../../assets/img/zy_family_manage.png'),
					"xie_go": "zy_service_record"
				},
			]
        }

    },
    computed: {

    },
    methods: {
		//私人医生信息
		getHospitalDetail(){
			let params = [this.orgId]
			commonAjaxKy(JSON.stringify(params),'hcn.easyDoctor','getHospitalDetail').then(res=>{
				if(res.code == 200){
					this.listone=res.body
				}
			})
		},
		good(){
			let params= [JSON.parse(sessionStorage.getItem('userInfo')).body.userId,this.orgId,"021"]
			Indicator.open('加载中')
			commonAjaxKy(JSON.stringify(params),'hcn.easyDoctor','createPatientCollect').then(res=>{
				if(res.code==200){
					MessageBox('提示','点赞成功')
					this.isshow = false
					this.isshow1 = true
					Indicator.close()
				}else{
					MessageBox('提示','点赞失败')
					Indicator.close()
				}
			})
		},
		nogood(){
			let params= [JSON.parse(sessionStorage.getItem('userInfo')).body.userId,this.orgId,"021"]
			commonAjaxKy(JSON.stringify(params),'hcn.easyDoctor','removePatientCollect').then(res=>{
				if(res.code==200){
					MessageBox.confirm('您确定要取消收藏该医院吗？').then(action => {
   					this.isshow = true
					this.isshow1 = false
				});
				}
			})
		},
		getOrgServiceList(){
			let params = [this.orgId]
			commonAjaxKy(JSON.stringify(params),'hcn.serviceOpen','getOrgServiceList').then(res=>{
				if(res.code == 200){
					this.list = res.body
					let me = this
					res.body.forEach(item=>{
						me.dictionaries.forEach(item1=>{
							if(item1.serviceCode==item.serviceCode){
								item.xie_img= item1.xie_img
							}
						})
					})
				}
			})
		},
		//跳转页面带参数
		send(item){
			MessageBox("未开放")
		},
		gomap(){
			this.$router.push('/xie_map')
		}
		
    },
    mounted() {
    	sessionStorage.setItem("orgId", this.orgId);
		this.getHospitalDetail()
		this.getOrgServiceList()
    },
}
</script>
<style lang="less" scoped>
	.header_grop{
		width:100%;
        height: 100%;
        background:#eee;
        position: absolute;
		.box_img{
			height: 2.5rem;
			img{
				height: 2.5rem;
				width: 100%;
			}
		}
		.xie_center{
			/*border: 1px solid red;*/
			width: 100%;
			background: #fff;
			.top{
				height: .6rem;
				padding:.2rem 0;
				/*line-height:1.2rem*/
				.span1{
					color: #34B26E;
					font-size: .35rem;
					padding:0 .2rem;
					float: left;
				}
				.span2{
					color: #FB9E2E;
					font-size: .25rem;
					float: left;
				}
				.span3{
					color: #333;
					font-size: .25rem;
					padding:0 .2rem;
					float: left;
				}
				.xie_center_img{
					/*float: right;*/
					padding-right: .2rem;
					img{
						width: .5rem;
						height: .5rem;
						float: right;
						margin-top: -.1rem;
					}
				}
			}
			.xie_map{
				height: .6rem;
				border-bottom: 1px solid #A6A6A6;
				font-size: .3rem;
				.img1{
					width: .4rem;
					height: .4rem;
					float:left;
					padding:0 .3rem .2rem .2rem
				}
				div{
					float: left;
					margin-top: .05rem;
				}
				.img2{
					width: .4rem;
					height: .4rem;
					float: right;
					padding:0 .2rem .2rem 0 ;
				}
			}
			.center{
				display: flex;
				text-align: center;
				.box1,.box2,.box3{
					flex: 1 1 33%;
					padding: .2rem 0;
					img{
						height: 1rem;
					}
					dd{
						font-size: 0.3rem;
						color: #333333;
					}
				}
			}
			.xie_height{
				height: .2rem;
				background:#FAFAFA;
			}
			.fuwu{
				font-size: .3rem;
				padding:.1rem;
				border-bottom:1px solid #eee;
				.xie_fuwu{
					margin-bottom: .1rem;
				}
			}
			li{
					height: 1.2rem;
					padding: .2rem .1rem 0rem .3rem;
					border-bottom: 1px solid #ccc;
					font-size: .4rem;
					img{
						border-radius:50%;
						height: 1rem;
						width: 1rem;
						/*border: 1px solid red;*/
						float: left;
						margin-right: .2rem;
					}
					.xie_sj{
						font-size: .3rem;
						color: grey;
						margin-top: .2rem;
					}
				}
		}
	}
</style>
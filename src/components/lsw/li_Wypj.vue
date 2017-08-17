<template>
	<div class="yndh">
		<!--头部-->
		<mt-header fixed :title="$route.query.orgName">
			<a @click='$router.go(-1)' slot="left">
				<mt-button icon="back"></mt-button>
			</a>
			<!--<mt-button slot="right">
		  	<img class="img1" src="../../assets/img/li_tinajia.png"/>
		  </mt-button>-->
		</mt-header>

		<div class="content">
			<div class="ratingContent" v-for='item in ratingContent'>
				<span class="new fl">{{item.content}}</span>
				<markstar class="markstarConpoment fl" @marked='marked' :contentType='item.id'></markstar>
			</div>
		</div>

		<div class="">
			<mt-button size="large" @click="postRating">发表评论</mt-button>
		</div>
	</div>
</template>

<script>
	import {
		commonAjax,
		requestConfirmPassword,
		dicAjax,
		commonAjaxKy,
	}
	from '../../api/api';
	import '../../assets/css/li_style.css'
	import { Navbar, TabItem, Header, Indicator, Toast } from 'mint-ui';
	import markstar from './markStar.vue'
	export default {
		data: function() {
			return {
				ratingContent: [],
				tempObj: {},
			}
		},
		computed: {},
		components: {
			markstar
		},
		methods: {
			postRating() {
				let itemList = []
				for(let props in this.tempObj) {
					let obj = {
						'itemId': parseInt(props),
						'level': parseInt(this.tempObj[props])
					}
					itemList.push(obj)
				}
				console.log(itemList)

				//判断是否做了评价
				if(this.tempObj.hasOwnProperty(8) && this.tempObj.hasOwnProperty(9) && this.tempObj.hasOwnProperty(10)) {
					
					
					
					let mpi = JSON.parse(sessionStorage.getItem("userInfoDetail"));
					let user = JSON.parse(sessionStorage.getItem("userInfo"));
					let params = [{
						"accasion": "1",
						"businessId": "3",
						"businessType": "003",
						"doctorId": sessionStorage.getItem("doctorId"),
						"itemList": itemList,
						"mpiId": mpi.mpiId,
						"orgId": sessionStorage.getItem("orgId"),
						"userId": user.body.userId
					}]
					commonAjaxKy(JSON.stringify(params), 'hcn.evaluation', 'evaluateDoct')
						.then(res => {
							if(res.code === 200) {
								console.log(res)
								this.$router.history.go(-1)
								Toast({
									message: '评价成功',
									position: 'bottom',
									duration: 1000
								});
							}
						})

				} else {
					Toast({
						message: '您有未评分的项目',
						position: 'bottom',
						duration: 1000
					});
				}

			},
			marked(val) {
				let tempArr = val.split('-')
				this.tempObj[tempArr[0]] = tempArr[1]
				console.log(this.tempObj)	
			}
		},
		created() {},
		mounted() {
//			let user = JSON.parse(sessionStorage.getItem("userInfo"));
//			let mpiId = JSON.parse(sessionStorage.getItem("userInfoDetail"));
//			console.log(mpiId.mpiId)
//			console.log(user.body.userId)
			let params = ["003", "1", "1"]
			commonAjaxKy(JSON.stringify(params), 'hcn.evaluation', 'queryItemsByBusinessType')
				.then(res => {
					if(res.code === 200) {
						console.log(res.body)
						this.ratingContent = res.body
						//获取defineId
//						for (var i=0;i<this.ratingContent;i++) {
//							console.log(this.ratingContent[i].defineId)
//							this.defineId = this.ratingContent[i].defineId
//							console.log(this.defineId)
//						}
					}
				})
		}
	}
	
	//要提交的数据
	//		[{
	//			"accasion": "1",
	//			"businessId": "3",
	//			"businessType": "003",
	//			"doctorId": "e6e3fb82-7868-4614-95eb-345ec0bb1c01",
	//			"itemList": [{
	//				"itemId": 8,
	//				"level": 2
	//			}, {
	//				"itemId": 9,
	//				"level": 1
	//			}, {
	//				"itemId": 10,
	//				"level": 1
	//			}],
	//			"mpiId": "e64299249f7b410991cc17b5d81d67e4",
	//			"orgId": "e6e3fb82-7868-4614-95eb-345ec0bb1c01",
	//			"userId": "0a8d4fa9-c238-451d-a59d-9dcb761f1292"

//	{
//		"code": 200,
//		"body": {
//			"id": 21201,
//			"userId": "9fa92b25-42f4-4895-b253-d5424fc7d72d",
//			"password": "aa3af0ee9d6905de64bb6cb525a150de8ab437c9372266a8f295ee1d0d3fd38a",
//			"roleId": "patient",
//			"tenantId": "hcn.shenzhen",
//			"manageUnit": "hcn",
//			"lastLoginTime": "2017-08-09 13:53:36",
//			"lastIPAddress": "122.224.131.230, 10.8.3.50",
//			"lastUserAgent": "DOWNLOAD,null,UNKNOWN",
//			"roleName": "患者",
//			"userAvatar": 2646,
//			"tenantName": "深圳公有云",
//			"manageUnitName": "创业软件股份有限公司",
//			"userName": "大道",
//			"displayName": "深圳公有云-创业软件股份有限公司-患者"
//		},
//		"properties": {
//			"accessToken": "55cf67c7-0933-4ed3-b5f6-6fb6e52467bc"
//		}
//	}

	//	{
	//		"mpiId": "1a85c393a6f4455abb32b15ba0376855",
	//		"personName": "大道",
	//		"sex": "1",
	//		"dob": "1940-01-01 00:00:00",
	//		"phoneNo": "42342343",
	//		"avatar": 2646,
	//		"nationality": "02",
	//		"income": 0,
	//		"bloodType": "4",
	//		"maritalStatus": "10",
	//		"province": "440000000000",
	//		"city": "440300000000",
	//		"district": "440303000000",
	//		"street": "440303001000",
	//		"address": "桂园路50号",
	//		"certificate": {
	//			"source": "02",
	//			"certificateType": "02",
	//			"certificateNo": "5243432432434",
	//			"addTime": "2017-07-29 20:54:30",
	//			"sourceText": "中国香港澳门",
	//			"certificateTypeText": "居民户口簿"
	//		},
	//		"weight": 41,
	//		"height": 151,
	//		"profession": "51",
	//		"exerciseHabits": "",
	//		"drinkingHabits": "",
	//		"smokingHabits": "",
	//		"dietHabits": "",
	//		"nationalityText": "中国香港澳门",
	//		"bloodTypeText": "AB型",
	//		"maritalStatusText": "未婚",
	//		"provinceText": "广东省",
	//		"cityText": "深圳市",
	//		"districtText": "罗湖区",
	//		"streetText": "桂园街道办事处",
	//		"professionText": "自由职业者",
	//		"sexText": "男性",
	//		"dietHabitsText": ""
	//	}

	//		}]
</script>

<style scoped>
	html,
	body {
		background: #fff !important;
	}
	
	.yndh .content {
		margin-top: 1.2rem;
		padding-left: 0.5rem;
		font-size: 0.33rem;
		margin-bottom: 1rem;
	}
	
	.yndh .content img {
		height: 0.4rem;
		width: 0.4rem;
	}
	
	.yndh .content .content_top {
		height: 1rem;
		display: flex;
		align-items: center;
	}
	
	.yndh .content .img {
		margin-left: 1rem;
		height: 1rem;
		width: 60%;
		display: flex;
		align-items: center;
	}
	
	.yndh .ratingContent {
		height: 1rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.yndh .new {
		margin-right: 1rem;
	}
</style>
<template>
<div class="header_grop">
	<div class="header_top">
		消息
	</div>
	<!--<div>-->
	<ul v-if="list.length!=0">
		<li class="li_box" v-for="(item,index) in list" @click="send(item)">
			<img :src="item.xie_img"><b v-show="item.count>0">{{item.count}}</b>
			<div class="xie_jtgl">
				<p>{{item.xie_p}}</p>
				<span v-html ="item.lastNotification.content"></span>
			</div>
			<div class="xie_sj" v-html="item.xie_format"></div>
		</li>
	</ul>
	<span v-else>暂无信息</span>
	<!--</div>-->




	<!--底部按钮-->
	<div class="flexbox">
		<router-link to="/xie_home" class="flex_left">
			<div class="xie_img_box">
				<img src="../../assets/img/xie_shouye.png">
				<!--<img src="../../assets/img/xie_shouye1.png">-->
			</div>
			<span style="color:#000">首页</span>
		</router-link>
		<router-link to="/xie_xiaoxi" class="flex_center">
			<div class="xie_img_box">
				<img src="../../assets/img/xie_xiaoxi1.png">
			</div>
			<span style="color:#000">消息</span>
		</router-link>
		<router-link to="/zy_service" class="flex_right">
			<div class="xie_img_box">
				<img src="../../assets/img/xie_fuwu.png">
			</div>
			<span style="color:#000">服务</span>
		</router-link>
		<router-link to="/jia_person" class="flex_right1">
			<div class="xie_img_box">
				<img src="../../assets/img/xie_my.png">
			</div>
			<span style="color:#000">我的</span>
		</router-link>
	</div>

</div>
</template>
<script>
import {
	commonAjaxKy
} from '../../api/api'
import {
	Indicator,MessageBox
} from 'mint-ui'
export default {
	components: {

	},
	data() {
		return {
			list: [],
			list2: [],
			milliseconds: '',
			timeSpanStr: '',
			listtime: [],
			list1: [{
					"businessType": "002",
					"xie_p": "家庭管理",
					"xie_img": require('../../assets/img/zy_family_manage.png'),
					"xie_go": "zy_family_manage"
				},
				{
					"businessType": "616",
					"xie_p": "家医通知",
					"xie_img": require('../../assets/img/zy_family_notification.png'),
					"xie_go": "zy_family_notification"
				},
				{
					"businessType": "014",
					"xie_p": "报告历史查询",
					"xie_img": require('../../assets/img/zy_report_history.png'),
					"xie_go": "zy_report_history"
				},
				{
					"businessType": "088",
					"xie_p": "家医签约",
					"xie_img": require('../../assets/img/zy_sign.png'),
					"xie_go": "zy_doc_sign"
				},
				{
					"businessType": "520",
					"xie_p": "咨询互动",
					"xie_img": require('../../assets/img/zy_consult.png'),
					"xie_go": "zy_consult"
				},
				{
					"businessType": "613",
					"xie_p": "服务记录",
					"xie_img": require('../../assets/img/zy_service_record.png'),
					"xie_go": "zy_service_record"
				}
			]


		}

	},
	computed: {

	},
	methods: {
		getAllNotificationCount() {
			let params = []
			commonAjaxKy(JSON.stringify(params), 'hcn.notification', 'getAllNotificationCount').then(res => {

				if (res.code == 200) {
					this.list = res.body
					console.log(this.list.length!=0)
					this.list.forEach(item => {
						this.milliseconds = Date.parse(new Date()) - Date.parse(item.lastNotification.sendTime)
						console.log(item.count)
						this.list1.forEach(item1 => {
							if (item.businessType == item1.businessType) {
								item.xie_p = item1.xie_p
								item.xie_img = item1.xie_img
								item.xie_go = item1.xie_go
							}
						})
					})
					Indicator.close();
				}else{
					setTimeout(function(){
						Indicator.close();
						MessageBox("数据加载失败")
					},1500)
				}
			})

		},
		//时间转换
		formatMsgTime(milliseconds) {
			if (milliseconds <= 1000 * 60 * 1) {
				this.timeSpanStr = '刚刚';
			} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
				this.timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
			} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
				this.timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
			} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
				this.timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
			} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
				this.timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
			} else {
				this.timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
			}
			return this.timeSpanStr
		},
		send(item) {
			//         	console.log(item.xie_go)
			this.$router.push(item.xie_go)
		}

	},
	mounted() {
		this.getAllNotificationCount()
	},
}
</script>
<style scoped>
.header_top {
	height: 1rem;
	/*border: 1px solid red;*/
	line-height: 1rem;
	font-size: .4rem;
	text-align: center;
	background: #3ab76f;
	color: #fff;
}

.flexbox {
	border-top: 1px solid #ccc;
	height: 1rem;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	background: #fff;
}

.flex_left,
.flex_center,
.flex_right,
.flex_right1 {
	flex: 1 1 25%;
	display: flex;
	flex-direction: column;
}

.xie_img_box {
	height: 0.5rem;
}

.flexbox img {
	width: 0.4rem;
	height: 0.4rem;
	float: left;
	padding-left: .75rem;
	margin-top: 0.1rem;
	/*	line-height: 0.3rem;*/
	justify-content: center;
	align-content: center;
}

.flexbox span {
	font-size: 0.3rem;
	text-align: center;
	height: 0.5rem;
	padding-top: 0.1rem;
}

.header_grop ul li {
	height: 1rem;
	border-bottom: 1px solid #ccc;
}

.header_grop li {
	height: 5rem;
	padding: .2rem .1rem .2rem .3rem;
}

.header_grop li img {
	height: 1rem;
	widows: 1rem;
	/*border: 1px solid red;*/
	float: left;
}
.header_grop>span{
	font-size: .3rem;
	color: #666666;
	padding: .2rem;
	/*border: 1px solid red;*/
	margin-left: 3rem;
	
}
.xie_jtgl {
	/*font-size: .4rem;*/
	float: left;
	width: 3rem;
	margin-left: .2rem;
}

.xie_jtgl p {
	font-size: .4rem;
}

.xie_jtgl span {
	font-size: .3rem;
	display: block;
	margin-top: .15rem;
	width: 5rem;
	/*height: .3rem;*/
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.xie_sj {
	font-size: .3rem;
	float: right;
}
.li_box b{
	width: .2rem;
	height: .2rem;
	line-height: .2rem;
	text-align: center;
	font-size: .3rem;
	color:#fff;
	padding: .1rem;
	border-radius: 50%;
	background: red;
	position: absolute;
	left: 0;
	margin-left: 1rem;
}
</style>

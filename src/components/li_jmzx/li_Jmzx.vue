//签约管理列表

<template>
	<div class="jmzx">
		<!--头部-->
		<mt-header fixed title="咨询记录">
			<router-link to="/xie_home" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button slot="right">
				<img class="img1" src="../../assets/img/li_tinajia.png" />
			</mt-button>
		</mt-header>
	
		<mt-navbar fixed v-model="selected">
			<mt-tab-item id="1">全部</mt-tab-item>
			<mt-tab-item id="2">待回复</mt-tab-item>
			<mt-tab-item id="3">已回复</mt-tab-item>
			<mt-tab-item id="4">已结束</mt-tab-item>
		</mt-navbar>
	
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<ul class="list">
					<li class="li" v-for="(item, index) in list" @click="send(item)">
						<div class="li_left fl">
							<img class="portrait" src="../../assets/img/li_Resident.png" />
						</div>
						<div class="li_right fl">
							<div class="li_right_top">
								<div class="name fl">
									{{item.displayName}}
								</div>
								<!--{{item.statusText}}-->
								<div class="li_right_top_left">
									<span class="status fl" v-if="item.statusText=='待确认'">待回复</span>
									<span class="status2 fl" v-if="item.statusText=='已确认'">已回复</span>
									<span class="status3 fl" v-if="item.statusText=='已完成'">已结束</span>
									<em class="day fr">{{item.dispayTime}}</em>
								</div>
							</div>
	
							<div class="li_right_bottom">
								{{item.displayText}}
							</div>
						</div>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<ul class="list">
					<li class="li" v-for="(item, index) in list" @click="send(item)" v-if="item.statusText=='待确认'">
						<div class="li_left fl">
							<img class="portrait" src="../../assets/img/li_Resident.png" />
						</div>
						<div class="li_right fl">
							<div class="li_right_top">
								<div class="name fl">
									{{item.displayName}}
								</div>
								<!--{{item.statusText}}-->
								<div class="li_right_top_left">
									<span class="status fl" v-if="item.statusText=='待确认'">待回复</span>
									<span class="status2 fl" v-if="item.statusText=='已确认'">已回复</span>
									<span class="status3 fl" v-if="item.statusText=='已完成'">已结束</span>
									<em class="day fr">{{item.dispayTime}}</em>
								</div>
							</div>
	
							<div class="li_right_bottom">
								{{item.displayText}}
							</div>
						</div>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<ul class="list">
					<!--<router-link to="/li_Qygl_detail_yqy">-->
						<li class="li" v-for="(item, index) in list" @click="send(item)" v-if="item.statusText=='已确认'">
							<div class="li_left fl">
								<img class="portrait" src="../../assets/img/li_Resident.png" />
							</div>
							<div class="li_right fl">
								<div class="li_right_top">
									<div class="name fl">
										{{item.displayName}}
									</div>
									<!--{{item.statusText}}-->
									<div class="li_right_top_left">
										<span class="status fl" v-if="item.statusText=='待确认'">待回复</span>
										<span class="status2 fl" v-if="item.statusText=='已确认'">已回复</span>
										<span class="status3 fl" v-if="item.statusText=='已完成'">已结束</span>
										<em class="day fr">{{item.dispayTime}}</em>
									</div>
								</div>
	
								<div class="li_right_bottom">
									{{item.displayText}}
								</div>
							</div>
						</li>
					<!--</router-link>-->
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<ul class="list">
					<!--<router-link to="/li_Qygl_detail_wtg">-->
						<li class="li" v-for="(item, index) in list" @click="send(item)" v-if="item.statusText=='已完成'">
							<div class="li_left fl">
								<img class="portrait" src="../../assets/img/li_Resident.png" />
							</div>
							<div class="li_right fl">
								<div class="li_right_top">
									<div class="name fl">
										{{item.displayName}}
									</div>
									<!--{{item.statusText}}-->
									<div class="li_right_top_left">
										<span class="status fl" v-if="item.statusText=='待确认'">待回复</span>
										<span class="status2 fl" v-if="item.statusText=='已确认'">已回复</span>
										<span class="status3 fl" v-if="item.statusText=='已完成'">已结束</span>
										<em class="day fr">{{item.dispayTime}}</em>
									</div>
								</div>
	
								<div class="li_right_bottom">
									{{item.displayText}}
								</div>
							</div>
						</li>
					<!--</router-link>-->
				</ul>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>	
import {
	commonAjax, requestConfirmPassword, dicAjax
}
	from '../../api/api';
import '../../assets/css/li_qygl.css'
import { Header } from 'mint-ui';
//	import { commonAjaxKy} from '../../api/api'
import { Navbar, TabItem } from 'mint-ui';
export default {
	data: function () {
		return {
			list: [],
			nianl: '',
			errshow: false,
			error: '',
			value: '',
			selected: '1',
		}
	},
	methods: {
		Passwordvalid() {
//			let params = [{ "targetId": JSON.parse(sessionStorage.getItem("xie_localDoctorId"))[5], "targetType": "031", "pageSize": 20, "pageNo": 1 }]
			let params = [{"pageSize":20,"targetType":"041","targetId":JSON.parse(sessionStorage.getItem("common_signApplyInfo")).mpiId,"pageNo":1}]
			commonAjax(params, 'pcn.imChatService', 'qryTargetData').then(res => {
				if (res.code == 200) {
					this.list = res.body.rows

				}
			})

		},

		send(item) {
//			debugger
//			点击到跳转到已解约
			this.$router.push({
				path: "/jmzx_detail", query: {
					serviceRecordId: item.serviceRecordId,
					targetUser: item.targetId,
					targetType:"031",
					isActive: true
				}
			})

		},

	},
	mounted() {
		this.Passwordvalid()
		dicAjax().then(res => {
			sessionStorage.setItem("suitableDic", JSON.stringify(res.items));

		})
	},
	//年龄过滤
	filters: {
		data: function jsGetAge(strBirthday) {
			var returnAge;
			var strBirthdayArr = strBirthday.split("-");
			var birthYear = strBirthdayArr[0];
			var birthMonth = strBirthdayArr[1];
			var birthDay = strBirthdayArr[2];

			var d = new Date();
			var nowYear = d.getFullYear();
			var nowMonth = d.getMonth() + 1;
			var nowDay = d.getDate();

			if (nowYear == birthYear) {
				returnAge = 0;//同年 则为0岁  
			}
			else {
				var ageDiff = nowYear - birthYear ; //年之差  
				if (ageDiff > 0) {
					if (nowMonth == birthMonth) {
						var dayDiff = nowDay - birthDay;//日之差  
						if (dayDiff < 0) {
							returnAge = ageDiff;
						}
						else {
							returnAge = ageDiff ;
						}
					}
					else {
						var monthDiff = nowMonth - birthMonth;//月之差  
						if (monthDiff < 0) {
							returnAge = ageDiff - 1;
						}
						else {
							returnAge = ageDiff ;
						}
					}
				}
				else {
					returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
				}
			}

			return returnAge;//返回周岁年龄  

		}
	},
}
</script>


<style scoped>
.jmzx .mint-header {
	height: 1rem;
	background-color: #fff;
	color: #26a2ff;
}

.jmzx .mint-header-button {
	display: block;
	flex: 0;
}

.jmzx .mint-button {
	height: 1.5rem;
}

.jmzx .mint-header {
	font-size: 0.33rem;
}

.jmzx .mintui-back {
	font-size: 0.37rem;
}

.jmzx .mint-button-text img {
	width: 0.4rem;
	height: 0.4rem;
	float: right;
}

.jmzx .mint-tab-container {
	margin-top: 2rem;
}

.jmzx .is-right {
	display: flex;
	direction: rtl;
}

.jmzx .mint-navbar {
	margin-top: 1rem;
	height: 1rem;
	line-height: 1rem;
}

.jmzx .mint-tab-item-label {
	font-size: 0.28rem;
}

.jmzx .mint-tab-item {
	display: flex;
	align-items: center;
	justify-content: center;
}

.jmzx .mint-navbar {
	margin-top: 1rem;
	height: 1rem;
}

.jmzx .mint-tab-container-wrap {
	margin-top: 2rem;
}

.jmzx .mint-navbar {
	border-bottom: 0.5px solid #ccc;
	border-top: 0.5px solid #ccc;
}

.jmzx .mint-cell-left {
	margin-left: 0.5rem;
}

.jmzx .list {
	background: #fff;
}

.jmzx li {
	height: 2rem;
	width: 100%;
	border-bottom: 0.5px solid #ccc;
	margin: 0 0.3rem;
	color: #888;
	font-size: 0.28rem;
}

.jmzx .li_left {
	width: 15%;
	height: 100%;
}

.jmzx .li_right {
	width: 75%;
	height: 100%;
}

.jmzx .li_right_top {
	margin-top: 0.3rem;
	width: 100%;
	height: 0.8rem;
	line-height: 0.8rem;
}

.jmzx .li_right .li_right_top .name {
	/*width: 20%;*/
	color: #000;
	margin-right: 0.3rem;
}

.jmzx .li_right_top_left {
	/*width: 80%;*/
}

.jmzx .li_right_bottom {
	width: 100%;
}

.jmzx .portrait {
	padding-top: 0.5rem;
	height: 1rem;
	width: 1rem;
}

.jmzx .status {
	/*color: #F4D275;*/
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.2rem;
	height: 0.5rem;
	background: #fcc648;
	border-radius: 5px;
	color: #fff;
	font-size: 0.28rem;
	margin-top: 0.15rem;
}

.jmzx .status2 {
	/*color: #F4D275;*/
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.2rem;
	height: 0.5rem;
	background: #26a2ff;
	border-radius: 5px;
	color: #fff;
	font-size: 0.28rem;
	margin-top: 0.15rem;
}

.jmzx .status3 {
	/*color: #F4D275;*/
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.2rem;
	height: 0.5rem;
	background: #ccc;
	border-radius: 5px;
	color: #fff;
	font-size: 0.28rem;
	margin-top: 0.15rem;
}
</style>	
	

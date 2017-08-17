import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// mode:'history',
	routes: [
		//获取getAccessToken页

		{
			path: '/getAccessToken',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/getAccessToken.vue'], resolve)
		},
		//		谢鹏康开始
		{
			path: '/',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_homepage.vue'], resolve)
		},
		{
			path: '/xie_register',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_register.vue'], resolve)
		},
		//居民登陆页面
		{
			path: '/xie_homepage',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_homepage.vue'], resolve)
		},
		//忘记密码
		{
			path: '/xie_forgetpass',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_forgetpass.vue'], resolve)
		},
//		修改密码
		{
			path: '/xie_homepage_child',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_homepage_child.vue'], resolve)
		},
//		居民首页
		{
			path: '/xie_home',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_home.vue'], resolve)
		},
//		居民消息页面
		{
			path: '/xie_xiaoxi',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/Xie_xiaoxi.vue'], resolve)
		},
		//中医体质
		{
			path: '/xie_tvm_constitution',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/xie_tvm_constitution.vue'], resolve)
		},
		//中医体质历史页面
		{
			path: '/xie_hostory',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/xie_hostory.vue'], resolve)
		},

		//		谢鹏康结束
		//周洋开始
			// 跳转家医签约
		{
			path: '/zy_doc_sign',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_doc_sign.vue'], resolve)
		},
			// 跳转家庭管理
		{
			path: '/zy_family_manage',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_family_manage.vue'], resolve)
		},
			// 跳转报告历史
		{
			path: '/zy_report_history',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_report_history.vue'], resolve)
		},
			// 跳转家庭通知
		{
			path: '/zy_family_notification',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_family_notification.vue'], resolve)
		},
			// 跳转通知详情
		{
			path: '/zy_notification_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_notification_detail.vue'], resolve)
		},
			// 跳转服务记录
		{
			path: '/zy_service_record',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_service_record.vue'], resolve)
		},
			// 跳转咨询互动
		{
			path: '/zy_consult',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_consult.vue'], resolve)
		},	// 跳转发起咨询
		{
			path: '/zy_consult_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_consult_detail.vue'], resolve)
		},
			// 跳转我的家庭
		{
			path: '/zy_myfamily',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_myfamily.vue'], resolve)
		},
			// 跳转服务页
		{
			path: '/zy_service',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_service.vue'], resolve)
		},
			// 跳转服务详情
		{
			path: '/zy_service_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_service_detail.vue'], resolve)
		},
			// 跳转搜索
		{
			path: '/zy_search',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_search.vue'], resolve)
		},
			// 跳转医生主页
		{
			path: '/zy_doctorPage',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_doctorPage.vue'], resolve)
		},
			// 跳转私人医生
		{
			path: '/zy_personal_doctor',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_personal_doctor.vue'], resolve)
		},
			// 跳转热门医生
		{
			path: '/zy_hotDoctor',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_hotDoctor.vue'], resolve)
		},
			// 跳转常见疾病信息
		{
			path: '/zy_diseaseName',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_diseaseName.vue'], resolve)
		},
			// 跳转医生搜索
		{
			path: '/zy_searchDoctor',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_searchDoctor.vue'], resolve)
		},
			// 跳转科室医生详情
		{
			path: '/zy_departDoctorInfo',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_departDoctorInfo.vue'], resolve)
		},
			// 跳转健康活动
		{
			path: '/zy_event',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_event.vue'], resolve)
		},
			// 跳转健康活动详情
		{
			path: '/zy_event_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_event_detail.vue'], resolve)
		},
			// 跳转科室医生详情
		{
			path: '/zy_departDoctorInfo',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/zy_departDoctorInfo.vue'], resolve)
		},
		{
			path: '/tangyouquan',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zy/tangyouquan.vue'], resolve)
		},
		// 周洋结束路由
		// <--毛大焕开始路由-->
		//报告查询1
		{
			path: '/Reportone',
			name: "mao_Reportone",
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/mao/maoReport/mao_Reportone.vue'], resolve)
		},
		{
			path: '/Reportone/reporttwodetail',
			name: "reporttwodetail",
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/mao/maoReport/mao_Reporttwo.vue'], resolve)
		},
		{
			path: '/Reportone/reportsearch',
			name: "reportsearch",
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/mao/maoReport/mao_Repoersearch.vue'], resolve)
		},
		{
			path: '/Reportone/reportgjsearch',
			name: "reportgjsearch",
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/mao/maogjReport/li_Repoer_Advanced_query.vue'], resolve)
		},
		{
			path: '/mmap',
			name: "mmap",
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/mao/maoMap/mao_map.vue'], resolve),
			beforeEnter (to, rfom, next) {
				next()
			}
		},
		{
			path: '/mmap/mrout',
			name: "mrout",
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/mao/maoMap/mao_mrout.vue'], resolve)
		},
		// BMI体测指数页面
		{
			path: '/bmidetection',
			name: "mbmidetection",
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/mao/maoBMIdetection/mao_BMIdetection.vue'], resolve)
		},
		//毛结束
		//李苏文开始
		{
			path: '/jkzx',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/lsw/li_Jkzx.vue'], resolve)
		},
		//健康资讯详细页面
		{
			path: '/jkzx_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/lsw/li_Jkzx_detail.vue'], resolve)
		},
		{
			path: '/jmzx_detail',
			name: 'jmzx_detail',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/li_jmzx/li_Jmzx_detail.vue'], resolve)
		},
		{
			path: '/jmzx',
			name: 'jmzx',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/li_jmzx/li_Jmzx.vue'], resolve)
		},
		//医院导航和医院详情
		{
			path: '/lsw_yndh',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/lsw/li_Yndh.vue'], resolve)
		},
		{
			path: '/lsw_wypj',
			name: 'score_fullName',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/lsw/li_Wypj.vue'], resolve)
		},
		{
			path: '/lsw_yyxq',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/lsw/li_Yyxq.vue'], resolve)
		},
		//BMI自测
		{
			path: '/lsw_BMI',
			name: 'lsw_BMI',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/lsw/li_Bmi.vue'], resolve)
		},
		//蒋开始

		//个人中心页
		{
			path:'/jia_person',
			name:'jia_person',
			meta: {
				keepAlive: true
			},
			component:resolve =>require(['../components/jiang/jia_person.vue'], resolve)
		},
		{
			path:'/jia_sign',
			name:'jia_sign',
			meta:{
				keepAlive:true
			},
			component:resolve =>require(['../components/jiang/jia_sign.vue'], resolve)
		},
		// 服务记录页
		{
			path:'/jia_service',
			name:'jia_service',
			meta:{
				keepAlive:true
			},
			component:resolve =>require(['../components/jiang/jia_service.vue'], resolve)
		},
		//服务详情页
		{
			path: '/jia_package/:packid',
			name: 'jia_package',
			meta:{
				keepAlive: false
			},
			component:resolve =>require(['../components/jiang/jia_package.vue'], resolve)
		},
		{
			path: '/jia_serDetail/:packid',
			name: 'jia_serDetail',
			meta:{
				keepAlive: false
			},
			component:resolve =>require(['../components/jiang/jia_serDetail.vue'], resolve)
		},
		{
			path:'/jia_health',
			name:'jia_health',
			meta:{
				keepAlive:true
			},
			component:resolve =>require(['../components/jiang/jia_health.vue'], resolve)
		},
		{
			path:'/jia_callback',
			name:'jia_callback',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_callback.vue'], resolve)
		},
		{
			path: '/jia_setter',
			name:'jia_setter',
			meta:{
				keepAlive:true
			},
			component:resolve =>require(['../components/jiang/jia_setter.vue'], resolve)
		},
		{
			path: '/jia_account',
			name: 'jia_account',
			meta:{
				keepAlive: false
			},
			component:resolve =>require(['../components/jiang/jia_account.vue'], resolve)
		},
		{
			path: '/jia_ma',
			name: 'jia_ma',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_ma.vue'], resolve)
		},
		{
			path:'/jia_about',
			name: 'jia_about',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_about.vue'], resolve)
		},
		{
			path: '/jia_pas',
			name: 'jia_pas',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_password.vue'], resolve)
		},
		{
			path: '/jia_phone',
			name:'jia_phone',
			meta:{
				keepAlive:true
			},
			component:resolve =>require(['../components/jiang/jia_phone.vue'], resolve)
		},
		{
			path:'/jia_short-message',
			name: 'jia_message',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_message.vue'], resolve)
		},
		{
			path: '/jia_card',
			name: 'jia_card',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_card.vue'], resolve)
		},
		{
			path:'/jia_bind',
			name: 'jia_bind',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_bind.vue'], resolve)
		},
		{
			path: '/jia_appeal',
			name: 'jia_appeal',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_appeal.vue'], resolve)
		},
		{
			path: '/jia_accountShensu',
			name: 'jia_accountShensu',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_accountShensu.vue'], resolve)
		},
		{
			path: '/jia_cardShensu',
			name: 'jia_cardShensu',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_cardShensu.vue'], resolve)
		},
		{
			path: '/jia_cardShensu2/:id',
			name: 'jia_cardShensu2',
			meta: {
				keepAlive:false
			},
			component: resolve =>require(['../components/jiang/jia_cardShensu2.vue'], resolve)
		},
		{
			path: '/jia_bindPhone',
			name: 'jia_bindPhone',
			meta:{
				keepAlive:false
			},
			component: resolve =>require(['../components/jiang/jia_bindPhone.vue'], resolve)
		},
		{
			path: '/jia_rules',
			name:'jia_rules',
			meta:{
				keepAlive:false
			},
			component:resolve =>require(['../components/jiang/jia_shenRules.vue'], resolve)
		},
		{
			path:'/jia_success',
			name: 'jia_success',
			meta:{
				keepAlive: false
			},
			component: resolve =>require(['../components/jiang/jia_success.vue'], resolve)
		},
		{
			path: '/jia_child',
			name: 'jia_child',
			meta:{
				keepAlive: false
			},
			component: resolve =>require(['../components/jiang/jia_child.vue'], resolve)
		},
		// <--郭宇开始路由-->
		//添加家庭成员页
		{
			path: '/gy_add_family',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/gy/gy_add_family.vue'], resolve)
		},
		{
			path: '/gy_add_family_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/gy/gy_add_family_detail.vue'], resolve)
		},
		//诊间支付列表页
		{
			path: '/gy_zjzf',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/gy/gy_zjzf.vue'], resolve)
		},
		//诊间支付列表页
		{
			path: '/gy_zjzf_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/gy/gy_zjzf_detail.vue'], resolve)
		},
		//诊间支付价格详情
		{
			path: '/gy_zjzf_price_detail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/gy/gy_zjzf_price_detail.vue'], resolve)
		},
		//腰臀比
		{
			path: '/gy_WHR',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/gy/gy_WHR.vue'], resolve)
		},
		//腰臀比计算结果
		{
			path: '/gy_WHR_result',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/gy/gy_WHR_result.vue'], resolve)
		},
		//		郭结束
		//		谢鹏康,张开始 私人医生主页
		{
			path: '/xie_mydoc',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/xie_mydoc.vue'], resolve)
		},
		//地图
		{
			path: '/xie_map',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/xie_map.vue'], resolve)
		},
		//医院介绍
		{
			path: '/xie_hospital',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/Xie/xie_hospital.vue'], resolve)
		},
		/*宋思佳*/
		//私人医生-热门医院
		{
			path: '/prvivateDoctor/hotHospitalList',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/ssj/ssj_hotHospital_list.vue'], resolve)
		},
		//私人医生-热门医院搜索
		{
			path: '/prvivateDoctor/hotHospitalList/search',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/ssj/ssj_search_hotHospital.vue'], resolve)
		},
		//服务-预产期自测
		{
			path: '/service/expectedDate',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/ssj/ssj_expected_date.vue'], resolve)
		},
		//服务-预产期自测-预产期计算详情
		{
			path: '/service/expectedDate/details/:selectDate',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/ssj/ssj_expectedDate_details.vue'], resolve)
		},

		//<!--张炳林路由开始-->
		//测试页
		{
			path: '/test',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/imgUpload.vue'], resolve)
		},
		//居民签约页
		{
			path: '/zbl_jmqy',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_jmqy.vue'], resolve)
		},
		//签约详情页
		{
			path: '/zbl_qyxq',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/zbl/zbl_qyxq.vue'], resolve)
		},
		//选择居住地址页
		{
			path: '/qyxq_hometown',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_hometown.vue'], resolve),
		},
		//选择机构页
		{
			path: '/qyxq_selectareaorg',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_selectareaorg.vue'], resolve)
		},
		//搜索医生页
		{
			path: '/qyxq_searchdoct',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_searchdoct.vue'], resolve)
		},
		//选择家庭医生团队页
		{
			path: '/qyxq_selecthomedocteam',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_selecthomedocteam.vue'], resolve)
		},
		//家医详情页
		{
			path: '/qyxq_doctordetail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_doctordetail.vue'], resolve)
		},
		//选择服务包页
		{
			path: '/qyxq_package',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_package.vue'], resolve)
		},
		//服务包详情页
		{
			path: '/qyxq_packageDetail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_packageDetail.vue'], resolve)
		},
		//签约协议页
		{
			path: '/qyxq_xieyi',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_xieyi.vue'], resolve)
		},
		//签约成功查看服务包页
		{
			path: '/qyxq_signedPackage',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_signedPackage.vue'], resolve)
		},
		//签约成功页
		{
			path: '/qyxq_success',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_success.vue'], resolve)
		},
		//签约记录页
		{
			path: '/qyxq_signrecord',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_signrecord.vue'], resolve)
		},
		//签约详情修改或删除页
		{
			path: '/qyxq_edit',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_edit.vue'], resolve)
		},
		//签约详情查看服务包页
		{
			path: '/qyxq_editPackage',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_editPackage.vue'], resolve)
		},
		//已签约页
		{
			path: '/qyxq_signed',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_signed.vue'], resolve)
		},
		//签约状态详情页
		{
			path: '/qyxq_signRecordDetail',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_signRecordDetail.vue'], resolve)
		},
		//添加家庭成员页
		{
			path: '/qyxq_addMember',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_qyxq_addMember.vue'], resolve)
		},
		//添加家庭成员页2
		{
			path: '/qyxq_addMember_next',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_addMember_next.vue'], resolve)
		},
		//个人基本信息页
		{
			path: '/mybaseinfo',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/zbl/zbl_myBaseInfo.vue'], resolve)
		},
		//个人完善基本信息页
		{
			path: '/mybaseinfo2',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/zbl/zbl_myBaseInfo2.vue'], resolve)
		},
		//个人基本信息选择居住地址页
		{
			path: '/mybaseinfo_selectaddress',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_mybaseinfo_selectaddress.vue'], resolve)
		},
		//个人基本信息选择生活习惯页
		{
			path: '/mybaseinfo_habits',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/zbl/zbl_mybaseinfo_habits.vue'], resolve)
		},
		//个人完善基本信息选择生活习惯页
		{
			path: '/mybaseinfo_habits2',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/zbl/zbl_mybaseinfo_habits2.vue'], resolve)
		},
		//私人医生主页
		{
			path: '/privateDoct_rating',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_privateDoct_rating.vue'], resolve)
		},
		//常见疾病
		{
			path: '/zbl_commonDiseases',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_commonDiseases.vue'], resolve)
		},
		//搜索疾病
		/*{
			path: '/zbl_diseaseSearch',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_diseaseSearch.vue'], resolve)
		},*/
		//中医体质页面
		{
			path: '/zbl_zytz',
			meta: {
				keepAlive: true
			},
			component: resolve => require(['../components/zbl/zbl_zytz.vue'], resolve)
		},
		//中医体质结果页面
		{
			path: '/zbl_zytz_result',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_zytz_result.vue'], resolve)
		},
		//中医体质结果页面
		{
			path: '/zbl_zytz_physical',
			meta: {
				keepAlive: false
			},
			component: resolve => require(['../components/zbl/zbl_physical/zbl_physical.vue'], resolve)
		},
		//<!--张炳林路由结束-->
	]
})

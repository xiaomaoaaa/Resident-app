import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		zbl_phoneNo: '',
		zbl_packages: [],
		zbl_address: {},
		xieyiCont: '',
		selectDocTeam: {},
		packagesInfo: {},
		selectDoctorTeam: {},
		doctorDetail: {},
		zbl_signPack: {},
		applyInfo: {},
		zbl_personInfo: {},
		zbl_addFamilyPerInfo: {},
		txb_messageContent: '',
		xie_common: {},
		xie_sendsave:{},
		zbl_familyMemberInfo: {},
		zbl_userHabits: {},
		// 蒋锐
		jia_phoneNumber: '',
		jia_maLink:'',
		jia_PhoneValidateNumber: '',
		jia_serPhoneNumber: '',
		jia_certificateNo: '',
		jia_formDatas:'',
		jia_appealInfo: '',
		jia_title:''
	},
	getters: {},
	mutations: {
		zbl_editPhoneNo(state, zbl_phoneNo) {
			state.zbl_phoneNo = zbl_phoneNo
		},
		zbl_selectPackages(state, pag) {
			state.zbl_packages = []
			state.zbl_packages.push(pag)
		},
		zbl_selectAddress(state, zbl_address) {
			state.zbl_address = zbl_address
		},
		xieyiCont(state, xieyiCont) {
			state.xieyiCont = JSON.parse(xieyiCont)
		},
		selectDocTeam(state, docTeam) {
			state.selectDocTeam = docTeam
		},
		getPackagesInfo(state, packagesInfo) {
			state.packagesInfo = JSON.parse(packagesInfo)
		},
		getDoctorDetail(state, doctorDetail) {
			state.doctorDetail = JSON.parse(doctorDetail)
		},
		zbl_getSignPack(state, saveDataArr) {
			saveDataArr.forEach(item => {
				state.zbl_signPack[item.name] = item.value
			})
		},
		zbl_getApplyInfo(state, applyInfo) {
			state.applyInfo = JSON.parse(applyInfo)
		},
		zbl_getPersonInfo(state, zbl_personInfo) {
			state.zbl_personInfo = JSON.parse(zbl_personInfo)
		},
		zbl_getAddFamilyPerInfo(state, saveDataObj) {
			let saveDataObjParse = JSON.parse(saveDataObj)
			for (let props in saveDataObjParse) {
				state.zbl_addFamilyPerInfo[props] = saveDataObjParse[props]
			}
		},
		zbl_getfamilyMemberInfo(state, saveDataObj) {
			state.zbl_familyMemberInfo = JSON.parse(saveDataObj)
		},
		zbl_userHabits(state, saveDataObj) {
			state.zbl_userHabits = JSON.parse(saveDataObj)
		},
		txb_setMessageContent(state, txb_messageContent) {
			state.txb_messageContent = txb_messageContent
		},

		//谢鹏康
		xie_select_common(state, saveDataObj1) {
			for (let prop in saveDataObj1) {
				state.xie_common[prop] = saveDataObj1[prop]
			}
		},
		xie_select_sendsave(state, saveDataObj1) {
			for (let prop in saveDataObj1) {
				state.xie_sendsave[prop] = saveDataObj1[prop]
			}
			console.log(state.xie_sendsave)
		},
		// 蒋锐
		jia_setPhoneNumber(state,value){
			state.jia_phoneNumber = value;
		},
		jia_setMaLink(state,value){
			state.jia_maLink = value;
		},
		jia_setPhoneValidateNumber(state,value){
			state.jia_PhoneValidateNumber = value;
		},
		jia_setSerPhoneNumber(state,value){
			state.jia_serPhoneNumber = value
		},
		jia_setCertificateNo(state,value){
			state.jia_certificateNo = value;
		},
		jia_setFormDatas(state,value){
			state.jia_formDatas = value;
		},
		jia_setAppealInfo(state,value){
			console.log(value)
			state.jia_appealInfo = value;
		},
		jia_setTitle(state,value){
			console.log(value)
			state.jia_title = value
		}
	},
	actions: {
		zbl_editPhoneNo({
			commit
		}, zbl_phoneNo) {
			commit('zbl_editPhoneNo', zbl_phoneNo)
		},
		zbl_selectPackages({
			commit
		}, pag) {
			commit('zbl_selectPackages', pag)
		},
		zbl_selectAddress({
			commit
		}, zbl_address) {
			commit('zbl_selectAddress', zbl_address)
		},
		xieyiCont({
			commit
		}, content) {
			commit('xieyiCont', content)
		},
		selectDocTeam({
			commit
		}, docTeam) {
			commit('selectDocTeam', docTeam)
		},
		getPackagesInfo({
			commit
		}, packagesInfo) {
			commit('getPackagesInfo', packagesInfo)
		},
		getDoctorDetail({
			commit
		}, doctorDetail) {
			commit('getDoctorDetail', doctorDetail)
		},
		zbl_getSignPack({
			commit
		}, saveDataArr) {
			commit('zbl_getSignPack', saveDataArr)
		},
		zbl_getApplyInfo({
			commit
		}, applyInfo) {
			commit('zbl_getApplyInfo', applyInfo)
		},
		zbl_getPersonInfo({
			commit
		}, zbl_personInfo) {
			commit('zbl_getPersonInfo', zbl_personInfo)
		},
		zbl_getAddFamilyPerInfo({
			commit
		}, saveDataObj) {
			commit('zbl_getAddFamilyPerInfo', saveDataObj)
		},
		zbl_getfamilyMemberInfo({
			commit
		}, saveDataObj) {
			commit('zbl_getfamilyMemberInfo', saveDataObj)
		},
		zbl_userHabits({
			commit
		}, saveDataObj) {
			commit('zbl_userHabits', saveDataObj)
		},
		txb_setMessageContent({
			commit
		}, txb_messageContent) {
			commit('txb_setMessageContent', txb_messageContent)
		},
		xie_common({
			commit
		}, saveDataObj) {
			commit('xie_select_common', saveDataObj)
		},
		xie_sendsave({
			commit
		}, saveDataObj) {
			commit('xie_select_sendsave', saveDataObj)
		},
		// 蒋锐
		jia_setPhoneNumber({ commit },value){
			commit('jia_setPhoneNumber',value)
		},
		jia_setMaLink({ commit },value){
			commit('jia_setMaLink',value)
		},
		jia_setPhoneValidateNumber({ commit },value){
			commit('jia_setPhoneValidateNumber',value)
		},
		jia_setSerPhoneNumber({ commit },value){
			commit('jia_setSerPhoneNumber',value)
		},
		jia_setCertificateNo({ commit },value){
			commit('jia_setCertificateNo',value)
		},
		jia_setFormDatas({ commit },value){
			commit('jia_setFormDatas',value)
		},
		jia_setAppealInfo({ commit },value){
			commit('jia_setAppealInfo',value)
		},
		jia_setTitle({ commit },value){
			commit('jia_setTitle',value)
		}
	}

})

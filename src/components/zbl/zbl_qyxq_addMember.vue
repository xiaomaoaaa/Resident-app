<template>
<div class="add-people" style="overflow-x:hidden;height:100vh;">
	<div class="header">
        <mt-header title="家庭成员添加">
            <a slot="left" @click='$router.push("/zbl_jmqy")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
	<div class="content">
		<mt-cell title='*国籍/地区' :value='zone' is-link @click.native='showZone'>
		</mt-cell>
		<transition name='slide'>
			<div class="zone" v-show='zoneShow'>
				<mt-radio title='国籍/地区' v-model='zoneIndex' :options='zones' @click.native='zoneHide'></mt-radio>
			</div>
		</transition>

		<mt-cell title='*证件类型' :value='cardType' is-link @click.native='showCard'>
		</mt-cell>
		<transition name='slide'>
			<div class="type" v-show='cardShow'>
				<mt-radio title='证件类型' v-model='cardIndex' :options='cardTypes' @click.native='cardHide'></mt-radio>
			</div>
		</transition>
		<mt-cell title='*证件号码'>
			<input class='input-box' @input='validate($event)' @change='validateForm($event)' type="text" placeholder="请输入证件号码" ref="mao_hdzhi">
		</mt-cell>
		<div class="mao_butn">
			<mt-button type="primary" @click.native="mao_djcxyz">下一步</mt-button>
		</div>
	</div>
</div>
</template>
<script>
import { Cell } from 'mint-ui'
import {
    commonAjax,commonAjaxKy} from '../../api/api.js'
import { Radio,Button,MessageBox,Toast } from 'mint-ui'
import {
    mapActions,
    mapState
} from 'vuex'
export default{
	data(){
		return {
			zone: '中国',
			cardType:'居民身份证',
			zoneIndex: '0',
			cardIndex: '0',
			zoneShow: false,
			cardShow: false,
			cardTypes:[{
					label: '居民身份证',
					value: '0'
				},
				// {
				// 	label: '军官证',
				// 	value: '1'
				// },
				// {
				// 	label: '出生证明',
				// 	value: '2'
				// }
			],
			zones:[{
				label: '中国',
				value: '0'
			},
			// {
			// 	label:'中国台湾',
			// 	value: '1'
			// },
			// {
			// 	label: '中国香港澳门',
			// 	value: '2'
			// },
			// {
			// 	label: '护照',
			// 	value: '3'
			// }
		],
			zonesDic:['中国','中国台湾','中国香港澳门','海外'],
			cardTypesDic:['居民身份证','军官证','出生证明','台湾居民来往内地通行证','港澳居民来往内地通行证','海外'],
			types:[
				[{
					label: '居民身份证',
					value: '0'
				},
				{
					label: '军官证',
					value: '1'
				},
				{
					label: '出生证明',
					value: '2'
				}],
				[{
					label: '台湾居民来往内地通行证',
					value: '3'
				}],
				[{
					label: '港澳居民来往内地通行证',
					value: '4'
				}],
				[{
					label: '护照',
					value: '5'
				}]
			],
		}
	},
	methods:{
		showZone(){
			this.zoneShow = !this.zoneShow
		},
		showCard(){
			this.cardShow = !this.cardShow
		},
		zoneHide(){

			this.zoneShow = false
		},
		cardHide(){
			this.cardShow = false
		},
		validate(event){
			let target = event.target;
			let value = target.value;
			// console.log(value)
			value = value.replace(/[^\d]/,'');
			target.value = value;
		},
		validateForm(event){
			let value = event.currentTarget.value;
			switch(this.cardIndex){
				case '0':
					// console.log(value)
					break;
				case '1':
					// console.log(value)
					break;
				case '2':
					// console.log(value)
					break;
				case '3':
					// console.log(value)
					break;
				case '4':
					// console.log(value)
					break;
				case '5':
					// console.log(value)
			}
		},
		mao_djcxyz(){
			let params = [{"certificateNo": this.$refs.mao_hdzhi.value,"source":"01","certificateType":"01"}]
	        commonAjaxKy(JSON.stringify(params), 'hcn.person', 'checkFamilyMember').then(res => {
	            if (res.code === 200) {
	                // console.log(res.body)
					if(res.body) {
						this.zbl_getfamilyMemberInfo(JSON.stringify(res.body))
					} else {
						this.zbl_getfamilyMemberInfo(JSON.stringify({}))
					}
	            } else if(res.code === 625) {
					MessageBox('提示',res.msg).then(() => {
						this.$router.push('/zbl_jmqy')
					})  //已经添加该成员
				}
	        }).then(() => {
				if(this.cardType=="居民身份证") {
					if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(this.$refs.mao_hdzhi.value)) {
						let obj = {}, obj2 = {}
						obj.certificateNo = this.$refs.mao_hdzhi.value
						obj.certificateType = '01'
						obj.source = '01'
						obj2.certificate = obj
						this.zbl_getAddFamilyPerInfo(JSON.stringify(obj2))
						this.$router.push("/qyxq_addMember_next")
					} else{
						Toast({
							message: '身份证号码有误',
							duration: 1000
						})
					}
				}
			})
			// if(this.cardType=="台湾居民来往内地通行证"){
			// 	if(/[A-Z][0-9]{9}/.test(this.$refs.mao_hdzhi.value)){
			// 		let obj = {}, obj2 = {}
			// 		obj.certificateNo = this.$refs.mao_hdzhi.value
			// 		obj.certificateType = '07'
			// 		obj.source = '01'
			// 		obj2.certificate = obj
			// 		this.zbl_getAddFamilyPerInfo(JSON.stringify(obj2))
			// 		this.$router.push("/qyxq_addMember_next")
			// 	}else{
			// 		Toast({
            //             message: '身份证信息有误',
            //             duration: 1000
            //         })
			// 	}
			// }
			// if(this.cardType=="港澳居民来往内地通行证"){
			// 	if(/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(this.$refs.mao_hdzhi.value)){
			// 		let obj = {}, obj2 = {}
			// 		obj.certificateNo = this.$refs.mao_hdzhi.value
			// 		obj.certificateType = '06'
			// 		obj.source = '01'
			// 		obj2.certificate = obj
			// 		this.zbl_getAddFamilyPerInfo(JSON.stringify(obj2))
			// 		this.$router.push("/qyxq_addMember_next")
			// 	}else{
			// 		Toast({
            //             message: '身份证信息有误',
            //             duration: 1000
            //         })
			// 	}
			// }
			// if(this.cardType=="护照"){
			// 	if(/^[a-zA-Z]{5,17}$/.test(this.$refs.mao_hdzhi.value)|/^[a-zA-Z0-9]{5,17}$/.test(this.$refs.mao_hdzhi.value)) {
			// 		let obj = {}, obj2 = {}
			// 		obj.certificateNo = this.$refs.mao_hdzhi.value
			// 		obj.certificateType = '03'
			// 		obj.source = '01'
			// 		obj2.certificate = obj
			// 		this.zbl_getAddFamilyPerInfo(JSON.stringify(obj2))
			// 		this.$router.push("/qyxq_addMember_next")
			// 	}else{
			// 		Toast({
            //             message: '身份证信息有误',
            //             duration: 1000
            //         })
			// 	}
			// }
		},
		...mapActions(['zbl_getAddFamilyPerInfo','zbl_getfamilyMemberInfo'])
	},
	watch:{
		zoneIndex(){
			this.zone = this.zonesDic[this.zoneIndex]
			// console.log(this.index)
			this.cardTypes = this.types[this.zoneIndex]
		},
		cardTypes(){
			this.cardType = this.cardTypes[0].label;
		},
		cardIndex(){
			this.cardType = this.cardTypesDic[this.cardIndex]
			// console.log(this.cardIndex)
		}
	},
	components:{
		'mt-cell':Cell,
		'mt-radio':Radio,
		"mt-button":Button
	}
}
</script>
<style lang="stylus" scoped>
.add-people{
	.header{
		position: relative;
		width: 100%;
		height:1rem;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		background-color: #fff;
		.mint-header {
	        height: 1rem;
	        font-size: .4rem;
	        background-color: #35B46F;
	    }
		.back{
			width: 0.4rem;
			height: 0.4rem;
			position: absolute;
			left:10px;
			top:10px;
			// background-image: url('../../assets/img/mao_back.png');
			background-size: cover;
		}
		.back img{
			width:100%;
			height:100%;
		}
		.title{
			font-size: 18px;
			line-height: 0.8rem;
			color:#64ccf8;
			font-weight: 300;
		}
	}
	.zone{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color: #fff;
		z-index: 1000;
	}
	.type{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color: #fff;
		z-index: 1000;
	}
	.mint-radiolist-title{
		font-size: 18px;
		color:#60c8f5;
		text-align: center;
	}
	.input-box{
		// height: 20px;
		font-size: 16px;
		text-align: right;
		padding-right: 0.2rem;
		outline-style: none;
		border-color: transparent;
	}
	.mint-button {
		background-color: #35B46F;
	}
	.slide-enter-active,.slide-leave-active{
		transition:0.5s;
	}
	.slide-enter,.slide-leave-to{
		transform:translateX(100%);
	}
	.mao_butn{width:80%;margin:0 auto;margin-top:.6rem;}
	.mao_butn button{width:100%;}
}
</style>

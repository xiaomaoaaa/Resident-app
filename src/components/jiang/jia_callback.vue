<!-- 意见反馈页 -->
<template>
<div class="app">
	<div class="callback" v-if='showPage'>
		<div class="header">
			<mt-header title="意见反馈">
				<a slot="left" @click='$router.push("/jia_person")'>
					<mt-button icon="back"></mt-button>
				</a>
				<a slot="right">
					<mt-button class="smallbtn" @click.native='getFeedbackList'>我的反馈</mt-button>
				</a>
			</mt-header>
		</div>
		<div class="body">
			<div class="callbackItems cbafter">
				<div class="item fl" @click='gogogo' :id='01'>
					<i class="icon checked"></i><span>意见反馈</span>
				</div>
				<div class="item fl" @click='gogogo' :id='02'>
					<i class="icon"></i><span>问题反馈</span>
				</div>
				<div class="item fl" @click='gogogo' :id='03'>
					<i class="icon"></i><span>其他</span>
				</div>
			</div>
			<div class="inputText">
				<mt-field placeholder="请描述您的问题，最多200字" type="textarea" rows="4" v-model="textCont" class="textArea"></mt-field>
				<p>{{200 - textCont.length}}/200</p>
			</div>
			<div class="upLoadImg">
				<p>请上传图片，最多添加3张</p>
				<div class="img-box">
					<img src="../../assets/img/zbl_add.png" width="50" height="50">
					<form  role="form" id="viewimgupload" enctype="multipart/form-data" v-on:submit.prevent>
			   			<input type="file" name="img" id="view_load" @change="uploadimg" accept="image/*" />
					 </form>
				</div>
				<div id="imgcontent">
					<img :src="src[0]" width="70" height="70" v-show='src[0]'>
					<img :src="src[1]" width="70" height="70" v-show='src[1]'>
					<img :src="src[2]" width="70" height="70" v-show='src[2]'>
				</div>
				<p class="count">{{imgNumber}}/3</p>
			</div>
			<div class="divide"></div>

			<mt-cell title="是否愿意接受电话回访">
				<mt-switch v-model="switchCall"></mt-switch>
			</mt-cell>
			<mt-field label="联系方式" v-model='jia_phoneNo' v-show='switchCall'></mt-field>
			<div class="submitBtn">
				<mt-button size="normal" @click.native='submit'>提交</mt-button>
			</div>
		</div>
	</div>

	<div class="callback" v-else>
		<div class="header">
			<mt-header title="我的反馈">
				<a slot="left" @click='showPage = true'>
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
		</div>
		<div class="body2">
			<div class="items" v-for='item in feedbackData'>
				<div class="feedbackItems">
					<p class="time">{{item.createDt}}</p>
					<p class="content">{{item.content}}</p>
				</div>
				<div class="divide"></div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import {
	commonAjaxKy
} from '../../api/api.js'
import api from '../../api/index.js'
import {
	Cell,
	MessageBox,
	Toast,Indicator
} from 'mint-ui'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			textCont: '',
			switchCall: true,
			classify: '',
			feedbackData: [],
			showPage: true,
			imgNumber: 0,
			src:[]
		}
	},
	methods: {
		gogogo(e) {
			let allIconEles = document.querySelectorAll('.callbackItems>.item>.icon')
			for (let i = 0; i < allIconEles.length; i++) {
				allIconEles[i].classList.remove('checked')
			}
			e.currentTarget.querySelector('.icon').classList.add('checked')
			this.classify = e.currentTarget.id
		},
		submit() {
			Indicator.open('提交中...')
			if (this.textCont.length) {
				let params = [{
					"content": this.textCont,
					"phoneNo": this.jia_phoneNo,
					"uuid": "2e3812f27b3915b1228d3ecdbb2936fb",
					"classify": this.classify
				}]
				commonAjaxKy(JSON.stringify(params), 'hcn.feedback', 'addFeedback').then(res => {
					if (res.code === 200) {
						Indicator.close();
						MessageBox.alert('感谢反馈，您的问题我们已记录','提示')
							.then(()=>{
							this.$router.push('/jia_person')
						})
						
					}
				})
			} else {
				Toast({
					message: '反馈信息不能为空',
					duration: 1000
				})
			}
		},
		uploadimg(){
			if(this.src.length>3){
				Toast({
					message: '最多只能上传三张照片'
				})
			}else{
				let imguploadform = document.getElementById('viewimgupload');
				let formData = new FormData(imguploadform);
				api.imguploadAjax(formData).then((res)=>{
					if(res.success){
						let url = api.imgview(res.record.fileId);
						this.src.push(url);
						// api.imgview()
					}
				})
			}
		},
		getFeedbackList() {
			Indicator.open();
			this.showPage = false
			let params = []
			commonAjaxKy(JSON.stringify(params), 'hcn.feedback', 'getFeedbackList').then(res => {
				if (res.code === 200) {
					this.feedbackData = res.body
					Indicator.close();
				}
			})
		},
	},
	mounted() {
	},
	computed:mapState({
		jia_phoneNo: state=>state.jia_phoneNumber
	})
}
</script>
<style lang="less">
.callback {
	.mint-header {
		height: 1rem;
		font-size: .4rem;
		background-color: #35B46F;
		.mintui-back{
			font-size: 22px;
		}
		.mint-button-text{
			font-size: 18px;
		}
	}
	.body {
		.callbackItems {
			padding: .3rem;
			border-bottom: 1px solid #ddd;
			.item {
				font-size: .3rem;
				margin-right: 15px;
				.icon {
					display: inline-block;
			    	background-color: #fff;
			    	border-radius: 100%;
			    	border: 1px solid #ccc;
			    	position: relative;
			    	width: 20px;
			    	height: 20px;
			    	vertical-align: middle;
					margin-right: 10px;
				}
				.icon.checked {
					background-color: #67cc70;
			    	border-color: #67cc70;
				}
				.icon:after {
					border: 2px solid transparent;
					border-left: 0;
					border-top: 0;
					content: " ";
					top: 3px;
					left: 6px;
					position: absolute;
					width: 4px;
					height: 8px;
					-webkit-transform: rotate(45deg) scale(0);
					transform: rotate(45deg) scale(0);
					-webkit-transition: -webkit-transform .2s;
					transition: -webkit-transform .2s;
					transition: transform .2s;
					transition: transform .2s,-webkit-transform .2s;
					border-color: #fff;
			    	-webkit-transform: rotate(45deg) scale(1);
			    	transform: rotate(45deg) scale(1);
				}
			}
		}
		.inputText {
			text-align: right;
			.textArea {
				width: 90%;
				margin: 20px auto;
				border: 1px solid #ddd;
				border-radius: 10px;
			}
			p {
				margin-right: 20px;
				font-size: .3rem;
			}
		}
		.upLoadImg {
			// position: relative;
			margin: 20px;
			p {
				font-size: .3rem;
			}
			.img-box{
				display: inline-block;
				width: 80px;
				height: 80px;
				// position: absolute;
				// top:0.2rem;
				margin-top: 0.4rem;
				overflow: hidden;
				img {
					position: absolute;
	                border: 1px dashed #ddd;
	                padding: 10px;
	            }
	            #view_load{
	            	padding: 0.4rem 0;
	            	position: absolute;
	            	z-index: 1000;
	            	// background-color: transparent;
	            	// color:transparent;
	            	opacity: 0;
	            }
			}
			#imgcontent{
				display: inline-block;
				width: 70%;
				height: 70px;
				position: relative;
				top:-0.14rem;
				img{
					float:left;
					margin-right: 7px;
				}
			}
			p.count {
				text-align: right;
			}
		}
		.mint-switch-core{
			background-color:#35B46F;
		}
		.submitBtn {
			text-align: center;
			.mint-button {
				width: 90%;
				background-color: #67cc70;
				color: #fff;
			}
		}
	}
	.body2 {
		.feedbackItems {
			font-size: .4rem;
			padding: .3rem;
			line-height: 1.8;
			.time {
				color: grey;
			}
			.content {
				margin-top: .2rem;
			}
		}
	}
	.divide {
		height: 10px;
		background-color: #F2F2F2;
	}
}
</style>

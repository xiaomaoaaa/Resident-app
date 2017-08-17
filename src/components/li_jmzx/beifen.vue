<template>
	<div class="Jmzx_detail Jmzx_pageContainer" :class=" {footshow : clickmore}">
		<header class="Jmzx_header">
			<!--头部-->
			<mt-header fixed title="咨询记录">
				<router-link to="/jmzx" slot="left">
					<mt-button icon="back"></mt-button>
				</router-link>
				<mt-button v-show="isActive" slot="right" class="closeMsg" @click="closeMsg">
					结束咨询
				</mt-button>
			</mt-header>
			<div v-if="isActive" class="tip tip-active">
				医生的回复仅为建议，具体诊疗前往医院进行。
			</div>
			<div v-else class="tip">
				本次咨询已结束
			</div>
		</header>
		<section class="Jmzx_contend" @click="MenuOutsideClick">
			<wxChat ref="wxChat" :isActive="isActive" :avatarFileId="avatarFileId">
			</wxChat>
		</section>
		<footer v-show="isActive" class="Jmzx_footer">
			<div class="component-dialogue-bar">
				<section class="component-dialogue-bar-person">
					<span class="iconfont icon-jianpan" v-show="!currentChatWay" @click="currentChatWay=true"></span>
					<span class="iconfont icon-Voice" v-show="currentChatWay" @click="currentChatWay=false"></span>
					<div class="chat-way" v-show="!currentChatWay">
						<div class="chat-say" v-press>
							<span class="one">按住 说话</span>
							<span class="two">松开 结束</span>
						</div>
					</div>
					<div class="chat-way" v-show="currentChatWay">
						<input class="chat-txt" type="text" v-model="inputmessage" @input="whatInput" @focus="focusIpt" @blur="blurIpt" :class="{lightborder : light}" @keyup.enter="enterThing" />
					</div>
					<span v-show="false" class="iconfont icon-smile"></span>
					<span class="send" v-show="light" @click="clickSend">
						<span>发送</span>
					</span>
					<span v-show="!light" class="iconfont icon-jia" @click="bottomShow"></span>
					<div class="recording" style="display: none;" ref="recording">
						<div class="recording-voice" style="display: none;" ref="recordingVoice">
							<div class="voice-inner">
								<div class="voice-icon"></div>
								<div class="voice-volume">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
							<p>手指上划,取消发送</p>
						</div>
						<div class="recording-cancel" ref="recordingCancel" style="display: none;">
							<div class="cancel-inner"></div>
							<p>松开手指,取消发送</p>
						</div>
					</div>
				</section>
				<transition :name="move" type="animation">
					<section v-show="clickmore" class="foot_bottom">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<ul class="clear">
										<li>
											<div class="swiper_icon iconfont icon-xiangce" @click="clickIcon('xc')"></div>
											<div class="swiper_text" @click="clickIcon('xc')">
												相册
											</div>
										</li>
										<li>
											<div class="swiper_icon iconfont icon-camera" @click="clickIcon('cm')"></div>
											<div class="swiper_text" @click="clickIcon('cm')">
												拍摄
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div class="swiper-pagination"></div>
						</div>
					</section>
				</transition>
			</div>
		</footer>
	</div>
</template>

<script>
import wxChat from './wxChat.vue'
import { commonAjax } from '../../api/api'
import { MessageBox } from 'mint-ui'
export default {
	data() {
		return {
			inputmessage: '', //输入的文本内容
			light: false, //输入框不为空时，input下边框变色
			clickmore: false, //点击加号底部显示、隐藏
			isActive: true,
			currentChatWay: true, //ture为键盘打字 false为语音输入
			operaterType: "",
			move: "",
			avatarFileId: "",
			cancelRecording: false,
			serviceRecordId: this.$route.query.serviceRecordId + "",
//			targetUserId:this.$route.query.targetUser,
			openuser:'',
			eId:'',
		}
	},
	components: {
		wxChat
	},
	directives: {
		press: {
			inserted(element, binding, vnode) {
				let me = vnode.context
				let recording = me.$refs.recording,
					recordingVoice = me.$refs.recordingVoice,
					recordingCancel = me.$refs.recordingCancel,
					startTx, startTy, startTime, endTime;
				element.addEventListener('touchstart', function (e) {
					me.startRecord = false
					// 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
					let touches = e.touches[0]
					startTx = touches.clientX
					startTy = touches.clientY
					e.preventDefault()
					startTime = new Date().getTime()
					me.voiceTimer = setTimeout(function () {
						wx.startRecord({
							success: function () {
								me.startRecord = true
								element.className = "chat-say say-active"
								recording.style.display = recordingVoice.style.display = "block"
							},
							cancel: function () {
								alert('用户拒绝授权录音');
							}
						});
					}, 300);
				}, false)
				element.addEventListener('touchend', function (e) {
					element.className = "chat-say"
					recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
					console.log('end')
					e.preventDefault()
					endTime = new Date().getTime()
					if ((endTime - startTime) < 300) {
						startTime = endTime = 0
						clearTimeout(me.voiceTimer)
					} else {
						wx.stopRecord({
							success: function (res) {
								if (!me.cancelRecording && me.startRecord) {
									let localId = res.localId;
									me.uploadVoice(localId)
								}
								me.cancelRecording = false
							},
							fail: function (res) {
								console.log(JSON.stringify(res));
							}
						})
					}
				}, false)
				element.addEventListener('touchmove', function (e) {
					let touches = e.changedTouches[0],
						endTx = touches.clientX,
						endTy = touches.clientY,
						distanceX = startTx - endTx,
						distanceY = startTy - endTy;
					if (distanceY > 50) {
						console.log('chat-say-none')
						element.className = "chat-say"
						recordingVoice.style.display = "none"
						recordingCancel.style.display = "block"
						me.cancelRecording = true
					} else {
						console.log('chat-say-block')
						element.className = "chat-say say-active"
						recordingVoice.style.display = "block"
						recordingCancel.style.display = "none"
					}
					// 阻断事件冒泡 防止页面被一同向上滑动
					e.preventDefault()
				}, false);
			}
		}
	},
	activated() {
		if (this.$route.query.isActive == "false") {
			this.isActive = false
		} else if (this.$route.query.isActive == "true") {
			this.isActive = true
		} else if (!this.$route.query.isActive) {
			this.isActive = false
		} else {
			this.isActive = true
		}
		this.targetType = this.$route.query.targetType
		this.targetUser = this.$route.query.targetUser
		this.operaterType = this.targetType == "041" ? "031" : "041"
		console.log(this.$route.query.targetUser)
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
		if (this.targetType == "041") {//当前人是医生
			this.avatarFileId = userInfo.body.userAvatar + ""
			this.operateUserName = userInfo.body.userName
			this.operateId = userInfo.body.userId
			this.accessToken = userInfo.properties.accessToken
		} else {//当前人是患者
			this.avatarFileId = userInfo.body.userAvatar + ""
			this.operateUserName = userInfo.body.userName
			this.operateId = userInfo.body.userId
			this.accessToken = userInfo.properties.accessToken
		}
	},
	mounted() {
		let time = new Date().getTime().toString().substr(0, 10)
		let params = {
			url: location.href.split('#')[0].split("?")[0],
			timestamp: time
		}
		commonAjax([params], 'pcn.imChatService', 'getWxGetJsapiSign').then(res => {
			let data = res.body.data
			wx.config({
				debug: false, // 开启调试模式
				appId: data.appid, // 必填，公众号的唯一标识
				timestamp: time, // 必填，生成签名的时间戳
				nonceStr: data.noncestr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: ['chooseImage', 'uploadImage', 'uploadVoice', 'startRecord', 'stopRecord', 'playVoice']
			})
			wx.ready(function () {
				wx.onVoiceRecordEnd({
					// 录音时间超过一分钟没有停止的时候会执行 complete 回调
					complete: function (res) {
						if (!me.cancelRecording) {
							let localId = res.localId;
							me.uploadVoice(localId)
						}
						me.cancelRecording = false
					}
				});
				if (!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true') {
					wx.startRecord({
						success: function () {
							localStorage.rainAllowRecord = 'true';
							wx.stopRecord();
						},
						cancel: function () {
							alert('用户拒绝授权录音');
						}
					});
				}
			})
		})
	},
	methods: {
		whatInput() {
			if (this.inputmessage.replace(/\s+/g, "") == '') {
				this.light = false;
			} else {
				this.light = true;
			}
		},
		bottomShow() {
			this.move = "move"
			this.clickmore = true;
			this.$refs.wxChat.scrollToBottom()
		},
		// 解决输入法被激活时 底部输入框被遮住问题
		focusIpt() {
			this.move = ""
			this.clickmore = false
			this.$nextTick(() => {
				this.$refs.wxChat.scrollToBottom()
				this.timer = setInterval(function () {
					document.body.scrollTop = document.body.scrollHeight
				}, 100)
			})
		},
		blurIpt() {
			clearInterval(this.timer)
		},
		// 点击空白区域，菜单被隐藏
		MenuOutsideClick(e) {
			this.move = "move"
			this.clickmore = false;
			if (this.$refs.wxChat) this.$refs.wxChat.reset()
		},
		enterThing() {
			if (this.light) {
				this.clickSend()
			}
		},
		clickSend() {
			let me = this

			let inputmessage = me.inputmessage;
			me.inputmessage = '';

			let params = {
				content: inputmessage,
				contentType: "01"
			}

			me.$refs.wxChat.addBottom({
					operaterType: me.operaterType,
					consultRecordId: new Date().getTime(),
					contentType: '01',
					content: inputmessage,
					operateTime: new Date().toLocaleString()
				})
			me.$nextTick(() => {
				me.light = false
				me.saveMsg(params)
			})

		},
		getOperater(callback) {
			commonAjax(["hcn.shenzhen",this.operateId], 'pcn.residentSignService', 'querySignApplyInfo').then(res => {
				console.log(res)
				var operateUser = res.body.mpiId
				me.openuser = res.body.mpiId
				callback(operateUser)
			})
		},
		
		
		saveMsg(params) {
			console.log(this)
			var me = this
			me.getOperater(function (operateUser) {
				commonAjax([{
					accessToken: me.accessToken,
					serviceType: "wx",
					serviceRecordId: me.serviceRecordId,
					targetType: "031",
//					operateUserName: JSON.parse(sessionStorage.getItem('userInfo')).body.userName,
					operateUserName: me.operateUserName,
					operateUser: JSON.parse(sessionStorage.getItem('common_signApplyInfo')).mpiId,
					operaterType: "041",
					targetUser: JSON.parse(sessionStorage.getItem('common_signApplyInfo')).doctorId,
					content: params.content,
					contentType: params.contentType,
					pictureFileIdString: ""
				}], 'pcn.imChatService', 'saveChatRecord').then(res => {
					var voiceImageFile = res.body.voiceImageFile
					if (params.contentType == "03") {// 图片
						me.$refs.wxChat.addBottom({
								operaterType: me.operaterType,
								consultRecordId: new Date().getTime(),
								contentType: '03',
								content: voiceImageFile,
								operateTime: new Date().toLocaleString()
							})
					} else if (params.contentType == "02") {//语音
						me.$refs.wxChat.addBottom({
								operaterType: me.operaterType,
								consultRecordId: new Date().getTime(),
								contentType: '02',
								content: voiceImageFile,
								operateTime: new Date().toLocaleString()
							})
					}
				})
			})
		},
		clickIcon(imgTpye) {
			let me = this
			if (imgTpye == "xc") {
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						me.uploadImg(localIds[0])
					}
				});
			} else if (imgTpye == "cm") {
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						me.uploadImg(localIds)
					}
				});
			}
		},
		uploadImg(src) {
			let me = this
			//发送图片消息后 上传服务器 
			me.$nextTick(() => {
				wx.uploadImage({
					localId: src, // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 0, // 默认为1，显示进度提示
					success: function (res) {
						let serverId = res.serverId; // 返回图片的服务器端ID
						//返回服务器地址后 将地址发送后台 
						let params = {
							content: serverId,
							contentType: "03"
						}
						me.saveMsg(params)
					},
					fail: function (res) {
						console.log(res.errMsg)
					}
				})

			})
		},
		uploadVoice(src) {
			let me = this
			//发送语音消息后，上传服务器
			me.$nextTick(() => {
				wx.uploadVoice({
					localId: src, // 需要上传的音频的本地ID，由stopRecord接口获得
					isShowProgressTips: 0, // 默认为1，显示进度提示
					success: function (res) {
						let serverId = res.serverId; // 返回音频的服务器端ID
						//返回服务器地址后 将地址发送后台
						let params = {
							content: serverId,
							contentType: "02"
						}
						me.saveMsg(params)
					},
					fail: function (res) {
						console.log(res.errMsg)
					}
				})

			})
		},
		closeMsg() {
			let me = this
			MessageBox.confirm('确定已经完成回复，结束本次咨询?', {
				callback: function (action) {
					if (action == "confirm") {
						me.isActive = false
						me.$refs.wxChat.addBottom({
								operaterType: me.operaterType,
								consultRecordId: new Date().getTime(),
								contentType: '10000',
								content: "本次咨询已结束",
								operateTime: new Date().toLocaleString()
							})
						console.log(me.$refs.wxChat.dataArray)
						me.$refs.wxChat.dataArray.forEach(item=>{
							if(item.operaterType=="041"&&item.targetType=="031"){
								me.eId = item.operateUser
							}
						})
						let params = [{"mpiId":me.eId,"eId":me.$route.query.serviceRecordId}]
						commonAjax(params, 'pcn.imChatService', 'endChatService').then(res => {
			                if (res.code === 200) {
			                    // console.log(res)
			                    
			               		}
			           		})
					}
				}
			})
		},
	}
}
</script>

<style scoped>
@import "./assets/font/iconfont.css";
.Jmzx_detail.Jmzx_pageContainer {
	width: 100%;
	height: 100%;
	position: absolute;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	flex-direction: column;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	background-color: #F5F5F5;
}

.Jmzx_detail .Jmzx_header {
	width: 100%;
	height: 1.54rem;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
}

.Jmzx_detail .mint-header {
	height: 1rem;
	background-color: #fff;
	color: #26a2ff;
	font-size: 0.33rem;
}


.closeMsg {
	font-size: 14px;
}

.Jmzx_detail .mint-header-button {
	display: block;
	flex: 0;
}

.Jmzx_detail .Jmzx_header .tip {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 0.6rem;
	margin-top: 0.94rem;
	font-size: 0.28rem;
	background: #FFFF99;
	color: #FFAA0C;
}


.Jmzx_detail .Jmzx_header .tip-active {
	background: #D8F2FF;
	color: #26A2FF;
}

.Jmzx_detail .Jmzx_contend {
	width: 100%;
	height: calc(100% - 128px);
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	overflow: hidden;
}

.Jmzx_detail.footshow .Jmzx_contend {
	height: calc(100% - 268px);
}

.Jmzx_detail .Jmzx_footer {
	width: 100%;
	height: 50px;
	background: #f5f5f5;
}

.Jmzx_detail .Jmzx_footer::before {
	content: "";
	position: absolute;
	width: 200%;
	left: 0;
	top: 0;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	background-color: #e0e0e0;
	height: 1px;
	z-index: 2
}

.Jmzx_detail .component-dialogue-bar {
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 10000;
}

.Jmzx_detail .component-dialogue-bar-person {
	width: 100%;
	height: 0.8rem;
	overflow: hidden;
	padding: 5px 0;
	-webkit-box-flex: 1;
	-webkit-flex-grow: 1;
	flex-grow: 1;
	-webkit-flex-basis: 4rem;
	flex-basis: 4rem;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: start;
	-webkit-justify-content: flex-start;
	justify-content: flex-start;
	-webkit-box-align: start;
	-webkit-align-items: flex-start;
	align-items: flex-start;
	background-color: #ffffff
}

.Jmzx_detail .component-dialogue-bar-person::before {
	content: "";
	position: absolute;
	width: 200%;
	left: 0;
	top: 0;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	background-color: #b7b7b7;
	height: 1px;
	z-index: 2
}

.Jmzx_detail .component-dialogue-bar-person .iconfont {
	color: #7d7e83;
	-webkit-flex-basis: .8rem;
	flex-basis: .8rem;
	font-size: .6rem;
	-webkit-box-flex: 0;
	-webkit-flex-grow: 0;
	flex-grow: 0;
	vertical-align: middle;
	line-height: .8rem;
}

.Jmzx_detail .icon-Voice:before,
.Jmzx_detail .icon-jia:before,
.Jmzx_detail .icon-jianpan:before,
.Jmzx_detail .icon-smile:before {
	margin-left: 5px;
	margin-right: 5px;
}

.Jmzx_detail .icon-jia {
	margin-right: 8px;
}

.Jmzx_detail .icon-jianpan,
.Jmzx_detail .icon-Voice {
	margin-left: 5px;
	margin-right: 5px;
}

.Jmzx_detail .chat-way {
	vertical-align: middle;
	padding: 4px 0px;
	height: 100%;
	-webkit-box-flex: 1;
	-webkit-flex-grow: 1;
	flex-grow: 1;
	-webkit-flex-basis: 4rem;
	line-height: .8rem;
	flex-basis: 4rem;
}

.Jmzx_detail .chat-way .chat-say {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	border-radius: 6px;
	overflow: hidden;
	padding: 0 10px;
	width: 184%;
	height: 160%;
	color: #565656;
	border: 1px solid #7d7e83;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	font-size: 30px
}

.Jmzx_detail .chat-way .chat-say.say-active {
	background-color: #c6c7ca
}

.Jmzx_detail .chat-way .two {
	display: none
}

.Jmzx_detail .chat-way .chat-say.say-active .two {
	display: block
}

.Jmzx_detail .chat-way .chat-say.say-active .one {
	display: none
}

.Jmzx_detail .chat-way .chat-txt {
	border-radius: 6px;
	overflow: hidden;
	padding: 0 10px;
	width: 184%;
	height: 160%;
	border: 1px solid #7d7e83;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	font-size: 30px
}

.Jmzx_detail .recording {
	position: fixed;
	left: 50%;
	top: 45%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	width: 2.8rem;
	height: 2.8rem;
	padding: 5px;
	background-color: rgba(0, 0, 0, 0.5);
	color: #ffffff;
	border-radius: 5px;
	font-size: 14px;
	text-align: center
}

.Jmzx_detail .recording-voice .voice-inner {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	height: 2.2rem;
}

.Jmzx_detail .voice-inner .voice-icon {
	width: 1.1rem;
	height: 1.8rem;
	background: url(./assets/images/recording-bkg.png) no-repeat center center;
	background-size: contain;
}

.Jmzx_detail .voice-inner .voice-volume {
	width: .6rem;
	height: 1.1rem;
}

.Jmzx_detail .lightborder {
	border-color: #19ad17;
}

.Jmzx_detail .Jmzx_footer .send {
	width: .8rem;
	height: .8rem;
	margin-right: 8px;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}

.Jmzx_detail .Jmzx_footer .send span {
	height: .64rem;
	width: .8rem;
	border-radius: 5px;
	background: #16af17;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	font-size: 14px;
	color: #fff;
}

.Jmzx_detail .voice-inner .voice-volume span {
	display: block;
	height: 2px;
	margin-top: 4px;
	min-width: 8px;
	float: left;
	clear: both;
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	-webkit-animation-timing-function: linear;
	animation-timing-function: linear;
	-webkit-animation-duration: 2000ms;
	animation-duration: 2000ms;
	background-color: #e4e4e5
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(1) {
	width: .48rem;
	visibility: hidden
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(2) {
	width: .44rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(3) {
	width: .4rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(4) {
	width: .36rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(5) {
	width: .32rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(6) {
	width: .28rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(7) {
	width: .24rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(8) {
	width: .2rem
}

.Jmzx_detail .voice-inner .voice-volume span:nth-child(9) {
	width: 8px
}

.Jmzx_detail .recording-cancel p {
	border-radius: 3px;
}

.Jmzx_detail .cancel-inner {
	width: 2.2rem;
	height: 2.2rem;
	margin: 0 auto;
	background-image: url(./assets/images/record-cancel.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain
}

.Jmzx_detail .swiper-container {
	width: 100%;
	height: 140px;
	overflow: hidden;
}

.Jmzx_detail .swiper-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 1;
	display: -webkit-box;
	display: -moz-box;
	display: -webkit-flex;
	display: flex;
	-webkit-transition-property: -webkit-transform;
	-moz-transition-property: -moz-transform;
	-o-transition-property: -o-transform;
	transition-property: transform;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}

.Jmzx_detail .swiper-slide {
	-webkit-flex-shrink: 0;
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	position: relative;
}

.Jmzx_detail .foot_bottom {
	background: #f5f5f5;
}

.Jmzx_detail .foot_bottom .swiper-container .swiper-slide ul {
	padding: 32px 28px 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.Jmzx_detail .foot_bottom .swiper-container .swiper-slide ul li {
	float: left;
	margin-right: 24px;
}

.Jmzx_detail .foot_bottom .swiper-container .swiper-slide ul li .swiper_icon {
	width: 1.2rem;
	height: 1.2rem;
	background: #fcfcfc;
	border: 1px solid #d3d3d3;
	border-radius: 10px;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}

.Jmzx_detail .icon-xiangce,
.Jmzx_detail .icon-camera {
	color: rgb(122, 129, 135);
	font-size: 32px;
}

.Jmzx_detail .foot_bottom .swiper-container .swiper-slide ul li .swiper_text {
	width: 100%;
	margin-top: 12px;
	text-align: center;
	font-size: 12px;
	color: #7a8187;
}

.move-enter-active {
	animation: move-in .5s;
}

.move-leave-active {
	animation: move-out .5s;
}

@-webkit-keyframes move-in {
	0% {
		height: 0px
	}
	100% {
		height: 140px
	}
}

@-webkit-keyframes move-out {
	0% {
		height: 140px
	}
	100% {
		height: 0px
	}
}

@keyframes move-in {
	0% {
		height: 0px
	}
	100% {
		height: 140px
	}
}

@keyframes move-out {
	0% {
		height: 140px
	}
	100% {
		height: 0px
	}
}
</style>
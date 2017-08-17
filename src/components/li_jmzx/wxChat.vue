<template>
    <div class="wxchat-container" :style="{backgroundColor: wrapBg}">
        <div class="window-view-container">
            <div v-if="isUpperLaoding" class="top-loading">
                <div class="loader">加载中...</div>
            </div>
            <!-- main -->
            <ScrollLoader @scroll-to-top="refresh" ref="scroller">
                <div class="message">
                    <!-- data is empty -->
                    <div class="loading" v-if="isNone">
                        <div style="margin-top: 50%;text-align:center; font-size: 16px;">
                            <span>未查找到聊天记录</span>
                        </div>
                    </div>
                    <ul>
                        <li class="an-move-right">
                            <p v-if="isRefreshedAll" class="time system">
                                <span>已无更多数据</span>
                            </p>
                        </li>
                        <li v-for="(message, index) in dataArray" :key="message.consultRecordId" :class="message.operaterType==operaterType?'an-move-right':'an-move-left'">
                            <p class="time">
                                <span v-text="message.operateTime"></span>
                            </p>
                            <p v-if="message.contentType==10000" class="time system">
                                <span v-html="message.content"></span>
                            </p>
                            <div v-else :class="'main' + (message.operaterType==operaterType?' self':'')">
                                <img class="avatar" width="45" height="45" :src="message.operaterType==operaterType? message.operateUserPicture: message.targetUserPicture" @click="watchInfo(message)">
                                <!-- 文本 -->
                                <div class="text" v-emotion="message.content" v-if="message.contentType=='01'"></div>
    
                                <!-- 图片 -->
                                <div class="text" v-else-if="message.contentType=='03'" @click="watchPic(message)">
                                    <img :src="message.content" class="image" alt="聊天图片" @load="imgLoad">
                                </div>
    
                                <!-- 其他 -->
                                <div v-else-if="message.contentType=='02'" class="text voice" @click="playVoice(message)">
                                    <span class="iconfont" :class="[message.operaterType==operaterType ? 'icon-message-voice-right' : 'icon-message-voice-left']"></span>
                                </div>
                            </div>
                        </li>
    
                    </ul>
                </div>
    
            </ScrollLoader>
    
        </div>
    <audio hidden="true" ref="audio"></audio>
    </div>
</template>

<script>
import ScrollLoader from './scroller.vue'
import toEmotion from './emotion'
import { commonAjax, imgUrl, voiceUrl } from '../../api/api'
export default {
    name: "wxChat",

    components: {
        ScrollLoader
    },

    props: {
        isActive: {
            type: Boolean,
            default: true
        },

        avatarFileId: {
            type: String
        },

        wrapBg: {
            type: String,
            default: '#efefef'
        }
    },

    data() {
        return {
            isUpperLaoding: false,
            isRefreshedAll: true,
            isNone: false,
            dataArray: [],
            pics: [],
            serviceRecordId: "",
            isPaly:false
        }
    },
    directives: {
        emotion: {
            bind: function (el, binding) {
                el.innerHTML = toEmotion(binding.value)
            }
        }
    },
    activated() {
        let me = this
        me.dataArray = []
        this.operaterType = this.$route.query.targetType == "041" ? "031" : "041"
        this.serviceRecordId = this.$route.query.serviceRecordId + ""
        let params = {
            pageSize: 20,
            serviceRecordId: me.serviceRecordId
        }
        commonAjax([params], 'pcn.imChatService', 'qryChatRecordData').then(res => {
        	
            let data = res.body
            if (data.total > 0) {
                data.rows.forEach(function (item) {
                    if (item.contentType === "02") {// 语音
                        item.content = voiceUrl(item.voiceImageFile)
                    } else if (item.contentType === "03") {// 图片
                        item.content = imgUrl(item.voiceImageFile)
                        me.pics.push(item.content)
                    }
                    if (item.operaterType == me.operaterType) {
                        item.operateUserPicture = imgUrl(item.operateUserPicture)
                    } else {
                        item.targetUserPicture = imgUrl(item.operateUserPicture)
                    }
                }, this);

                me.dataArray = me.dataArray.concat(data.rows)
                me.$nextTick(() => {
                    me.scrollToBottom()
                })

            } else {
                me.isNone = true
            }
        })
    },

    methods: {
        addBottom(data) {
            data.operateUserPicture = imgUrl(this.avatarFileId)
            if (data.contentType == "03") {// 图片
                data.content = imgUrl(data.content)
                this.pics.push(data.content)
            } else if (data.contentType == "02") {//语音
                data.content = voiceUrl(data.content)
            }
            this.dataArray.push(data)
            this.$nextTick(() => {
                this.scrollToBottom()
            })
        },

        imgLoad(){
            this.scrollToBottom()
        },

        watchPic(msg) {
            wx.previewImage({
                current: msg.content, // 当前显示图片的http链接
                urls: this.pics // 需要预览的图片http链接列表
            })
        },

        watchInfo(msg) {
            console.log(msg.operaterType)
        },

        reset() {
            var me = this
            setTimeout(function () {
                if (me.$refs.scroller) me.$refs.scroller.resetSize()
            }, 50);
        },

        playVoice(msg) {
            var audio = this.$refs.audio
            audio.setAttribute("src",msg.content)
            audio.load()
            audio.play()
        },

        previewImage(msg) {
            wx.previewImage({
                current: msg.content, // 当前显示图片的http链接
                urls: [msg.content] // 需要预览的图片http链接列表
            })
        },

        addTop(data) {
            this.dataArray = data.reverse().concat(this.dataArray); //倒序合并
        },

        scrollToBottom() {
            var me = this
            if (me.$refs.scroller) me.$refs.scroller.resetSize()
            setTimeout(function () {
                let scrollHeight = me.$refs.scroller.$el.scrollHeight - me.$refs.scroller.$el.offsetHeight
                me.$refs.scroller.scrollTop(scrollHeight)
            }, 50);
        },

        //向下拉刷新
        refresh() {
            let me = this;
            if (me.isUpperLaoding || !me.isActive) {
                me.$refs.scroller.topDone()
                return;
            }

            if (me.isRefreshedAll) {
                me.$refs.scroller.topDone()
                me.isUpperLaoding = false;
                return;
            }

            try {
                me.isUpperLaoding = true
                setTimeout(function () {
                    //加载数据
                    let data = [
                        {
                            operaterType: me.operaterType == "041" ? "031" : "041",
                            consultRecordId: new Date().getTime(),
                            contentType: '01',
                            content: new Date().getTime() + "",
                            operateTime: new Date().toLocaleString()
                        }
                    ]

                    if (data.length == 0) {
                        me.isRefreshedAll = true;
                        me.$refs.scroller.topDone()
                    } else {
                        me.dataArray = data.reverse().concat(me.dataArray); //倒序合并
                        me.$refs.scroller.topDone()
                    }
                    me.isUpperLaoding = false;

                }, 1000);
            } catch (error) {
                me.isUpperLaoding = false;
            }
        }

    },
	updated: function () {
		this.reset()
	}
}
</script>


<style scoped>
.wxchat-container {
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: hidden;
}

.window-view-container {
    background: #F5F5F5;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
    height: 100%;
    position: relative;
    z-index: 101;
}

.loading {
    text-align: center;
    color: #b0b0b0;
    line-height: 100px;
}

.top-loading {
    width: 100%;
    height: 40px;
    position: relative;
    overflow: hidden;
    text-align: center;
    margin: 5px 0;
    color: #999;
    font-size: 13px;
}

.loader {
    font-size: 10px;
    margin: 8px auto;
    text-indent: -9999em;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #999;
    background: -moz-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #999 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1s infinite linear;
    animation: load3 1s infinite linear;
}

.loader:before {
    width: 50%;
    height: 50%;
    background: #999;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
}

.loader:after {
    background: #f5f5f5;
    width: 72%;
    height: 75%;
    border-radius: 68%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

@-webkit-keyframes load3 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes load3 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.message {
    padding: 10px 15px;
    background-color: #F5F5F5;
}

.message li {
    margin-bottom: 15px;
    left: 0;
    position: relative;
    display: block;
}

.message .time {
    margin: 10px 0;
    text-align: center;
}

.message .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 75px);
    min-height: 35px;
    line-height: 2.1;
    font-size: 15px;
    padding: 6px 10px;
    text-align: left;
    word-break: break-all;
    background-color: #fff;
    color: #000;
    border-radius: 4px;
    box-shadow: 0px 1px 7px -5px #000;
}

.message .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
    background: #fff;
}

.message .time>span {
    display: inline-block;
    padding: 0 5px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #DADADA;
}

.message .system>span {
    padding: 4px 9px;
    text-align: left;
}

.message .text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fff;
}

.message .self {
    text-align: right;
}

.message .self .avatar {
    float: right;
    margin: 0 0 0 10px;
}

.message .self .text {
    background-color: #9EEA6A;
}

.message .self .voice {
    text-align: right;
}

.message .self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #9EEA6A;
}

.message .image {
    max-width: 200px;
}

.message .voice {
    max-width: 200px;
    min-width: 50px;
}

img.static-emotion-gif,
img.static-emotion {
    vertical-align: middle !important;
}

.an-move-left {
    left: 0;
    animation: moveLeft .7s ease;
    -webkit-animation: moveLeft .7s ease;
}

.an-move-right {
    left: 0;
    animation: moveRight .7s ease;
    -webkit-animation: moveRight .7s ease;
}

@keyframes moveRight {
    0% {
        left: -20px;
        opacity: 0
    }
    ;
    100% {
        left: 0;
        opacity: 1
    }
}

@-webkit-keyframes moveRight {
    0% {
        left: -20px;
        opacity: 0
    }
    ;
    100% {
        left: 0px;
        opacity: 1
    }
}

@keyframes moveLeft {
    0% {
        left: 20px;
        opacity: 0
    }
    ;
    100% {
        left: 0px;
        opacity: 1
    }
}

@-webkit-keyframes moveLeft {
    0% {
        left: 20px;
        opacity: 0
    }
    ;
    100% {
        left: 0px;
        opacity: 1
    }
}
</style>


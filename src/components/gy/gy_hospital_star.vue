<template>
	<div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
		<div class="header">
			<mt-header :title="orgName">
				<a slot="left" @click='$router.go(-1)'>
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
		</div>
		<div class="session">
			<div class="stars">
				<span class="star_label">医院环境</span>
			    <i class="icon-star-full lightdown" v-for='(item,index) in starItems' @click='markStar(index,$event)' ref='starItems' :id='contentType'></i>
			</div>
			<div class="stars">
				<span class="star_label">医院服务</span>
			    <i class="icon-star-full lightdown" v-for='(item,index) in starItems1' @click='markStar1(index,$event)' ref='starItems1' :id='contentType1'></i>
			</div>
			<div class="stars">
				<span class="star_label">等待时间</span>
			    <i class="icon-star-full lightdown" v-for='(item,index) in starItems2' @click='markStar2(index,$event)' ref='starItems2' :id='contentType2'></i>
			</div>
			<div class="gy_butn">
				<mt-button type="primary" @click="submitStar">发表评论</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/css/gy_style.css';
	export default {
		data: function() {
			return {
				orgName: this.$route.query.orgName,
				starItems: ['', '', '', '', ''],
				starItems1: ['', '', '', '', ''],
				starItems2: ['', '', '', '', '']
			}
		},
		props: ['contentType','contentType1','contentType2'],
		mounted() {
		},
		methods: {
			markStar(index,e) {
	            let starArr = this.$refs.starItems
	            for (var i = 0; i < starArr.length; i++) {
	                starArr[i].classList.remove('lighton')
	            }
	            for (let i = 0; i <= index; i++) {
	                starArr[i].classList.add('lighton')
	            }
	            let str = e.target.id + '-' + (index + 1)
	            this.$emit('marked',str)
	        },
			markStar1(index,e) {
	            let starArr = this.$refs.starItems1
	            for (var i = 0; i < starArr.length; i++) {
	                starArr[i].classList.remove('lighton')
	            }
	            for (let i = 0; i <= index; i++) {
	                starArr[i].classList.add('lighton')
	            }
	            let str = e.target.id + '-' + (index + 1)
	            this.$emit('marked',str)
	        },
			markStar2(index,e) {
	            let starArr = this.$refs.starItems2
	            for (var i = 0; i < starArr.length; i++) {
	                starArr[i].classList.remove('lighton')
	            }
	            for (let i = 0; i <= index; i++) {
	                starArr[i].classList.add('lighton')
	            }
	            let str = e.target.id + '-' + (index + 1)
	            this.$emit('marked',str)
	       	},
	       	submitStar(){
	       		Toast("评价成功")
	       		this.$router.go(-1)
	       	}
		},
		watch: {
		}
	}
</script>
<style scoped>
	.session{
		padding-top: .5rem;
	}
	.stars {
		padding: .4rem .8rem;
		height: .4rem;
	}
	.stars .star_label{
		font-size: .4rem;
		float: left;
		width: 2rem;
	}
	.stars i {
		height: .4rem;
		float: left;
	}
	
	.stars .lightdown {
		color: #ccc;
	}
	
	.stars .lighton {
		color: #fc0;
	}
	
	@font-face {
		font-family: 'icomoon';
		src: url('../../assets/font/star.ttf');
		font-weight: normal;
		font-style: normal;
	}
	
	[class^="icon-"],
	[class*=" icon-"] {
		font-family: 'icomoon' !important;
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		letter-spacing: 0;
		-webkit-font-feature-settings: "liga";
		-moz-font-feature-settings: "liga=1";
		-moz-font-feature-settings: "liga";
		-ms-font-feature-settings: "liga" 1;
		font-feature-settings: "liga";
		-webkit-font-variant-ligatures: discretionary-ligatures;
		font-variant-ligatures: discretionary-ligatures;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-star-full:after {
		content: "\e9d9";
		font-size: 20px;
		display: block;
	}
	.gy_butn{width:80%;margin:0 auto;margin-top:.6rem;}
	.gy_butn button{width:100%;background-color: #4eab52;}
</style>
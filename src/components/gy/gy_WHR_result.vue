<template>
	<div class="mdetection">
		<div class="header">
			<mt-header title="腰臀比">
				<a @click='$router.go(-1)' slot="left">
					<mt-button icon="back"></mt-button>
				</a>
				<mt-button slot="right"><img src="../../assets/img/mao_sharing.png"></mt-button>
			</mt-header>
			<div class="zhishukuai">
				<div class="gy_body_img">
					<img :src="bodyImg"/>
				</div>
				<div class="gy_body_right">
					<div class="gy_body_type">
						<span class="gy_body_span_left">身材</span>
						<span class="gy_body_span_right">{{stature}}</span>
					</div>
					<div class="gy_body_whr">
						<span class="gy_body_span_left">腰臀比</span>
						<span class="gy_body_span_right">{{whr}}</span>
					</div>
					<div class="gy_body_info">
						<div class="gy_body_div_left">
							<img src="../../assets/img/gy_waistline.png"/>
							<p>{{waistline}}cm</p>
						</div>
						<div class="gy_body_div_center">:</div>
						<div class="gy_body_div_right">
							<img src="../../assets/img/gy_hipline.png"/>
							<p>{{hipline}}cm</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="instruction">
			<div class="instruction_tu">
				<p class="healthAdvice_title">健康建议</p>
				<p class="healthAdvice">{{healthAdvice}}</p>
				<p class="healthAdvice_bottom">计算结果仅供参考，不能作为指导医疗的唯一依据！</p>
			</div>
		</div>
	</div>
</template>
<script>
	import { Header, Button, Toast } from 'mint-ui';
	import "../../assets/css/mao_style.css";
	export default {
		data: function() {
			return {
				sex: this.$route.query.sex,				//1: 男，2: 女
				waistline: this.$route.query.waistline,	//腰围
				hipline: this.$route.query.hipline,		//臀围
				whr: 0,									//腰臀比
				bodyType: '',							//身材类型
				bodyImg: '',							//身体图片
				stature: '',							//身材类型（中文）
				healthAdvice: '',						//健康建议
				dataDictionary: {
					"pear": "您目前体型偏瘦，请适当调整饮食结构，增加富含营养的食物摄入（如蔬菜水果、肉制品、鱼类等），同时加强锻炼。",
					"normal": "您目前体型属正常范围，请继续保持。",
					"apple": "您目前体型有肥胖可能，腹部脂肪堆积较多。请加强运动，调整饮食结构，" + 
							"补充富含膳食纤维的食物（如蔬菜水果、粗粮杂粮、豆类及菌藻类食物），" +
							"减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。同时，" +
							"您患心血管疾病、糖尿病、高血压、高血脂等疾病风险较高，请定期体检。"
				}
			}
		},
		mounted() {
			this.whr = (this.waistline / this.hipline).toFixed(2)
			this.bodyType = (((this.sex == 1 && this.whr < 0.85) || (this.sex == 2 && this.whr < 0.67)) && "pear") || 
						  	(((this.sex == 1 && this.whr >= 0.85 && this.whr <= 0.95) || (this.sex == 2 && this.whr >= 0.67 && this.whr <= 0.80)) && "normal") || 
						  	(((this.sex == 1 && this.whr > 0.95) || (this.sex == 2 && this.whr > 0.80)) && "apple")
			this.bodyImg = require("../../assets/img/gy_" + (this.sex == 1 ? "man" : "woman") + "_" + this.bodyType + ".png")
			this.stature = (this.bodyType == "pear" && "梨形") || 
						   (this.bodyType == "normal" && "正常") || 
						   (this.bodyType == "apple" && "苹果形")
			this.healthAdvice = this.dataDictionary[this.bodyType]
		}
	}
</script>
<style scoped>
	html,
	body {
		width: 100%;
		height: 100%;
		background: #FAFAFA;
	}
	.mdetection {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #fafafa;
	}
	.mdetection .header {
		height: 5rem;
		width: 100%;
		background: url("../../assets/img/mao_navigation-bg.png")
	}
	.mdetection .header .mint-header {
		background: hsla(147, 55%, 46%, 0);
	}
	.mdetection .instruction {
		width: 100%;
		height: 100%;
		padding-top: 5%;
	}
	.mdetection .instruction .instruction_tu {
		height: 5rem;
		width: 90%;
		margin: 0 auto;
		background: url("../../assets/img/mao_suggest.png") no-repeat;
		background-size:100% 100%;
		position: relative;
	}
	.mdetection .instruction .instruction_tu p {
		font-size: .3rem;
	}
	.gy_body_img{
		width: 40%;
		height: 3.3rem;
		float: left;
		padding-top: .5rem;
	}
	.gy_body_img img{
		height: 100%;
		margin: 0 auto;
		display: block;
	}
	.gy_body_right{
		width: 55%;
		height: 3.3rem;
		float: right;
		margin-left: 5%;
		letter-spacing: 3px;
	}
	.gy_body_right span{
		display: inline-block;
		margin-right: .2rem;
	}
	.gy_body_type{
		color: #F3EF70;
		margin-top: .1rem;
	}
	.gy_body_type .gy_body_span_left{
		font-size: .4rem;
	}
	.gy_body_type .gy_body_span_right{
		font-size: .5rem;
	}
	.gy_body_whr{
		font-size: .5rem;
		color: #fafafa;
		margin: .4rem 0;
	}
	.gy_body_info div {
		width: 30%;
		height: 1rem;
		float: left;
		text-align: center;
		color: #fafafa;
	}
	.gy_body_info img {
		width: .6rem;
		display: block;
		margin: 0 auto;
	}
	.gy_body_info p{
		font-size: .3rem;
		margin-top: .2rem;
	}
	.gy_body_info .gy_body_div_center{
		font-size: .6rem;
	}
	.healthAdvice_title {
		text-align: center;
		line-height: 1rem;
	}
	.healthAdvice{
		padding-left: 1.4rem;
		line-height: .4rem;
	}
	.mdetection .instruction .instruction_tu .healthAdvice_bottom{
		position: absolute;
		bottom: .3rem;
	    left: .3rem;
	    font-size: .25rem;
	}
</style>
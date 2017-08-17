<template>
	<div class="header_groud">
		<mt-header title="中医体质辨别" style="background:#34B26E;color:#fff">
			<a slot="left" @click='$router.push("/zy_service")'>
				<mt-button icon="back"></mt-button>
			</a>
			<!--<a slot="left" @click='$router.push("/xie_tvm_constitution")'>
				<mt-button icon="back"></mt-button>
			</a>-->
		</mt-header>
		<p class="write">中医体质辨识，即以人的体质为认知对象，从体质状态及不同体质分类的特性，把握其健康与疾病的整体要素与个体差异的手段，从而制定防治原则，选择相应的治疗、预防、养生方法，进行“因人制宜”的干预。亿万苍生，九种体质，人各有质，体病相关；体质平和，健康之源，体质偏颇，百病之因。</p>
		<div class="padd">
			<mt-button @click.native="mask" type="default" size="large" style="color:#34B26E;border: 1px solid #34B26E;">体制辨别测试</mt-button>
			<mt-button @click.native="$router.push('xie_hostory')" type="default" size="large" style="color:#34B26E;border: 1px solid #34B26E;margin-top: .2rem; ">历史测试</mt-button>
		</div>

		<!--遮罩层-->
		<div class="mask" style="display: none;">
			<mt-popup popup-transition="popup-fade" style="z-index: 100;">
				<div class="sex">请选这性别</div>
				<p>
					<img @click="$router.push('/zbl_zytz')" src="../../assets/img/xie_boy.png" />
				</p>
				<img @click="$router.push('/zbl_zytz')" src="../../assets/img/xie_girl.png" />
				<!--关闭按钮-->
				<img @click= "close" id="xie_close" src="../../assets/img/xie_close.png" >
			</mt-popup>
		</div>
	</div>
	</div>
</template>
<script>
	import { Popup } from 'mint-ui';
	export default {
		components: {

		},
		data() {
			return {
				popupVisible: false,
				visible: '',
			}

		},
		computed: {

		},
		methods: {
			mask() {
				document.querySelector(".mask").style.display = "block"
				document.querySelector(".mint-popup").style.display = "block"
			},
			close(){
//				document.querySelector("#xie_close").parentNode.style.display = "none"
				document.querySelector(".mask").style.display = "none"
			}
		},
		mounted() {

		},
	}
</script>
<style lang="less" scoped>
	.header_groud {
		.write {
			 letter-spacing: 1px;
			font-size: .2rem;
			color: #333;
			padding: .3rem;
		}
		.padd {
			padding: .2rem;
		}
		.mint-popup {
			width: 6rem;
			height: 6rem;
			padding: .2rem;
			background: #fff;
			border: 1px solid red;
			text-align: center;
			background: #fff;
			.sex {
				font-size: .25rem;
			}
			img {
				margin-top: .5rem;
				width: 2rem;
				height: 2rem;
			}
		}
		.mask{
			position: absolute;
				top: 0;
				left: 0;
				right:0;
				bottom:0;
				width:100%;
				height:100%;
				background-color: #fff;
				opacity: .9;
		}
		#xie_close{
			position: absolute;
			right: .3rem;
			top: -.3rem;
			width: .5rem;
			height: .5rem;
		}
	}
	.mint-button--large{
		background-color:#fff;
	}
</style>

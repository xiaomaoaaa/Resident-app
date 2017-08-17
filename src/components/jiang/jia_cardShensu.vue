<template>
<div class="card-shensu">
	<div class="header">
		<router-link to='/jia_appeal'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">证件申诉</h1>
	</div>
	<div class="pad"></div>
	<div class="progress">
		<div class="pro">
			<dl class="item first">
				<dt class="cir">1</dt>
				<dd class="des">资料验证</dd>
			</dl>
			<dl class="item second">
				<dt class="cir">2</dt>
				<dd class="des">身份证照片</dd>
			</dl>
			<dl class="item third">
				<dt class="cir">3</dt>
				<dd class="des">手机号验证</dd>
			</dl>
		</div>
	</div>
	<div class="content">
		<mt-field label="姓名" placeholder="请输入" v-model="name"></mt-field>
		<!-- <mt-cell title="姓名"><input placeholder="请输入"/></mt-cell> -->
		<mt-cell title="性别" :value="sex" is-link @click.native="showRadio"></mt-cell>
		<mt-cell title="证件类型" value="居民身份证"></mt-cell>
		<mt-field label="证件号码" placeholder="请输入" @change.native="validate($event)"v-model="cardNum"></mt-field>
		<mt-field label="联系电话" placeholder="请输入" type="tel" v-model="phoneNumber"></mt-field>
		<h2 class="tip">填写手机号必须真实有效，以便客服人员联系，我们将保护您的隐私</h2>
		<textarea :placeholder="tip" class="reason" @change="validateReason" v-model="reason"></textarea>
		<h2 class="number">{{reason.length}}/500</h2>
		<div class="next">
			<div class="promise">
				<span class="mark" v-show="!checked" @click="toggleChecked"></span><span class="mark checked" v-show="checked" @click="toggleChecked"></span>我已阅读并同意<span class="rule"  @click="toRule" >《申诉规则》</span>
			</div>
		</div>
		<!-- <mt-button>下一步</mt-button>
		<mt-button></mt-button> -->
		<div class="btn" v-show="checked" @click="toNext">
			下一步	
		</div>
		<div class="btn disable" v-show="!checked">
			下一步	
		</div>
	</div>
	<transition name="slide">
		<div class="radio" v-show="showRadios">
			<div class="header">
					<div class="back" @click="hideRadio">
					</div>
				<h1 class="title">性别</h1>
			</div>
			<div class="pad"></div>
			<div class="radio-content" @click="choose($event)">
				<span class="text first">男</span>
				<span class="text">女</span>
			</div>
		</div>
	</transition>
</div>
</template>
<script>
import { Field,Cell,MessageBox,Button } from 'mint-ui'
import { mapState } from 'vuex'
export default{
	data(){
		return{
			name: '',
			sex: '请选择',
			cardNum: '',
			showRadios: false,
			reason: '',
			tip:"描述申诉理由有助于提高申诉通过成功概率（选填），最多500字",
			checked: false
		}
	},
	components:{
		'mt-field': Field,
		'mt-cell': Cell,
		'mt-button': Button
	},
	methods:{
		showRadio(){
			this.showRadios = true;
		},
		hideRadio(){
			this.showRadios = false;
		},
		choose(event){
			let target = event.target;
			this.sex = target.innerHTML;
			this.showRadios = false;
		},
		validate(event){
			let target = event.target;
			let reg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			if(!reg2.test(target.value)){
				MessageBox.alert('身份证输入有误')
			}
		},
		validateReason(){
			if(this.reason.length>500){
				MessageBox.alert('输入不能超过500字')
			}
		},
		toggleChecked(){
			this.checked = !this.checked;
		},
		toNext(){
			// console.log(11)
			if(this.name == '' || this.sex == '请选择' || this.cardNum == '' || this.phoneNumber == ''){
				MessageBox.alert('请填写完善信息')
			}else{
				if(this.cardNum == this.certificateNo){
					MessageBox.alert('新证件号码不能与原号码相同')
				}else{
					let sex = this.sex == '男' ? '1':'0';
					let appealInfo ={
						"contactNo":this.phoneNumber,
						"personName": this.name,
						"certificateNo":this.cardNum,
						"sex":sex,
						"appealType":"02",
						"certificateType":"01",
						"uuid":""
					}
					this.$store.dispatch('jia_setAppealInfo',appealInfo)
					this.$router.push({name:'jia_cardShensu2',params:{id:'0'}})
				}
			}
		},
		toRule(){
			this.$router.push('/jia_rules')
		}
	},
	computed:mapState({
		phoneNumber: state=>state.jia_phoneNumber,
		certificateNo: state=>state.jia_certificateNo
	}),
}
</script>
<style lang="less">
.card-shensu{
	.header{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height:1.2rem;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		background-color: #35b46f;
		z-index: 1000;
		.back{
			width: 0.27rem;
			height: 0.5rem;
			position: absolute;
			left:10px;
			top:16px;
			background-image: url('../../assets/img/jia_back.png');
			background-size: cover;
		}
		.title{
			font-size: 20px;
			line-height: 1.2rem;
			color:#fff;
			font-weight: 300;
		}
	}
	.pad{
		height: 1.4rem;
		background-color: transparent;
	}
	.progress{
		padding: 0.6rem 0 1.2rem 0;
		border-bottom: 1px solid #d6d6d6;
		.pro{
			width: 90%;
			margin-left: 5%;
			border-top: 1px solid #d6d6d6;
			position: relative;
			.item{
				width: 70px;
				position: absolute;
				top:-0.2rem;
				.cir{
					display: block;
					width: 0.4rem;
					height: 0.4rem;
					border-radius: 50%;
					font-size: 12px;
					line-height: 0.4rem;
					text-align: center;
					margin-left: 30px;
				}
				.des{
					font-size: 14px;
					margin-top: 10px;
				}
			}
			.first{
				left:0.4rem;
				.cir{
					background-color: #fcc648;
					color:#fff;
					margin-left: 20px;
				}
				.des{
					color: #fcc648;
				}
			}
			.second{
				left: 50%;
				transform:translateX(-50%);
				.cir{
					background-color: #f2f2f2;
					color:#acacac;
				}
				.des{
					color:#acacac;
				}
			}
			.third{
				right:0.4rem;
				.cir{
					background-color: #f2f2f2;
					color:#acacac;
				}
				.des{
					color:#acacac;
				}
			}
		}
	}
	.content{
		.mint-field-core{
			text-align: right;
		}
		.mint-cell-value{
			color:#000;
		}
		.tip{
			font-size: 12px;
			margin-bottom: 0.2rem;
			background-color: #fffad0;
			color:#ffce51;
			padding: 0.1rem;
			line-height: 30px;
		}
		.reason{
			background-color: #f5f5f5;
			width: 85%;
			height: 2.5rem;
			padding:2.5%;
			margin-left: 5%;
			border-radius: 4px;
			font-size: 16px;
			outline-style: none;
			border-color: transparent;
			
			line-height: 28px;
		}
		.number{
			text-align: right;
			// padding-right: 5%;
			padding: 0.2rem 5%;
		}
		.next{
			padding: 0 5%;
			background-color: #f5f5f5;
			font-size: 18px;
			padding: 0.2rem 5%;
			.mark{
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				border:1px solid #666;
				border-radius: 50%;
				position: relative;
				top:3px;
				margin-right: 5px;
				// margin:2px;
			}
			.checked{
				background: url('../../assets/img/jia_wo_choose.png') no-repeat;
				background-size: cover;
				border-color: transparent;
			}
			.rule{
				color: #ffce51;
			}

		}
		.btn{
			width: 80%;
			// margin-left: 10%;
			text-align: center;
			font-size: 18px;
			line-height: 0.8rem;
			background-color: #35b46f;
			border-radius: 0.1rem;
			margin: 0.3rem 0 0.3rem 10%;
			color:#fff;
			box-shadow: 0 3px 0 0 #a0a0a0;
		}
		.disable{
			background-color: #ccc;
			// box-shadow: 0 3px 0 0 #666;
		}
	}
	.slide-enter-active,.slide-leave-active{
		transition:all 0.1s;
		}
	.slide-leave-to,.slide-enter{
		transform:translateX(100%);
	}
	.radio{
		position: fixed;
		top:0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #fff;
		.header{
			position: fixed;
			top:0;
			left:0;
			width: 100%;
			height:1.2rem;
			text-align: center;
			border-bottom: 1px solid #e0e0e0;
			background-color: #35b46f;
			.back{
				width: 0.27rem;
				height: 0.5rem;
				position: absolute;
				left:10px;
				top:16px;
				background-image: url('../../assets/img/jia_back.png');
				background-size: cover;
			}
			.title{
				font-size: 20px;
				line-height: 1.2rem;
				color:#fff;
				font-weight: 300;
			}
		}
		.pad{
			height: 1.4rem;
			background-color: transparent;
		}
		.radio-content{
			padding-left: 0.3rem;
			border-top:1px solid #c0c0c0;
			border-bottom: 1px solid #c0c0c0;
			font-size: 0;
			.text{
				display: block;
				font-size: 18px;
				line-height: 0.8rem;
			}
			.first{
				border-bottom: 1px solid #c0c0c0;
			}
		}
	}
}
</style>
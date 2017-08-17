<!-- 修改手机界面 -->
<template>
<!-- <transition name='slide'> -->
<div class="phone">
	<div class="header">
		<router-link to='/jia_account'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">修改手机</h1>
	</div>
	<div class="pad"></div>
	<div class="progress">
		<div class="pro">
			<dl class="item first">
				<dt class="cir">1</dt>
				<dd class="des">验证方式</dd>
			</dl>
			<dl class="item second">
				<dt class="cir">2</dt>
				<dd class="des">安全验证</dd>
			</dl>
			<dl class="item third">
				<dt class="cir">3</dt>
				<dd class="des">修改绑定</dd>
			</dl>
		</div>
	</div>
	<div class="yz-method">
		<div class="item first">
			<span class="name">短信验证</span>
			<router-link to='/jia_short-message'>
				<span class="yz-btn">验证</span>
			</router-link>	
			
		</div>
		<div class="item">
			<span class="name">证件验证</span>
			<router-link to='/jia_card'>
				<span class="yz-btn">验证</span>
			</router-link>
		</div>
	</div>
</div>
 <!-- </transition> -->
</template>
<script>
import {Button} from 'mint-ui'
export default{
	components:{
		'mt-button': Button
	}
}
</script>
<style lang="less" scoped>
// .slide-enter-active,.slide-leave-active{
//   transition:  0.5s;
// }
// .slide-enter,.slide-leave-to{
//   transform: translateX(-100%);
// }
.phone{
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
	.progress{
		padding: 0.6rem 0 1.2rem 0;
		.pro{
			width: 90%;
			margin-left: 5%;
			border-top: 1px solid #d6d6d6;
			position: relative;
			.item{
				width: 60px;
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
					margin-left: 20px;
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
	.yz-method{
		// width: 100%;
		// height: 20px;
		padding: 0 20px;
		background-color: #fff;
		.item{
			font-size: 16px;
			line-height: 1rem;
			.name{
				color:#35b46f;
			}
			.yz-btn{
				display: inline-block;
				float:right;
				width: 1.5rem;
				line-height: 0.7rem;
				background-color: #fcc648;
				color:#fff;
				margin-top: 0.18rem;
				text-align: center;
				border-radius: 5px;
			}
		}
		.first{
			border-bottom: 1px solid #e7e7e7;
		}
	}
}
</style>
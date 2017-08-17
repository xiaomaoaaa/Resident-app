<template>
<div class="health">
	<div class="head-box" ref='head'>
		<div class="header">
			<router-link to='/jia_person'>
				<div class="back">
				
				</div>
			</router-link>
			<h1 class="title">健康指标</h1>
		</div>
		<div class="people" ref='people'>
			<div class="item checked" @click='choose($event)'>
				<span class="img">
					<img :src="src1" v-if="!self.avatar">
					<img :src="base + self.avatar" v-else>
				</span>
				<span class="text">我</span>
			</div>
			<div class="item" v-for='(item,index) in signPeople' @click='choose($event,index)'>
				<span class="img">
					<img :src="src1" v-if="!item.avatar">
					<img :src="base + item.avatar" v-else>
				</span>
				<span class="text">{{item.personName}}</span>
			</div>
		</div>
		<p class="tip">
			家庭医生根据您的身体状况定制了健康目标值，需要进一步了解可咨询家庭医生
		</p>
	</div>
	<div class="pad" ref='pad'></div>
	<div class="content">
		<div class="type" v-for='type in typeList'>
			<h1 class="title">{{type.typeName}}</h1>
			<div class="item">
				<span class="tip">项目名称</span>
				<span class="tip">目标值</span>
				<span class="tip">单位</span>
			</div>
			<div class="item" v-for='item in type.itemList'>
				<span class="val">{{item.hpiName}}</span>
				<span class="val">{{item.lowerLimit}}-{{item.upperLimit}}</span>
				<span class="val">{{item.hpiUnit}}</span>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import api from '../../api/index.js'
import { Cell,Indicator } from 'mint-ui'
export default{
	data(){
		return {
			signPeople:[],
			self: {},
			mpiId: '',
			base:'http://122.224.131.235:9088/hcn-web/upload/',
			src1: require('../../assets/img/zbl_avatar.png'),
			typeList: []
		}
	},
	methods:{
		getFamilyData(){
			Indicator.open('加载中...')
			let id = JSON.parse(sessionStorage.getItem('userInfo')).body.userId;
			let name = JSON.parse(sessionStorage.getItem('userInfo')).body.userName;
			// console.log(JSON.parse(sessionStorage.getItem('userInfo')))
			let params = ['hcn.shenzhen',id];
			api.commonAjax(params,'pcn.residentSignService','queryFamily')
				.then((res)=>{
					if(res.code == 200){
						res.body.forEach((item)=>{
							if(item.status == 2){
								if(item.personName != name){
									this.signPeople.push(item);
								}else{
									this.self = item;
									//给mpiId赋初始值
									this.mpiId = this.self.mpiId;
									// console.log(this.mpiId)
									this.getHealthData()
								}
							}
						})
						// this.mpiId = this.signPeople[0].mpiId;
						// this.getHealthData();
					}
				})
		},
		choose(event,index){
			let target = event.currentTarget;
			let items = target.parentNode.getElementsByClassName('item');
			// console.log(index)
			// console.log(typeof index)
			if(typeof index != 'number'){
				this.mpiId = this.self.mpiId
			}else{
				this.mpiId = this.signPeople[index].mpiId
			}
			// console.log(this.mpiId)
			for(let i=0,len=items.length;i<len;i++){
				items[i].classList.remove('checked');
			}
			target.classList.add('checked');
			// console.log(this.mpiId)
			Indicator.open('加载中...')
			this.getHealthData()
		},
		getHealthData(){
			let params=[this.mpiId];
			console.log(this.mpiId)
			api.commonAjax(params,'pcn.appPcnHpiService','residentHpiList')
				.then((res)=>{
					if(res.code == 200){
						Indicator.close();
						this.typeList = res.body;
						console.log(this.typeList)
					}
				})
		}
	},
	watch:{

	},
	mounted(){
		this.getFamilyData();
		this.$nextTick(()=>{
			let height = Number(this.$refs.head.offsetHeight)+20;
			this.$refs.pad.style.height = height+'px';
		})
	},
	components:{

	}
}
</script>
<style lang="less" scoped>
.health{
	.head-box{
		position: fixed;
		top:0;
		left:0;
		.header{
			position: relative;
			width: 100%;
			height:1.76rem;
			text-align: center;
			border-bottom: 1px solid #e0e0e0;
			background-color: #35b46f;
			.back{
				width: 0.31rem;
				height: 0.6rem;
				position: absolute;
				left:0.3rem;
				top:0.5rem;
				background-image: url('../../assets/img/jia_back.png');
				background-size: contain;
				background-repeat: no-repeat;
			}
			.title{
				font-size: 22px;
				line-height: 1.5rem;
				color:#fff;
				font-weight: 300;
			}
		}
		.people{
			padding:0 0 0.2rem 0.2rem;
			display: flex;
			.item{
				padding: 0.3rem 0 0 0;
				font-size: 0;
				margin-right: 0.2rem;
				// height: 1.2rem;
				.img{
					display:block;
					width: 0.8rem;
					height: 0.8rem;
					border-radius: 50%;
					overflow: hidden;
					// background-repeat: no-repeat;
					// background-size: cover;
					// margin:0.5rem 0 0 0.65rem;
					padding:0 0 0 0.1rem;
					img{
						width: 0.8rem;
						height: 0.8rem;
						border-radius: 50%;
					}
				}
				.text{
					margin-top: 0.2rem;
					display: inline-block;
					width: 100%;
					font-size: 14px;
					color:#999;
					text-align: center;
				}
			}
			.checked{
				// padding: 0;
				// margin-top: -0.6rem;
				z-index: 1000;
				.img{
					display:block;
					width: 1.3rem;
					height: 1.3rem;
					border-radius: 50%;
					overflow: hidden;
					// background-repeat: no-repeat;
					// background-size: cover;
					// margin:0.5rem 0 0 0.65rem;
					padding:0 0 0 0.1rem;
					margin-top: -0.6rem;
					// border-top:3px solid #fff;
					// border:2px solid #fff;
					img{
						width: 1.3rem;
						height: 1.3rem;
						border-radius: 50%;
						// border-top:3px solid #fff;
					}
				}
				.text{
					margin-top: 0.2rem;
					display: inline-block;
					width: 100%;
					font-size: 16px;
					color:#5aca8d;
					text-align: center;
				}
			}
		}
		.tip{
			font-size: 16px;
			padding: 0.2rem;
			background-color:#fffad0; 
			color:#fd8f0e;
			line-height: 20px;
		}
	}
	.pad{
		height: 4.8rem;
		background-color: transparent;
	}
	.content{
		padding:0 0.2rem;
		.type{
			.title{
				font-size: 18px;
				color:#5aca8d;
				border-bottom: 1px solid #ccc;
				padding: 0.3rem 0;
			}
			.item{
				padding: 0.2rem 0;
				display: flex;
				font-size: 16px;
				border-bottom: 1px solid #ccc;
				.tip{
					color:#333;
					flex:1 1 33%;
				}
				.val{
					color:#888;
					flex:1 1 33%;
				}
			}
		}
	}
}
</style>
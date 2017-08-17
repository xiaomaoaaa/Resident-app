<template>
<div class="service">
	<div class="header">
		<router-link to='/jia_person'>
			<div class="back">
			
			</div>
		</router-link>
		<h1 class="title">服务记录</h1>
	</div>
	<div class="pad"></div>
	<div class="people">
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
	<div class="divide"></div>
	<div class="package">
		<h1 class="desc">TA享有的服务包</h1>
		<mt-cell :title='pack.spPackName' v-for='pack in packs'@click.native='toDetail(pack.signPackId)' is-link></mt-cell>
	</div>
</div>
</template>
<script>
import api from '../../api/index.js'
import { Cell,Indicator } from 'mint-ui'
export default{
	data(){
		return {
			signPeople: [],
			base:'http://122.224.131.235:9088/hcn-web/upload/',
			src1: require('../../assets/img/zbl_avatar.png'),
			self: {},
			mpiId: '',
			packs: []
		}
	},
	methods:{
		getFamilyData(){
			let id = JSON.parse(sessionStorage.getItem('userInfo')).body.userId;
			let name = JSON.parse(sessionStorage.getItem('userInfo')).body.userName;
			// console.log(JSON.parse(sessionStorage.getItem('userInfo')))
			console.log(id)
			console.log(name)
			let params = ['hcn.shenzhen',id];
			// console.log(params);
			api.commonAjax(params,'pcn.residentSignService','queryFamily')
				.then((res)=>{
					console.log(res)
					if(res.code == 200){
						// console.log(11)
						res.body.forEach((item)=>{
							if(item.status == 2){
								if(item.personName != name){
									this.signPeople.push(item);
								}else{
									this.self = item;
									//给mpiId赋初始值
									this.mpiId = this.self.mpiId;
									// console.log(this.mpiId)
									Indicator.open()
									this.getPackData()
								}
							}
						})
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
			console.log(this.mpiId)
			for(let i=0,len=items.length;i<len;i++){
				items[i].classList.remove('checked');
			}
			target.classList.add('checked');
			this.getPackData()
		},
		getPackData(){
			let params = [this.mpiId];
			api.commonAjax(params,'pcn.pcnSignPackService','queryPcnSignPack')
				.then((res)=>{
					Indicator.close();
					this.packs = res.body;
					// console.log(this.packs);
				})
		},
		toDetail(id){
			// console.log(id)
			this.$router.push({name:'jia_package',params:{packid:id}})
		}
	},
	mounted(){
		this.getFamilyData();
	},
	components:{
		'mt-cell': Cell
	}
}
</script>
<style lang="less" scoped>
.service{
	.header{
		position: fixed;
		top:0;
		left:0;
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
	.pad{
		height: 1.76rem;
		color:transparent;
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
				color:#35b46f;
				text-align: center;
			}
		}
	}
	.divide{
		height: 0.2rem;
		background-color: #e0e0e0;
	}
	.package{
		.desc{
			font-size: 14px;
			line-height: 20px;
			padding: 0.1rem;
			background-color: #f2f2f2;
			border-left:5px solid #35b46f;
		}
	}
}
</style>
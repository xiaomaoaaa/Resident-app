<template>
<div class="package">
	<div class="header">
		<router-link to='/jia_service'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">服务包</h1>
	</div>
	<div class="pad"></div>
	<div class="pack-title">
		<mt-cell :title="pack.spPackName" :label="'服务周期：'+start+'--'+end"></mt-cell>
	</div>
	<div class="pack-detail" @click='toDetail' v-if="listShow">
		<div class="times">
			<div class="time-container">
				<span class="leave">余<span class="num">{{itemList.remainTimes}}</span>次</span>
				<span class="total">共<span class="num">{{itemList.times}}</span>次</span>
			</div>
		</div>
		<div class="text">
			<h1 class="title">{{itemList.serviceName}}</h1>
			<p class="desc">{{itemList.serviceDesc | textFilter}}</p>
		</div>
	</div>
	<!-- <div class="pack-detail">暂无数据</div> -->
</div>
</template>
<script>
import api from '../../api/index.js'
import { Cell,MessageBox,Toast,Indicator} from 'mint-ui'
export default{
	data(){
		return {
			id: '',
			pack: {},
			listShow: false,
			itemList: {},
			start:'',
			end: ''
		}
	},
	methods:{
		getDetail(){
			// console.log(this.$route.packid)
			Indicator.open();
			this.id = this.$route.params.packid;
			// console.log(this.id)
			 let params = [`${this.id}`]
			api.commonAjax(params,'pcn.pcnSignPackService','queryPcnSignPackAndItems')
				.then((res)=>{
					if(res.code == 200){
						
						this.pack = res.body.pack;
				
						if(res.body.itemList.length>0){
							this.itemList = res.body.itemList[0];
							this.listShow = true;
						}
						this.start = res.body.pack.startDate.slice(0,10);
						this.end = res.body.pack.endDate.slice(0,10)
						Indicator.close();
					}
				})
		},
		toDetail(){
			if(this.itemList.remainTimes == this.itemList.times){
				Toast('暂无服务记录');
			}else{
				this.$router.push({name:'jia_serDetail',params:{packid:this.itemList.signServiceId}})
			}
		}
	},
	filters:{
		textFilter(value){
			let value1;
			if(value.length>26){
				value1 = value.slice(0, 24)+ '...'
			}else{
				value1 = value;
			}
			return value1;
		}
	},
	mounted(){
		this.getDetail();
	},
	components:{
		'mt-cell':Cell
	}
}
</script>
<style lang="less">
.package{
	width: 100%;
	height: 100%;
	background-color: #f2f2f2;
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
			top:14px;
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
		height: 1.2rem;
		background-color: transparent;
	}
	.pack-title{
		.mint-cell-text{
			font-size: 16px;
			color:#35b46f;
			line-height: 26px;
			padding-top:0.2rem;
		}
		.mint-cell-label{
			padding: 0 0 0.2rem 0;
		}
	}
	.pack-detail{
		width: 90%;
		// height: 1rem;
		// margin-left: 5%;
		background-color: #fff;
		margin: 0.4rem 5% 0.4rem 5%;
		display: flex;
		font-size: 0;
		.times{
			flex:0 0 33%;
			font-size: 12px;
			color:#666;
			.time-container{
				width: 1.3rem;
				height: 1.3rem;
				border-radius: 50%;
				margin: 0.4rem 0 0.4rem 0.3rem;
				border:4px solid #fd8f0e;
				// padding: 0 0.3rem;
				text-align: center;
				.leave{
					display: block;
					margin-top: 0.1rem;
					text-align: center;
					line-height: 18px;
					padding-bottom: 0.1rem;
					// border-bottom: 
					.num{
						font-size: 16px;
						color:#fd8f0e;
					}
				}
				.total{
					display: inline-block;
					line-height: 18px;
					padding-top: 0.1rem;
					// text-align: center;
					border-top: 1px solid #999;
					.num{
						font-size: 16px;
						color:#fd8f0e;
					}
				}
			}
			
		}
		.text{
			.title{
				font-size: 16px;
				color: #fd8f0e;
				padding: 0.4rem 0 0.2rem 0;
			}
			.desc{
				display: block;
				font-size: 14px;
				line-height: 20px;
				color:#666;
				// width: 100%;
				// white-space: no-wrap;
				// overflow: hidden;
				// text-overflow:ellipsis;
			}
		}
	}
}
</style>
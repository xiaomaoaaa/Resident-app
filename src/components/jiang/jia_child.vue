<template>
<div class="child">
	<div class="child-initial" v-show="!showDetail">
		<div class="header">
			<router-link to='/jia_person'>
				<div class="back">
				</div>
			</router-link>
			<h1 class="title">儿童体格检查</h1>
		</div>
		<div class="pad"></div>
		<div class="date">
			<span class="name">儿童出生日期</span>
			<span class="value fr" @click="showPicker">{{dateValue}}</span>
		</div>
		<div class="yz" @click="query">
			<div class="button">确定</div>
		</div>
	</div>
	<div class="child-detail" v-show="showDetail">
		<div class="header">
			<div class="back" @click="hideDetail">
			</div>
			<h1 class="title">儿童体格检查</h1>
			<span class="share"></span>
			<div class="report">
				<p class="tip">距离下次体检还有</p>
				<p class="time"><span class="number">{{number}}</span>天</p>
				<div class="birth">出生日期 &nbsp;{{dateValue}}</div>
			</div>
		</div>
		<div class="padding"></div>
		<div class="select-content" ref='select'>
			<div class="item" v-for="age in showAges" @click="toggleBg($event)">
				<div class="icon">
					<span class="img-icon"></span>
				</div>
				<div class="text">
					<p class="age">{{age.age}}<span class="time fr">{{age.time | timeFilter(dateModel)}}</span></p>
					<p class="desc">{{age.project}}</p>
				</div>
			</div>
		</div>
	</div>
	<mt-datetime-picker
		ref='picker'
		type='date'
		:startDate='startDate'
		v-model='dateModel'
		 @confirm="handleConfirm"
	></mt-datetime-picker>
</div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import api from '../../api/index.js';
export default{
	data(){
		return {
			dateValue: '',
			dateModel: '',
			startDate: new Date(0,0,0),
			showDetail:false,
			number: 27,
			ages: [{age:'满月',project:'体重、身长、头围、体格检查（血红蛋白）、发育评估',time:'1'},
			{age:'3月龄',project:'体重、身长、头围、体格检查（血红蛋白）、发育评估',time:'3'},
			{age:'6月龄',project:'体重、身长、头围、体格检查（听力、血红蛋白）、发育评估',time:'6'},
			{age:'8月龄',project:'体重、身长、头围、体格检查（血红蛋白）、发育评估',time:'8'},
			{age:'12月龄',project:'体重、身长、体格检查（听力）、发育评估',time:'12'},
			{age:'18月龄',project:'体重、身长、体格检查（血红蛋白）、发育评估',time:'18'},
			{age:'24月龄',project:'体重、身长、体格检查（听力）、发育评估',time:'24'},
			{age:'30月龄',project:'体重、身长、体格检查（血红蛋白）',time:'30'},
			{age:'3岁',project:'体重、身长、体格发育评价、体格检查（视力）',time:'36'},
			{age:'4岁',project:'体重、身长、体格发育评价、体格检查（视力）',time:'48'},
			{age:'5岁',project:'体重、身长、体格发育评价、体格检查（视力）',time:'60'},
			{age:'6岁',project:'体重、身长、体格发育评价、体格检查（视力）',time:'72'}],
			showAges: [],
			year: 0,
			month: 0,
			birYear: 0,
			birMonth: 0
		}
	},
	methods:{
		query(){
			this.getShowAges();
			// console.log(this.showAges)
			this.showDetail = true;
		},
		showPicker(){
			this.$refs.picker.open();
		},
		handleConfirm(date){
			this.birthDate = date;
			this.dateValue = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate());
		},
		hideDetail(){
			this.showDetail = false;
		},
		getShowAges(){
			this.year = (new Date()).getFullYear();
			this.month = (new Date()).getMonth() + 1;
			let birs = this.dateValue.split('-')
			this.birYear = birs[0];
			this.birMonth = birs[1];
			let age = Number(this.year) - Number(this.birYear);
			let months =String(Number(this.month) - Number(this.birMonth));
			// console.log(age);
			// console.log(months)

			if(age==0){
				// console.log(11)
				// console.log(months)
				switch(months){
					case '0':
					// console.log(22)
					 	this.showAges = this.ages;
					 	break;
					case '1':
					case '2':
						this.showAges = this.ages.slice(1);
						break;
					case '3':
					case '4':
					case '5':
				     	this.showAges = this.ages.slice(2);
				     	break;
				    case '6':
				    case '7':
				     	this.showAges = this.ages.slice(3);
				     	break;
				    case '8':
				    case '9':
				    case '10':
				    case '11':
				    	this.showAges = this.ages.slice(4);
				    	break;
				}
			}else if(age == 1){
				switch(months){
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
						this.showAges = this.ages.slice(5);
					case '6':
					case '7':
					case '8':
					case '9':
					case '10':
					case '11':
						this.showAges = this.ages.slice(6)
				}
			}else if(age == 2){
				switch(months){
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
						this.showAges = this.ages.slice(7);
					case '6':
					case '7':
					case '8':
					case '9':
					case '10':
					case '11':
						this.showAges = this.ages.slice(8);
				}	
			}else if(age == 3){
				this.showAges = this.ages.slice(9);
			}else if(age == 4){
				this.showAges = this.ages.slice(10);
			}else if(age == 5){
				this.showAges = this.ages.slice(11);
			}else{
				this.showAges = [];
			}
			// console.log()
			let time1 = (Number(new Date().getTime())) - (Number(this.dateModel.getTime()));
			// console.log(new Date().getTime())
			// console.log(this.dateModel.getTime())
			let time2 = Number(this.showAges[0].time)*30*24*3600*1000;
			// console.log(time1);
			// console.log(time2);
			this.number =parseInt((time2-time1)/(24*3600*1000));
		},
		toggleBg(event){
			// console.log(11)
			let items = this.$refs.select.getElementsByClassName('item');
			for(let i=0,len=items.length;i<len;i++){
				items[i].style.backgroundColor = '#f2f2f2';
			}
			event.currentTarget.style.backgroundColor = '#fff';
		}
	},
	beforeMount(){
		let date = new Date();
		this.dateValue = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);
		// console.log(this.dateValue)
		// this.dateModel = date.setDate((date.getDate()-1));
		this.dateModel = new Date(date.getFullYear(),date.getMonth(),date.getDate()-1)
		// console.log(this.)
	},
	mounted(){

	},
	filters:{
		timeFilter(value,birthDate){
			// let value2 = .birthDate;
			let year = 0;
			let month = 0;
			switch(value){
				case '1':
				case '3':
				case '6':
				case '8':
					month = value;
					year = 0;
					break;
				case '12':
				case '18':
				case '24':
				case '30':
				case '36':
				case '48':
				case '60':
				case '72':
					month = value % 12;
					year = parseInt(value/12);
			}
			let showYear = Number(birthDate.getFullYear())+Number(year) ;
			let showMonth = Number(birthDate.getMonth()+1) + Number(month);
			if(showMonth>12){
				showYear++;
				showMonth = showMonth % 12;
			}
			let newDate = new Date(showYear,showMonth,birthDate.getDate())
			// let date = new Date(date.getMonth()+)
			return newDate.getFullYear() + '-' + (newDate.getMonth()) + '-' + newDate.getDate()
		}
	},
	components:{
		'mt-datetime-picker': DatetimePicker 
	}
}
</script>
<style lang="less" scoped>
.child{
	.child-initial{
		position: fixed;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f2f2f2;
		.header{
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
		.date{
			background-color: #fff;
			font-size: 0;
			margin:0.2rem;
			padding: 0.2rem;
			color:#666;
			.name{
				font-size: 18px;
				line-height: 28px;
			}
			.value{
				font-size: 18px;
				line-height: 28px;
			}
		}
		.yz{
			width: 90%;
			height: 0.8rem;
			margin-top: 1.5rem;
			margin-left: 50%;
			transform: translateX(-50%);
			text-align: center;
			.button{
				border-radius: 5px;
				line-height: 0.8rem;
				font-size: 0.3rem;
				color: #d0f2f5;
				background-color: #35b46f;
			}
		}
	}
	.child-detail{
		.header{
			position: fixed;
			top:0;
			left:0;
			width: 100%;
			text-align: center;
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
			.share{
				position: absolute;
				top:0.42rem;
				right:0.3rem;
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				background: url('../../assets/img/mao_sharing.png') no-repeat;
				background-size: contain;
			}
			.report{
				color:#d4f0c9;
				background:-webkit-linear-gradient(top,#35b46f,#4adfc6);
				background: linear-gradient(top,#35b46f,#4adfc6);
				padding-bottom: 0.3rem;
				.tip{
					font-size: 14px;
					text-align: center;
					padding: 0.4rem 0;
				}
				.time{
					font-size: 16px;
					margin-top: 0.4rem;
					color: #fff;
					.number{
						font-size: 1rem;
					}
				}
				.birth{
					display: inline;
					padding: 0.1rem 0.5rem;
					font-size: 16px;
					margin-top:0.3rem;
					border-radius: 0.4rem;
					background-color: #43cdb1;
				}
			}
		}
		.padding{
			height: 5rem;
			width: 100%;
		}
		.select-content{
			font-size: 18px;
			// padding:0 0.2rem;
			background-color: #f2f2f2;
			.item{
				display: flex;
				border-bottom: 1px solid #e0e0e0;
				padding: 0.2rem;
				.icon{
					flex: 0 0 0.5rem;
					width: 0.5rem;
					height: 0.5rem;
					background: url('../../assets/img/jia_jiancha.png') no-repeat;
					background-size: contain;
				}
				.text{
					flex:1;
					padding-left: 0.2rem;
					.age{
						font-size: 16px;
						line-height: 0.5rem;
						color:#444;
						.time{
							color: #8bcca9;
						}
					}
					.desc{
						font-size: 14px;
						line-height: 20px;
						padding-top: 0.2rem;
						color:#a0a0a0;
					}
					
				}
			}
			.item:nth-child(1){
				background-color: #fff;
				.icon{
					background: url('../../assets/img/jia_nowjiancha.png') no-repeat;
					background-size: contain;
				}
				.text{
					.age{
						.time{
							color:#ffa100;
						}
					}
				}
			}
		}
	}
}
</style>
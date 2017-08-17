<template>
<div class="card-shensu2">
	<div class="header">
		<router-link to='/jia_appeal'>
			<div class="back">
			</div>
		</router-link>
		<h1 class="title">{{title}}</h1>
	</div>
	<div class="pad"></div>
	<div class="progress">
		<div class="pro">
			<dl class="item first">
				<dt class="cir"></dt>
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
		<p class="tishi">上传证件的正反面照片，注意反光，保证证件内容清晰可见</p>
		<div class="img-box">
			<div class="img" v-for="(img,index) in imgs" >
				<img :src="img" width="100%">
				<p class="desc"><span v-show="upload[index]">已</span>{{descs[index]}}</p>
				<form  role="form"  enctype="multipart/form-data" v-on:submit.prevent>
		   			<input type="file" class="formData" name="upload"  @change="uploadImg($event,index)" accept="image/*" />
				 </form>
			</div>
		</div>
		<div class="btn" v-show="checked" @click="toNext">
			下一步	
		</div>
		<div class="btn disable" v-show="!checked">
			下一步	
		</div>
	</div>
</div>
</template>
<script>

export default{
	data(){
		return {
			descs: ['添加人像面','添加国徽面','上传手持证件照'],
			imgs: [require('../../assets/img/jia_zhengmian.png'),
					require('../../assets/img/jia_fanmian.png'),
					require('../../assets/img/jia_zhengjian.png'),],
			upload:[false,false,false],
			formDatas: ['','',''],
			title: ''
		}
	},
	methods:{
		toNext(){
			this.$store.dispatch('jia_setFormDatas',this.formDatas);
			this.$router.push('/jia_bindPhone');
		},
		uploadImg(event,index){
			let target = event.target;
			// console.log(target)
			let imguploadform = target.parentNode;
			// console.log(imguploadform)
  			// let load = document.getElementById('avatar_load');
  			let file = target.files[0],
  				reader = new FileReader();
  				reader.readAsDataURL(file);
	  			reader.onload = (e)=>{
	  				let result = reader.result;
	  				if(result){
	  					this.imgs.splice(index, 1, [result])
	  					// console.log(result)
	  					this.upload.splice(index, 1, true)
	  					// let value = "已"+this.descs[index];
	  					// this.descs.splice(index, 1, [])
	  				}
	  			}
			let formData = new FormData(imguploadform);
			this.formDatas.splice(index, 1, formData)
			// console.log(formData)
			// formData.append('url',load.files[0])
			// console.log(formData)
			// api.imguploadAjax(formData).then((res)=>{
			// 	if(res.success){
			// 		this.src=api.imgview(res.record.fileId)
			// 	}
			// })

		}
	},
	computed:{
		checked(){
			return this.upload[0]&&this.upload[1]&&this.upload[2]; 
		}
	},
	mounted(){
		let id = this.$route.params.id;
		this.title = id == 0 ? '证件申诉':'账号申诉';
		this.$store.dispatch('jia_setTitle',this.title)
	}
}
</script>
<style lang="less">
.card-shensu2{
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
		// border-bottom: 1px solid #d6d6d6;
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
					background-image: url('../../assets/img/jia_wo_choose.png');
					background-repeat: no-repeat;
					background-size: cover;
					margin-left: 0.4rem;
				}
				.des{
					color: #fcc648;
				}
			}
			.second{
				left: 50%;
				transform:translateX(-50%);
				.cir{
					background-color: #fcc648;
					color:#fff;
					margin-left: 30px;
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
		background-color: #f5f5f5;
		padding: 0 0.2rem 0.3rem 0.2rem;
		.tishi{
			font-size: 16px;
			color:#666;
			line-height: 28px;
			padding: 0.1rem 0;
		}
		.img-box{
			display: flex;
			flex-wrap: wrap;
			justify-content:space-between;
			.img{
				margin-top: 0.2rem;
				width: 45%;
				background-color: #fff;
				position: relative;
				overflow: hidden;
				.desc{
					width: 100%;
					font-size: 16px;
					color:#35b46f;
					text-align: center;
					line-height: 28px;
					border-top: 1px solid #e0e0e0;
				}
				.formData{
					position: absolute;
					top:50%;
					left:0;
					transform:translateY(-60%);
					padding: 1.2rem 0;
					opacity: 0;
				}
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
			margin: 0.5rem 0 0 10%;
			color:#fff;
			box-shadow: 0 3px 1px 0 #a0a0a0;
		}
		.disable{
			background-color: #eee;
			// box-shadow: 0 3px 0 0 #666;
		}
	}
}
</style>
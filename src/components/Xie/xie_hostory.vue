<template>
	<div class="header_groud">
		<mt-header title="历史测试记录" style="background:#34B26E;color:#fff">
			<a slot="left" @click='$router.push("/xie_tvm_constitution")'>
				<mt-button icon="back"></mt-button>
			</a>
		</mt-header>
		<ul>
			<li v-for ="(item,index) in list" @click="send(item)" v-show = "item.subordinatePhysique">
				<div class="box_left">
					<span class="span1" v-show="item.xie_p">{{item.xie_p}}</span>
					<!--<span class="span1" v-show="item.xie_p">{{item.subordinatePhysique || numberFilter}}</span>-->
					<span class="span2">{{item.recordDate}}</span>
				</div>
				<img class="box_right" src="../../assets/img/xie_goright.png">
			</li>
		</ul>
	</div>
</template>
<script>
	import {commonAjaxKy} from "../../api/api"
export default {
    components: {

    },
    data() {
        return {
//			constitution: [{
//					"serviceCode": "2",
//					"xie_p": "阳虚质",
//				},
//				{
//					"serviceCode": "3",
//					"xie_p": "阴虚质",
//				},
//				{
//					"serviceCode": "4",
//					"xie_p": "气虚质",
//				},
//				{
//					"serviceCode": "5",
//					"xie_p": "痰湿质",
//				},
//				{
//					"serviceCode": "6",
//					"xie_p": "湿热质",
//				},
//				{
//					"serviceCode": "7",
//					"xie_p": "血淤质",
//				},
//				{
//					"serviceCode": "8",
//					"xie_p": "特禀质",
//				},
//				{
//					"serviceCode": "9",
//					"xie_p": "气郁质",
//				},
//				{
//					"serviceCode": "10",
//					"xie_p": "平和质",
//				},
//			],
			constitution:{"2":"阳虚质","3":"阴虚质","4":"气虚质","5":"痰湿质","6":"湿热质","7":"血淤质","8":"特禀质","9":"气郁质","10":"平和质",},
			list:'',
        }

    },
    computed: {

    },
    methods: {
//  	获得列表数据
    	getPhysiqueHistoryList(){
			let params = [1,100]
			commonAjaxKy(JSON.stringify(params),'hcn.physiqueService','getPhysiqueHistoryList').then(res=>{
				if(res.code==200){
					this.list = res.body
					let me = this
					this.list.forEach(item=>{
						if(item.subordinatePhysique!=null){
							let result = item.subordinatePhysique.split(",")
							let arr = []
							result.forEach(item1=>{
								arr.push(me.constitution[item1])
							})
							item.xie_p = arr.join(',')
						}
					})
//					这是3层循环
//					let me = this
//					this.list.forEach(item=>{
//						let result = item.subordinatePhysique.split(",")
//						item.xie_p = ""
//						result.forEach(item1=>{
//							me.constitution.forEach(item2=>{
//								if(item1==item2.serviceCode){
//									item.xie_p=item.xie_p+item2.xie_p+","
//								}
//							})
//						})
//						item.xie_p =item.xie_p.substr(0,item.xie_p.length-1);
//					})
				}
			})
		},
		send(item){
			this.$router.push({path: '/zbl_zytz_result', query: {"recordId": item.recordId,"recordPerson":item.recordPerson}})
		}
    },
    mounted() {
		this.getPhysiqueHistoryList()
    },
    filters:{
    	numberFilter(value){
    		let arr = value.split("*")
    		arr.forEach(item=>{
    			this.constitution.forEach(item1=>{
    				if(item1.serviceCode==item){
    					item+=item1.xie_p
    				}
    			})
    			
    		})
    		return(item)
    	}
    }
//  filters:{
//  	numberFilter(value){
//  		let arr = value.split("*")
//  		arr.forEach(item=>{
//  			this.constitution.forEach(item1=>{
//  				if(item1.serviceCode==item){
//  					item+=item1.xie_p
//  				}
//  			})
//
//  		})
//  		return(item)
//  	}
//  }
}
</script>
<style lang="less" scoped>
	.header_groud{
		ul{
			li{
				padding: .2rem;
				border-bottom: 1px solid #ccc;
				height: .8rem;
				.box_left{
					float:left;
					.span1{
						color: #323232;
						font-size: .3rem;
						display: block;
						padding-bottom: .2rem;
						width:5rem;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.span2{
						font-size: .2rem;
						display: block;
						color: #ccc;
					}
				}
				.box_right{
						width: .5rem;
						height: .5rem;
						float: right;
				}
			}
		}

	}
</style>

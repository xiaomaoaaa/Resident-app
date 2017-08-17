<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color:#fafafa;">
        <div class="header">
	        <mt-header title="预产期计算">
	            <router-link to="/service/expectedDate" slot="left">
	                <mt-button icon="back" class="back"></mt-button>
	            </router-link>
	            <mt-button icon="" slot="right" class="share"></mt-button>
	        </mt-header>
	        <div class="header_bottom">
	        	<div class="calculate_result">
	        		<p>预产期</p>
	        		<p>{{expectedDate}}</p>
	        		<div class="remainder_days">
	        			<div class="transparent_bg">
	        				<div class="remainder_days_text">
	        					<p>离宝宝出生还有</p>
	        					<p>{{birthCountdown}}天</p>
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        </div>
	    </div>
        <div class="body">
        	<div class="next_inspection">
		    	<p id="normal">离下次产检还有<b>{{nextCheckCountdown}}</b>天</p>
		    	<p id="special">您可以进行第<b>{{activeCount}}</b>次产检了</p>
		    </div>
		    <div class="check_list">
				<a class="mint-cell" v-for="item in checkListInfo">
					<div class="mint-cell-left"></div>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">第{{item.count}}次产检&nbsp;&nbsp;怀孕{{item.week}}周<em>{{item.checkDate}}</em></span>
							<span class="mint-cell-label">{{item.content}}</span>
						</div>
						<div class="mint-cell-value">
							<span></span>
						</div>
					</div>
					<div class="mint-cell-right"></div>
				</a>
			</div>
        </div>

    </div>
</template>
<script>
import md5 from 'md5'
import '../../assets/js/gy_dateutil.js'
import {
    commonAjax,
    requestLoginon,
    areaAjax,dicAjax,commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
import { MessageBox,Toast,Badge,Cell } from 'mint-ui'
export default {
    data: function() {
        return {
        	selectDate:this.$route.params.selectDate,
        	expectedDate:new Date(this.$route.params.selectDate).getDateStr(280).Format('yyyy-MM-dd'),
        	birthCountdown:"",
        	nextCheckCountdown:"",
            checkListInfo:[
            	{count:"1",content:"建档、NT检查、空腹",week:"12"},
            	{count:"2",content:"唐筛、空腹",week:"16"},
            	{count:"3",content:"唐筛、空腹",week:"20"},
            	{count:"4",content:"唐筛、空腹",week:"24"},
            	{count:"5",content:"B超胎儿畸形筛查",week:"28"},
            	{count:"6",content:"糖耐量筛查、空腹",week:"30"},
            	{count:"7",content:"常规检查、产科B超",week:"32"},
            	{count:"8",content:"常规检查",week:"34"},
            	{count:"9",content:"常规检查、 胎心监护",week:"36"},
            	{count:"10",content:"常规检查、胎心监护",week:"37"},
            	{count:"11",content:"常规检查、 胎心监护、产科B超",week:"38"},
            	{count:"12",content:"常规检查、 胎心监护、胎位检查",week:"39"},
            	{count:"13",content:"常规检查、 胎心监护、胎位检查、骨盆内诊",week:"40"},
            ],
            activeCount:""
        }
    },
    created() {
        
    },
    methods: {
    	
    },
    mounted() {
    	this.birthCountdown = new Date(this.expectedDate).getDateDiff2Now();
    	for(var i=0;i<this.checkListInfo.length;i++){
    		var checkDate = new Date(this.selectDate).getDateStr(this.checkListInfo[i].week*7-1).Format('yyyy-MM-dd')
    		this.checkListInfo[i]["checkDate"] = checkDate;
    	}
    	//this.nextCheckCountdown
    	var todayDate = new Date();
    	var newCheckListInfo = [];
    	for(var i=0;i<this.checkListInfo.length;i++){
    		if(todayDate <= new Date(this.checkListInfo[i].checkDate)){
    			newCheckListInfo.push(this.checkListInfo[i]);
    			document.getElementById('special').style.display = 'none';
    			document.getElementById('normal').style.display = 'block';
    			if(this.activeCount!=""){
    				return;
    			}
    			if(todayDate == new Date(this.checkListInfo[i].checkDate)){
    				this.activeCount = this.checkListInfo[i].count;
    				document.getElementById('special').style.display = 'block';
    				document.getElementById('normal').style.display = 'none';
    			}
    		}
    	}
    	this.checkListInfo = newCheckListInfo;
    	this.nextCheckCountdown = new Date(newCheckListInfo[0].checkDate).getDateDiff2Now();
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #3ab76f
greyFont = #ADADAD
fontSize = .4rem
.app{
	/*background:url('../../assets/img/expectedDate_details_bg.png') no-repeat left top / 100% 40% #fafafa;*/
}
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    height:260px;
    background:url('../../assets/img/expectedDate_details_bg.png') no-repeat left top / 100% 100%;
    .mint-header {
        height: 1rem;
        font-size: 0.32rem;
        color: #fff;
        background-color: rgba(58,183,111,0);
        /*background-color: #3AB76F;*/
       .share{
	       	display:block;
	    	float:right;
	    	width:20px;
	    	height:20px;
       		background:url('../../assets/img/ssj-share.png') no-repeat center center / 18px 18px;
       }
       .back{
       		margin-top:-2px;
       }
       
    }
}
.header_bottom {
    /*margin-top: 1rem;
    margin-bottom: 1rem;*/
    font-size:0.3rem;
} 
.calculate_result{
	color:#fff;
}
.calculate_result p{
	text-align:center;
}
.calculate_result p:nth-child(2){
	margin-top:5px;
	line-height:26px;
	color:#f3ef0a;
}
.remainder_days{
	position:relative;
	width:110px;
	height:110px;
	background-color:rgba(255,255,255,0);
	border-radius:50%;
	border: 10px solid #fff;
	margin:5px auto;
}
.transparent_bg{
	position:absolute;
	left:10px;
	top:10px;
	width:90px;
	height:90px;
	background-color:#fff;
	border-radius:50%;
}
.remainder_days_text{
	margin-top:30px;
}
.remainder_days_text p{
	font-size:0.2rem;
	color:#888;
}
.remainder_days_text p:nth-child(2){
	font-size:0.26rem;
	color:mainColor;
}
.next_inspection p{
	height:42px;
	line-height:42px;
	font-size:0.28rem;
	color:#777;
	text-align:center;
}
#special{
	display:none;
	color:#ff4a3d;
}
.next_inspection p b{
	font-weight:normal;
	font-size:0.36rem;
	color:#ff4a3d;
	margin:0 5px;
}
.body{
	margin-top:260px;
}
.check_list .mint-cell-text{
	font-size:0.28rem;
	color:#777;
}
.check_list .mint-cell-label{
	font-size:0.26rem;
	color:#888;
}
.check_list em{
	float:right;
	/*height:22px;*/
	line-height:20px;
	font-size:0.26rem;
	color:#777;
	vertical-align:middle;
}
.check_list .mint-cell{
	min-height:52px;
	background-color:#f7f7f7;
	margin-bottom:10px;
}
.check_list .mint-cell-wrapper{
	background-image:none;
}
.check_list .mint-cell:last-child{
	background-image:none;
}
.check_list .mint-cell:nth-child(1) em{
	color:#ff4a3d;
}
</style>

<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
        <div class="header">
	        <mt-header title="热门医院">
	            <router-link to="/zy_personal_doctor" slot="left">
	                <mt-button icon="back"></mt-button>
	            </router-link>
	            <mt-button icon="" slot="right" class="search" @click='$router.push("/prvivateDoctor/hotHospitalList/search")'></mt-button>
	        </mt-header>
	    </div>
        <div class="session">
        	<div class="gray" id="gray"></div>
        	<div class="select_condition" id="selectCondition">
        		<div class="nav" id="nav">
			    	<span v-for="(item,index) in navName" @click="clickNav($event)" :id=index flag="0"><em>{{item.name}}</em><b></b></span>
		    	</div>
		    	<div class="select_content" id="selectContent">
		    		<ul>
		    			<li v-for="(item,key) in hospitalLevelName" @click="selectHosLevel($event,key)" :id=key>{{item}}</li>
		    		</ul>
		    		<ul>
		    			<li v-for="(item,key) in hospitalTypeName" @click="selectHosType($event,key)" :id=key>{{item}}</li>
		    		</ul>
		    	</div>
		    </div>
		    <div class="hotHospital_list">
				<a class="mint-cell" v-for="item in filterHotHospitalList" @click="$router.push({path: '/xie_mydoc', query: {orgId: item.orgId}})">
					<div class="mint-cell-left"></div>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">{{item.hotObjName}}<b class="hospital_level">{{hospitalLevelName[item.level]}}</b></span>
							<span class="mint-cell-label address">{{item.address}}</span>
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
            navName: [{name:"深圳市"},{name:"全部等级"},{name:"全部类型"}],
            navSelectName: [{name1:"全部",name2:"一级"},{name1:"全部",name2:"综合"}],
            hotHospitalList:[],
            filterHotHospitalList:[],
            /*hospitalLevel: [{name:"一级",value:"10"},{name:"一级甲等",value:"11"},{name:"一级乙等",value:"12"},{name:"一级丙等",value:"13"},{name:"二级",value:"20"},{name:"二级甲等",value:"21"},{name:"二级乙等",value:"22"},
            				{name:"二级丙等",value:"23"},{name:"三级",value:"30"},{name:"三级特等",value:"31"},{name:"三级甲等",value:"32"},{name:"三级乙等",value:"33"},{name:"三级丙等",value:"34"}],*/
            hospitalLevelName: {"0":"全部","10":"一级","11":"一级甲等","12":"一级乙等","13":"一级丙等","20":"二级","21":"二级甲等","22":"二级乙等","23":"二级丙等","30":"三级","31":"三级特等","32":"三级甲等","33":"三级乙等","34":"三级丙等"},
            hospitalTypeName: {
            				"0":"全部","01":"综合医院","02":"体检中心","03":"妇幼保健院","04":"妇产(科)医院","05":"儿童医院","06":"肿瘤医院","07":"心血管病医院","08":"胸科医院","09":"口腔医院","10":"眼科医院","11":"耳鼻喉科医院","12":"血液病医院","13":"精神病医院","14":"传染病医院","15":"皮肤病医院","16":"结核病医院","17":"麻风病医院","18":"职业病医院","19":"骨科医院","20":"康复医院","21":"整形美容"
            			  },
            /*flag:0*/
        }
    },
    created() {
        
    },
    methods: {
    	a(obj){return document.getElementById(obj)},
    	clickNav(e) {
    		var index = e.currentTarget.id;
    		if(index==0){
        		return;
        	}
    		var that = this;
        	var selectContent = document.getElementById("selectContent");
        	var selectNavContent = document.getElementById("selectContent").children;
        	var modal = document.getElementById("gray");
        	var flag = e.currentTarget.getAttribute("flag");
        	var selectNav = document.getElementById("nav").children;
        	for(var i=0;i<selectNav.length;i++){
	        	selectNav[i].classList.remove('active');
	        }
        	for(var i=0;i<selectNavContent.length;i++){
        		selectNavContent[i].style.display="none";
        	}
        	if(flag==0){
        		modal.style.display="block";
        		selectContent.style.display="block";
        		selectNavContent[index-1].style.display="block";
        		e.currentTarget.setAttribute("flag",1);
        		e.currentTarget.classList.add('active');
        	}else{
        		selectContent.style.display="none";
        		modal.style.display="none";
        		e.currentTarget.setAttribute("flag",0);
        	}
        	//点击任意位置，隐藏下拉列表selectContent
        	this.stopBubble(e); 
        	document.onclick=function(){
		        that.a("selectContent").style.display='none';
		        that.a("gray").style.display='none';
		        that.a("nav").children[1].setAttribute("flag",0);
		        that.a("nav").children[2].setAttribute("flag",0);
	        	for(var i=0;i<selectNav.length;i++){
		        	selectNav[i].classList.remove('active');
		        }
		　　　　　 document.onclick=null;　
		    }
        	
        },
        selectHosLevel(e,level){
        	this.filterHotHospitalList = [];
        	document.getElementById("selectContent").style.display="none";
        	document.getElementById("gray").style.display="none";
        	document.getElementById("nav").children[1].setAttribute("flag",0);
        	var selectNav = document.getElementById("nav").children;
        	for(var i=0;i<selectNav.length;i++){
	        	selectNav[i].classList.remove('active');
	        }
        	if(level=="0"){
        		this.filterHotHospitalList = this.hotHospitalList;
        		return;
        	}
        	for(var i=0;i<this.hotHospitalList.length;i++){
        		if(this.hotHospitalList[i].level==level){
        			this.filterHotHospitalList.push(this.hotHospitalList[i]);
        		}
        	}
        	if(this.filterHotHospitalList.length==0){
        		Toast({
	                message: '暂无结果',
	                position: 'middle',
	                duration: 1000
	            });
        	}
        },
        selectHosType(e,type){
        	this.filterHotHospitalList = [];
        	document.getElementById("selectContent").style.display="none";
        	document.getElementById("gray").style.display="none";
        	document.getElementById("nav").children[2].setAttribute("flag",0);
        	var selectNav = document.getElementById("nav").children;
        	for(var i=0;i<selectNav.length;i++){
	        	selectNav[i].classList.remove('active');
	        }
        	if(type=="0"){
        		this.filterHotHospitalList = this.hotHospitalList;
        		return;
        	}
        	for(var i=0;i<this.hotHospitalList.length;i++){
        		if(this.hotHospitalList[i].nature==type){
        			this.filterHotHospitalList.push(this.hotHospitalList[i]);
        		}
        	}
        	if(this.filterHotHospitalList.length==0){
        		Toast({
	                message: '暂无结果',
	                position: 'middle',
	                duration: 1000
	            });
        	}
        },
        //阻止冒泡函数
		stopBubble(e){  
		    if(e && e.stopPropagation){
		        e.stopPropagation();  //w3c
		    }else{
		        window.event.cancelBubble=true; //IE
		    }
		},
        getHotHospitalList(){
        	let params = [1,100];
	        /*commonAjax(params, 'hcn.easyDoctor', 'getHotHospitals').then(res => {
	            if (res.code === 200) {
	                this.hotHospitalList = res.body
	                console.log(res.body);
	            }
	        });*/
	        commonAjax(params, 'hcn.easyDoctor', 'getHotHospitals').then(res => {
                if (res.code === 200) {
                    if (res.body.length) {
                        this.hotHospitalList = res.body
                        this.filterHotHospitalList = res.body
                    } else {
                        this.hotHospitalList = []
                        this.filterHotHospitalList = []
                        Toast({
                            message: '暂无结果',
                            duration: 500
                        })
                    }
                }
            })
        }
        
    	
        
    },
    mounted() {
    	var _this = this;
        this.getHotHospitalList();
        this.a('selectContent').onclick=function(event){
		    //只阻止了向上冒泡，而没有阻止向下捕获，所以点击con的内部对象时，仍然可以执行这个函数
		    _this.stopBubble(event); 
		}
    },
    destroyed() {
    	
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #4eab52
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        color: #fff;
        background-color: #3AB76F;
    }
    .search{
    	display:block;
    	float:right;
    	width:20px;
    	height:20px;
    	background-image: url('../../assets/img/ssj_search_white.png');
    	background-size: 20px 20px;
    }
}
.select_condition{
	position:relative;
	width:100%;
	font-size:0.3rem;
	z-index:2;
}
.nav{
	width:100%;
	height:40px;
	padding:8px 0; 
	display:flex;
	background-color:#fff;
	border-bottom:1px solid #ddd;
	box-sizing:border-box;
}
.nav span{
	height:24px;
	line-height:24px;
	text-align:center;
	-moz-box-flex:1;
	flex:1 1 0;
	border-right:1px solid #8d8a85;
}
.nav span em{
	display:inline-block;
	/*float:left;*/
}
.nav span b{
	display:inline-block;
	/*float:left;*/
	vertical-align:middle;
	width:8px;
	height:30px;
	background:url('../../assets/img/ssj_arrow_down.png') no-repeat center center;
	margin:-2px 0 0 6px;
}
.nav span.active b{
	transform:rotate(180deg);
	-ms-transform:rotate(180deg); 	/* IE 9 */
	-moz-transform:rotate(180deg); 	/* Firefox */
	-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
}
.nav span:nth-child(3){
	border:none;
}
.select_content{
	/*display:none;*/
	position:absolute;
	top:40px;
	left:0;
	z-index:2;
	width:100%;
	background-color:#fff;
	overflow-y:auto;
}
.select_content ul{
	display:none;
}
.select_content ul li{
	width:100%;
	height:36px;
	line-height:36px;
	padding:0 20px;
	box-sizing:border-box;
	border-bottom:1px solid #ddd;
}
.select_content ul li.active{
	color:mainColor;
}
.gray{
	display:none;
	position:fixed;
	top:1rem;
	bottom:0;
	left:0;
	width:100%;
	background-color:rgba(0,0,0,0.5);
	z-index:1;
}
.hospital_level{
	margin-left:10px;
	font-weight:normal;
	font-size:0.24rem;
	/*color:#f38816;*/
	/*color:#faa319;*/
	/*color:#fdad00;*/
	/*color:#fd9b00;*/
	color:#f39c0e;
}
.address{
	height:18px;
	line-height:18px;
	background:url('../../assets/img/ssj_position.png') no-repeat left center / auto 16px;
	/*background-size:auto 16px;*/
	padding-left:20px;
	margin-top:5px;
}
.mint-cell{
	min-height:54px;
}
.hotHospital_list{
	margin-top:-1px;
}
.session {
    margin-top: 1rem;
    margin-bottom: 1rem;
} 

</style>

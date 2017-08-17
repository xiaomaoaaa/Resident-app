<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
        <div class="header">
	        <mt-header title="预产期自测">
	            <router-link to="/zy_service" slot="left">
	                <mt-button icon="back"></mt-button>
	            </router-link>
	        </mt-header>
	    </div>
        <div class="session">
        	<div class="select_date" @click='openPicker()'>
        		<label>末次月经时间</label>
        		<input type="text" id="date" v-model="selectDate" readonly="readonly"/>
        	</div>
        	<div class="btn_box">
        		<mt-button type="primary" size="large" class="btn_blue" @click="$router.push('/service/expectedDate/details/'+selectDate)">确定</mt-button>
        	</div>
		    <mt-datetime-picker 
		    	ref="picker" 
		    	v-model="pickerVisible" 
		    	type="date" 
		    	year-format="{value} 年" 
		    	month-format="{value} 月" 
		    	date-format="{value} 日" 
		    	:endDate="endDate"
		    	@confirm="handleConfirm">
		    </mt-datetime-picker>
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
import { MessageBox,Toast,Badge,Cell,DatetimePicker } from 'mint-ui'
export default {
    data: function() {
        return {
        	selectDate: new Date().Format('yyyy-MM-dd'),
        	endDate:new Date(),
        	pickerVisible:new Date(),
        }
    },
    created() {
        
    },
    methods: {
    	openPicker() {
	        this.$refs.picker.open();
	    },
        handleConfirm(){
        	this.selectDate = this.pickerVisible.Format('yyyy-MM-dd');
        	this.inputDate = this.pickerVisible.Format('yyyy-MM-dd');
        }
    },
    mounted() {
    	
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #3ab76f
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
    .add{
        background-image: url('../../assets/img/zy_add.png');
        background-size: 100% 100%;
        width: .4rem;
        height: .4rem;
        display: inline-block;
    }
}
.session {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-top:10px;
} 
.select_date{
	height:40px;
	line-height:40px;
	border-radius:5px;
	font-size:0.3rem;
	background-color:#fff;
	margin:0 10px;
	padding:0 8px;
}
.select_date input{
	float:right;
	width:200px;
	height:40px;
	height:40px;
	text-align:right;
	font-size:0.3rem;
	background-color:#fff;
	border:none;
	cursor:default;
}
.btn_box{
	padding:0 25px;margin-top:35px;
}
.btn_blue{
	background-color:mainColor;
}

</style>

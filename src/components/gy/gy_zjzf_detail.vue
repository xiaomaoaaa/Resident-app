<template>
	<div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
		<div class="header">
			<mt-header title="支付">
				<a slot="left" @click='$router.go(-1)'>
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
		</div>
		<div class="session gy_zjzf_final">
			<div class="pay_info">
				<mt-cell title="费用总金额" :value="'￥  ' + totalFee"></mt-cell>
				<mt-cell v-for="item in items" :title="item.displayName" :value="'￥  ' + item.value"></mt-cell>
				<mt-cell class="extraFeeDesc" :title="'说明：' + extraFeeDesc"></mt-cell>
			</div>
			<mt-cell class="selfPay" title="需支付金额" :value="'￥  ' + selfPay"></mt-cell>
			<mt-radio align="right" title="请选择支付方式" v-model="payType" :options="paysType"></mt-radio>
			<mt-button type="primary" size="large" @click="toPay">支付</mt-button>
			<div v-show="showPayForm" id="payForm"></div>
		</div>
	</div>
</template>
<script>
	import '../../assets/css/gy_style.css';
	import { commonAjax, commonAjaxKy } from '../../api/api.js';
	import { Navbar, TabItem, MessageBox, Toast, Cell, Checklist, Indicator } from 'mint-ui';
	import { mapActions, mapState } from 'vuex'
	export default {
		data: function() {
			return {
				totalFee: 0,
				items: [],
				extraFeeDesc: "",
				selfPay: 0,
				payType: "",
				paysType: [],
				gy_pay_info: [],
				showPayForm: false,
				precalId : ""
			}
		},
		computed: {
	        ...mapState(['xie_common'])
	    },
		mounted() {
			this.gy_pay_info = this.xie_common.gy_pay_info;
			Indicator.open();
	        commonAjaxKy(JSON.stringify(this.gy_pay_info), 'hcn.diagnosisPayTrade', 'getPrecalculatedFee').then(res => {
	            if (res.code == 200) {
	            	if(res.body){
	            		var thisObj = res.body;
	            		this.totalFee = thisObj.totalFee;
	            		this.items = thisObj.items;
	            		this.extraFeeDesc = thisObj.extraFeeDesc || "无";
	            		this.selfPay = thisObj.selfPay;
	            		this.precalId = thisObj.precalId;
	            	}
	            } else {
	            	Toast(res.msg);
	            }
	            Indicator.close();
	        });
	        commonAjaxKy(JSON.stringify([this.gy_pay_info[0]]), 'hcn.payTrade', 'getOrgPayInfo').then(res => {
	            if (res.code == 200) {
	            	if(res.body && res.body.length > 0){
	            		var thisObj = res.body,
	            			that = this;
	            		thisObj.forEach(function(item, index){
	            			that.paysType.push({
	            				label: item.payTypeText,
	            				value: item.payType
	            			});
	            			if (index == 0) that.payType = item.payType;
	            		});
	            	} else {
	            		
	            	}
	            } else {
	            	Toast(res.msg);
	            }
	            Indicator.close();
	        });
		},
		methods: {
			toPay() {
				var param = [{
					feeRecords: this.gy_pay_info[2],
					orgId: this.gy_pay_info[0],
					patientId: this.gy_pay_info[1],
					payType: this.payType,
					precalId: this.precalId,
					totalFee: this.totalFee,
					tradeType: this.payType,
					isBrowser: "1"
				}];
				commonAjaxKy(JSON.stringify(param), 'hcn.diagnosisPayTrade', 'createPaymentOrder').then(res => {
		            if (res.code == 200 && res.body) {
		            	var div = document.getElementById("payForm");
		            	div.innerHTML = res.body.tradeInfo;
						document.forms[0].submit();
		            } else {
		            	Toast('支付失败');
		            	this.$router.push("/gy_zjzf")
		            }
		            Indicator.close();
		        });
			}
		}
	}
</script>
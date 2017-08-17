<template>
	<div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
		<div class="header">
			<mt-header title="项目详情">
				<a slot="left" @click='$router.go(-1)'>
					<mt-button icon="back"></mt-button>
				</a>
			</mt-header>
		</div>
		<div class="session gy_zjzf_final">
			<div class="pay_info">
				<mt-cell title="科室" :value="gy_pay_info.deptName"></mt-cell>
				<mt-cell title="医生" :value="gy_pay_info.doctorName"></mt-cell>
				<mt-cell title="类别" :value="gy_pay_info.feeType"></mt-cell>
				<mt-cell title="金额" :value="'￥  ' + gy_pay_info.totalFee"></mt-cell>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/css/gy_style.css';
	import { Cell} from 'mint-ui';
	import { mapActions, mapState } from 'vuex'
	export default {
		data: function() {
			return {
				gy_pay_info: {}
			}
		},
		computed: {
	        ...mapState(['xie_common'])
	    },
		mounted() {
			this.gy_pay_info = this.xie_common.gy_pay_info;
		}
	}
</script>
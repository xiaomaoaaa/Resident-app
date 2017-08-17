<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
	<div class="header">
		<mt-header title="生活习惯">
			<a slot="left" @click='$router.push("/mybaseinfo2")'>
				<mt-button icon="back"></mt-button>
			</a>
			<a slot="right" @click='saveData'>
				<mt-button class="smallbtn">确定</mt-button>
			</a>
		</mt-header>
	</div>

	<div class="body mybaseinfo_habits">
		<p class="title cbafter">
			<span class="fl">饮食习惯</span>
			<span class="fr">多选</span>
		</p>
		<mt-checklist v-model="value" :options="options"></mt-checklist>
		<div class="divide"></div>

		<p class="title cbafter">
			<span class="fl">吸烟习惯</span>
			<span class="fr">单选</span>
		</p>
		<mt-radio v-model="value2" :options="options2"></mt-radio>
		<div class="divide"></div>

		<p class="title cbafter">
			<span class="fl">喝酒习惯</span>
			<span class="fr">单选</span>
		</p>
		<mt-radio v-model="value3" :options="options3"></mt-radio>
		<div class="divide"></div>

		<p class="title cbafter">
			<span class="fl">运动习惯</span>
			<span class="fr">单选</span>
		</p>
		<mt-radio v-model="value4" :options="options4"></mt-radio>
	</div>

</div>
</template>

<script>
import {
	Checklist,Toast
} from 'mint-ui'
import {
	mapActions,
	mapState
} from 'vuex'
export default {
	data: function() {
		return {
			options: [],
			value: [],
			options2: [],
			value2: '',
			options3: [],
			value3: '',
			options4: [],
			value4: '',
			result: [],
			// dietHabitsCode: ['','荤素均衡','偏好吃荤','偏好吃素','偏好咸的','偏好油的','偏好甜的'],
			// smokingHabitsCode: ['','每天吸烟','偶尔吸烟','从不吸烟'],
			// drinkingHabitsCode: ['','每天喝酒','偶尔喝酒','从不喝酒'],
			// exerciseHabitsCode: ['','每天运动','每周一次以上','偶尔运动','不运动']
		}
	},
	computed: {
	},
	methods: {
		saveData() {
			let obj = {}
			if(this.value) {
				obj.dietHabits = this.value.join(',')
			} else {
				obj.dietHabits = ''
			}
			obj.smokingHabits = this.value2
			obj.drinkingHabits = this.value3
			obj.exerciseHabits = this.value4

			console.log(obj)
			this.zbl_userHabits(JSON.stringify(obj))
			this.$router.push("/mybaseinfo2")
		},

		...mapActions(['zbl_userHabits'])
	},
	created() {
	},
	mounted() {
		this.options = [{
				label: '荤素均衡',
				value: '01'
			},
			{
				label: '偏好吃荤',
				value: '02'
			},
			{
				label: '偏好吃素',
				value: '03'
			},
			{
				label: '偏好咸的',
				value: '04'
			},
			{
				label: '偏好油的',
				value: '05'
			},
			{
				label: '偏好甜的',
				value: '06'
			}
		],
		this.options2 = [{
				label: '每天抽烟',
				value: '01'
			},
			{
				label: '偶尔抽烟',
				value: '02'
			},
			{
				label: '从不抽烟',
				value: '03'
			}
		],
		this.options3 = [{
				label: '每天喝酒',
				value: '01'
			},
			{
				label: '偶尔喝酒',
				value: '02'
			},
			{
				label: '从不喝酒',
				value: '03'
			}
		],
		this.options4 = [{
				label: '每天运动',
				value: '01'
			},
			{
				label: '每周一次以上',
				value: '02'
			},
			{
				label: '偶尔运动',
				value: '03'
			},
			{
				label: '从不运动',
				value: '04'
			}
		]

		// this.value = gettedHabits.dietHabits
		// this.value2 = gettedHabits.smokingHabits
		// this.value3 = gettedHabits.drinkingHabits
		// this.value4 = gettedHabits.exerciseHabits
	},
	// beforeRouteLeave(to, from, next) {
    //     to.meta.keepAlive = true
    //     next()
    // }
}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/zbl_style.css"
.mint-header {
	height: 1rem;
	font-size: .4rem;
	background-color: #35B46F;
}
.body {
	.title {
		font-size: .3rem;
		width: 90%;
		margin: 10px auto;
		.fl {
			color: green;
		}
		.fr {
			color: grey;
		}
	}
	.divide {
		height: 10px;
		background-color: #F2F2F2;
	}

}


</style>

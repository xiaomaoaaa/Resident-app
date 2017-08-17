<template>
		<div id="allmap"></div>
</template>
<script>
export default {
    components: {

    },
    data() {
        return {

        }

    },
    computed: {
		
    },
    methods: {
		map(){
	let map = new BMap.Map("allmap");
	let point = new BMap.Point(113.954077,22.546833);
	map.centerAndZoom(point, 15);
	
	//创建小狐狸
	let pt = new BMap.Point(116.417, 39.909);
	let myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
	let marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);   
		}
    },
    mounted() {
		this.map()
    },
}
</script>
<style >
	body,html,#allmap{width: 100%;height: 1000px;}
</style>
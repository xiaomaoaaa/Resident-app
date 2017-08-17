<template>
    <div class="mao_map">
        <mt-header title="便捷寻医" fixed>
            <a slot="left" @click='$router.back(-1)'>
				<mt-button icon="back"></mt-button>
			</a>
        </mt-header>
        <div id="map">

        </div>
        <div class="madvice">
            <p>{{mao_obj.fullName}}</p>
            <p>{{mao_obj.address}}</p>
        </div>
        <div class="mfooter" @click="maoroute"><img src="../../../assets/img/mao_compass.png" alt="">去这里</div>
    </div>
</template>


<script>
import { Header,Button,Search,Indicator,Loadmore,Navbar,TabItem,Toast } from 'mint-ui';
import "../../../assets/css/mao_style.css";
import { commonAjaxKy } from "../../../api/api.js";
    export default {
        data:function(){
            return{
                // mlongitude:"",
                // mlatitude:"",
                mao_obj:""
            }
        },
        components:{
            "mt-header":Header,
            "mt-button":Button
        },
        mounted:function(){
            let morgid=sessionStorage.getItem("orgId");
            console.log(morgid)
            let params='["'+morgid+'"]';
            commonAjaxKy(params,'hcn.easyDoctor','getHospitalDetail').then(res=>{
                if(res.code==200){
                    console.log(res)
                    // this.mlongitude=res.body.longitude;
                    // this.mlatitude=res.body.latitude; 
                    this.mao_obj=res.body;
                    this.initialize(this.mao_obj)
                }
            })
        },
        methods:{
            initialize(obj) {     
                console.log(obj)
                var map = new BMap.Map('map');  
                var point = new BMap.Point(obj.longitude,obj.latitude);
                map.centerAndZoom(point, 18);
                var marker = new BMap.Marker(point);// 创建标注
                map.addOverlay(marker);             // 将标注添加到地图中
                map.addControl(new BMap.NavigationControl());
                marker.disableDragging();
                map.setCurrentCity(obj.address);
                // map.addControl(new BMap.ScaleControl());    
                map.addControl(new BMap.OverviewMapControl());    
                map.addControl(new BMap.MapTypeControl());
                var opts = {
                width : 50,     // 信息窗口宽度
                height: 50,     // 信息窗口高度
                title : obj.shortName, // 信息窗口标题
                }
                var infoWindow = new BMap.InfoWindow("地址: "+obj.address, opts);  // 创建信息窗口对象 
                marker.addEventListener("click", function(){          
                    map.openInfoWindow(infoWindow,point); //开启信息窗口
                });
            },
            loadScript() {  
            // var script = document.createElement("script");  
            // script.src = "http://api.map.baidu.com/api?v=2.0&ak=8cqBuof3ZNrzv6Omyf6kD9kR1rGvAt6a&callback=initialize";//此为v2.0版本的引用方式  
            // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式  
            // document.body.appendChild(script);  
            },
            maoroute(){
                this.$router.push("/mmap/mrout")
            }    
        }
    }
</script>

<style scoped>
    .mao_map #map{width:100%;height:10rem;margin-top:.8rem;}
    .mao_map .madvice{border-bottom:1px solid #ccc;height:1.3rem;}
    .mao_map .madvice p{font-size:.33rem;margin-left:.3rem;margin-top:.3rem;}
    .mao_map .mfooter{height:.8rem;width:100%;font-size:.33rem;text-align:center;line-height:.8rem;color:#ccc;}
    .mao_map .mfooter img{width:.5rem;header:.5rem;vertical-align:middle;margin-right:.2rem;}
</style>
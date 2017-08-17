<template>
    <div class="mao_map">
        <div class="mao_header">
            <i @click="maoback"><img src="../../../assets/img/xie_jt.png" alt=""></i>
            <span @click="mao_car"><img src="../../../assets/img/mao_xingzhuang-sel.png" alt="" v-show="carshow"><img src="../../../assets/img/mao_xingzhuang.png" alt="" v-show="mcarshow"></span>
            <span @click="mao_bus"><img src="../../../assets/img/mao_bus-nor.png" alt="" v-show="busshow"><img src="../../../assets/img/mao_bus-sel.png" alt="" v-show="mbusshow"></span>
            <span @click="mao_walking"><img src="../../../assets/img/mao_work-nor.png" alt="" v-show="walkingshow"><img src="../../../assets/img/mao_work-sel.png" alt="" v-show="mwalkingshow"></span>
        </div>
        <div id="map">

        </div>
        <div class="mfooter" @click="maoroute"><span style="float:right;margin-right:.4rem;" @click="detailclick"><img src="../../../assets/img/mao_detail.png" alt="">详情</span></div>
        <div v-show="result" class="luxcx" >
            <mt-header title="路线详情" fixed>
                <mt-button slot="left" icon="back" @click="luxhide"></mt-button>  
            </mt-header>
            <div @click="maoroute"  id="r-result"></div>
        </div>
        
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
                mao_obj:"",
                weizhix:"",
                weizhiy:"",
                result:false,
                mpoint2:"",
                busshow:true,
                mbusshow:false,
                carshow:true,
                mcarshow:false,
                walkingshow:true,
                mwalkingshow:false
            }
        },
        components:{
            "mt-header":Header,
            "mt-button":Button
        },
        mounted:function(){
            let morgid=sessionStorage.getItem("orgId");
            let params='["'+morgid+'"]';
            // let params='["eaa3e9b0-2248-4f53-89b0-c237b3d6b55d"]';
            commonAjaxKy(params,'hcn.easyDoctor','getHospitalDetail').then(res=>{
                if(res.code==200){
                    console.log(res)
                    // this.mlongitude=res.body.longitude;
                    // this.mlatitude=res.body.latitude; 
                    this.mao_obj=res.body;
                    this.initialize(this.mao_obj,1)                  
                }
            })
        },
        methods:{
            initialize(obj,num) {     
                console.log(obj,num)
                var map = new BMap.Map('map');  
                var point = new BMap.Point(obj.longitude,obj.latitude);
                map.centerAndZoom(point, 14);
                map.enableScrollWheelZoom();
                map.enableDragging(); 
                map.enableScrollWheelZoom();//启用滚轮放大缩小
                var marker = new BMap.Marker(point);// 创建标注
                map.addOverlay(marker);             // 将标注添加到地图中               
                map.addControl(new BMap.NavigationControl());
                marker.disableDragging();
                map.setCurrentCity(obj.address);
                // map.addControl(new BMap.ScaleControl());    
                map.addControl(new BMap.OverviewMapControl());    
                map.addControl(new BMap.MapTypeControl());
                // map.enableDragging();
                
                //获取客户的定位
                var geolocation = new BMap.Geolocation();
                let point2="";
                var that=this;
                let point3="";
                console.log(this)
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        console.log('您的位置：'+r.point.lng+','+r.point.lat);
                        that.weizhix=r.point.lng;
                        that.weizhiy=r.point.lat;
                        point2=new BMap.Point(r.point.lng,r.point.lat);    
                        //百度地图地理位置转换代码
                        // let translateCallback = function (data){
                        // if(data.status === 0) {
                        //     var marker = new BMap.Marker(data.points[0]);
                        //     map.addOverlay(marker);
                        //     var label = new BMap.Label({offset:new BMap.Size(20,-10)});
                        //     // marker.setLabel(label); //添加百度label
                        //     map.setCenter(data.points[0]);
                        //     } 
                        //     point3=marker.point;
                        //     console.log(point3)
                            
                        // }
                        
                        // setTimeout(function(){
                        //     var convertor = new BMap.Convertor();
                        //     var pointArr = [];
                        //     pointArr.push(point2);
                        //     convertor.translate(pointArr, 1, 5,translateCallback)
                        // }, 1000);
                        // console.log(point3)
                        if(num==1){
                            var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false,panel: "r-result",}});
                            driving.search(point2, point); 
                        }
                        if(num==2){
                            var transit = new BMap.TransitRoute(map, {
                            renderOptions: {map: map,autoViewport: true,panel: "r-result"}
                            });
                            transit.search(point2, point);
                        }
                        if(num==3)
                        {
                            var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: false,panel: "r-result"}});
	                        walking.search(point2, point);
                        }
                        
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
                        
            },
            loadScript() {  
            // var script = document.createElement("script");  
            // // script.src = "http://api.map.baidu.com/api?v=2.0&ak=8cqBuof3ZNrzv6Omyf6kD9kR1rGvAt6a&callback=initialize";//此为v2.0版本的引用方式  
            // // // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式  
            // document.body.appendChild(script);  
            },
            maoroute(){
                this.$router.push("/mmap/mrout")
            },
            mao_car(){
                this.busshow=true,
                this.mbusshow=false,
                this.carshow=true,
                this.mcarshow=false,
                this.walkingshow=true,
                this.mwalkingshow=false
                this.initialize(this.mao_obj,1)
            },
            detailclick(){
            //    var abc= document.getElementsByClassName("suggest-plan-des")[0].innerHTML;
            //             console.log(abc)
                this.result=true;
            },
            maoback(){
                this.$router.push("/mmap")
            },
            luxhide(){
                this.result=false;
            },
            mao_bus(){
                this.busshow=false,
                this.mbusshow=true,
                this.carshow=false,
                this.mcarshow=true,
                this.walkingshow=true,
                this.mwalkingshow=false  
                this.initialize(this.mao_obj,2)
            },
            mao_walking(){
                this.busshow=true,
                this.mbusshow=false,
                this.carshow=false,
                this.mcarshow=true,
                this.walkingshow=false,
                this.mwalkingshow=true
                this.initialize(this.mao_obj,3)
            }    
        }
    }
</script>

<style scoped>
    .mao_map #map{width:100%;height:11.6rem;}
    .mao_map .mao_header {display:flex;}
    .mao_map .mao_header i{width:1rem;height:.8rem;align-items:center;text-align:center;justify-content: center;flex:.3;display:flex;}
    .mao_map .mao_header i img{width:.4rem;height:.4rem;}
    .mao_map .mao_header span {flex:1;text-align:center;display:flex;height:.8rem;align-items:center;text-align:center;justify-content: center;}
    .mao_map .mao_header span img{width:.4rem;height:.4rem;}
    .mao_map .madvice{border-bottom:1px solid #ccc;height:1.3rem;}
    .mao_map .madvice p{font-size:.33rem;margin-left:.3rem;margin-top:.3rem;}
    .mao_map .mfooter{height:.8rem;width:100%;font-size:.33rem;text-align:center;line-height:.8rem;color:#ccc;}
    .mao_map .mfooter img{width:.5rem;header:.5rem;vertical-align:middle;margin-right:.2rem;}
    .mao_map .luxcx{height:100%;width:100%;position:absolute;top:0;}
</style>
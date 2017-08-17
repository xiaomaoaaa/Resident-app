<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
    <div class="header">
        <mt-header title="便捷寻医">
            <a slot="left" @click='$router.push("xie_home")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="body">
        <div id="allmap"></div>
        <div class="bottomFixCont">
            <div class="textDetail">
                <p>秀新社康中心</p>
                <p>广东省深圳市</p>
            </div>
            <div class="goHere">
                <p @click='goHere'>去这里</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    commonAjax,
    commonAjaxKy,
    requestLoginon,
    areaAjax,
    dicAjax
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    Indicator,
    MessageBox
} from 'mint-ui'
export default {
    data: function() {
        return {
        }
    },
    computed: {},
    components: {},
    methods: {
        bdMapFunc(longitude = 111.622393, latitude = 26.460885) {
            let bdMap = new BMap.Map("allmap");
            let point = new BMap.Point(longitude, latitude);
            let marker = new BMap.Marker(point); // 创建标注
            bdMap.addOverlay(marker); // 将标注添加到地图中
            bdMap.centerAndZoom(point, 17);
            let opts = {
                width: 200, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: "联系方式：13588888888", // 信息窗口标题
                enableMessage: true //设置允许信息窗发送短息
            }
            let infoWindow = new BMap.InfoWindow("地址：广东省广州市广州大学城", opts); // 创建信息窗口对象
            marker.addEventListener("click", function() {
                bdMap.openInfoWindow(infoWindow, point); //开启信息窗口
            });
            bdMap.addControl(new BMap.MapTypeControl()); //添加地图类型控件
            bdMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        },
        goHere() {
            let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    // this.bdMapFunc(r.point.lng, r.point.lat)
                    let bdMap = new BMap.Map("allmap");
                    let point = new BMap.Point(r.point.lng, r.point.lat);
                    let marker = new BMap.Marker(point); // 创建标注
                    bdMap.addOverlay(marker); // 将标注添加到地图中
                    bdMap.centerAndZoom(point, 17);
                    bdMap.addControl(new BMap.MapTypeControl()); //添加地图类型控件
                    bdMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                } else {
                    alert('failed' + this.getStatus());
                }
            }, {
                enableHighAccuracy: true
            })
        },
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.bdMapFunc()
        })
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .35rem

.header {
    .mint-header {
        height: 1rem;
        font-size: .4rem;
        background-color: mainColor;
    }
}
.body {
    // position: relative;
    #allmap {
        width: 100%;
        height: 100vh;
    }
    .bottomFixCont {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        z-index: 999;
    }
    .textDetail {
        border-bottom: 1px solid #ddd;
        font-size: fontSize;
        padding: .2rem;
        line-height: 1.5;
    }
    .goHere {
        font-size: fontSize;
        text-align: center;
        padding: .3rem 0;
    }
}
</style>

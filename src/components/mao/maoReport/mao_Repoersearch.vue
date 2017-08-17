<template>
<div class="mao_searchbox">
    <div class="mao_msearch">
    <router-link to="/Reportone">
        <div class="mao_back">
            <img src="../../../assets/img/mao_back.png" alt="">
        </div>
    </router-link>
        <div class="mao_kuang">
            <input type="text" placeholder="输入姓名检索居民" v-model="value">
            <button v-on:click="msuss">搜索</button>
        </div>
        <div class="mao_bglb">
            <ul>
                <li v-for="item in sousuolibiaoList" @click="maocszhi(item)">
                    <p><img :src="item.reportType" alt=""><b>{{item.itemName}}</b><span>{{(item.reportDt).split(" ")[0]}}</span></p>
                    <p class="maozsygp"><img src="../../../assets/img/mao_dibiao.png" alt=""><span>{{item.orgName}}</span><span class="mao_bgzy">{{item.reportSourceText}}</span></p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { Cell,MessageBox,Toast } from 'mint-ui';
import { commonAjaxKy } from "../../../api/api.js";
import "../../../assets/css/mao_style.css";
var imgUrl1=require("../../../assets/img/mao_jcxm.png")
var imgUrl2=require("../../../assets/img/mao_jybg.png")
    export default {
        data:function(){
            return{
                value:"",
                sousuolibiaoList:[],
                yuliubaocun:[],
                m_quanbushuju:[],
                mimgsrc1:imgUrl1,
                mimgsrc2:imgUrl2,
            }
        },
        components:{
            "mt-cell":Cell
        },
        mounted:function(){
            let params='[{"mpiId":"e64299249f7b410991cc17b5d81d67e4","pageSize":50,"pageNo":1}]';
            commonAjaxKy(params,'hcn.report','queryList').then(res=>{
                if(res.code==200){
                    // console.log(res)
                    for(var i=0;i<res.body.length;i++){
                        this.yuliubaocun.push(res.body[i]);
                        if(this.yuliubaocun[i].reportType=="1"){
                            this.yuliubaocun[i].reportType=imgUrl1
                            // console.log(this.jybgsjlis[i])
                        }
                        if(this.yuliubaocun[i].reportType=="2"){
                            this.yuliubaocun[i].reportType=imgUrl2
                        }
            //             // this.m_quanbushuju.push(res.body.SignResident[i]);
            //             // console.log((res.body.SignResident[i].personName).split(""))
            //             // var m_shuruz=(res.body.SignResident[i].personName).split("")
            //             // for(var j=0;j<m_shuruz.length;j++){
            //             //     if(this.value==m_shuruz[i]){
            //             //         this.sousuolibiaoList.push(res.body.SignResident[i].personName)
            //             //     }else{
            //             //         console.log("对不起没有找到!")
            //             //     }
            //             // }
            //             // console.log(this.yuliubaocun)
            //             // console.log(this.m_quanbushuju);
                    }
                }
            })
        },
        methods:{
            msuss:function(){
            this.sousuolibiaoList=[];
               for(var j=0;j<this.yuliubaocun.length;j++){
                   var m_shuruz=this.yuliubaocun[j].itemName.split("");
                //    console.log(m_shuruz)
                   for(var n=0;n<m_shuruz.length;n++){
                       if(this.value==m_shuruz[n]||this.value==this.yuliubaocun[j].itemName){
                        //    console.log(m_shuruz[n])
                        this.sousuolibiaoList.push(this.yuliubaocun[j])
                       }
                   }
               }
                // console.log(this.sousuolibiaoList);
            },
            maocszhi:function(item){
                // console.log(item)
                if(item.reportType==imgUrl1){
                    item.reportType="1"
                    // console.log(item.reportType)
                }
                if(item.reportType==imgUrl2){
                    item.reportType="2"
                }
                // console.log(item)
                sessionStorage.setItem('reporttwozhi',JSON.stringify(item));
                this.$router.push("/Reportone/reporttwodetail")
            }
        }
    }
</script>

<style scoped>
    .mao_searchbox{width:100%;height:100%;background-color:#eee;position:absolute;top:0;left:0;bottom:0;right:0;}
    .mao_msearch{height:1rem;line-height:1rem;border-bottom:1px solid #ccc;}
    .mao_msearch .mao_back{height:1rem;width:.6rem;display:flex;align-items:center;float:left;}
    .mao_msearch .mao_back img{width:.5rem;height:.5rem;}
    .mao_msearch .mao_kuang{height:1rem;display:flex;align-items:center;}
    .mao_msearch .mao_kuang input{flex:1;height:.6rem;border-radius:5px;outline:none;margin-right:.2rem;border:0;}
    .mao_msearch .mao_kuang button{width:.8rem;height:.6rem;border:0;outline:none;color:#26a2ff;background-color:#eee;font-size:.33rem;}
    .mao_msearch .mint-cell{min-height:1.12rem;border-bottom:1px solid #eee;}

    .mao_msearch .mao_bglb{height:100%;width:100%;}
    .mao_msearch .mao_bglb ul {background-color: #eee;}
    .mao_msearch .mao_bglb ul li{height:1.6rem;border-bottom:1px solid #ccc;}
    .mao_msearch .mao_bglb ul li p{font-size:.33rem;height:.8rem;line-height:.8rem;display:flex;}
    .mao_msearch .mao_bglb ul li p img{width:.3rem;height:.3rem;margin-right:.2rem;margin-top:.2rem;margin-left:.2rem;}
    .mao_msearch .mao_bglb ul li p span{width:100%;height:.8rem;flex:1;text-align:right;color:#A0A0A0;margin-right:.2rem;}
    .mao_msearch .mao_bglb ul li p i{text-align:right;}
    .mao_msearch .mao_bglb ul li b{width:60%;}
    .mao_msearch .mao_bglb ul li .maozsygp .mao_bgzy{text-align:right;}
    .mao_msearch .mao_bglb ul li .maozsygp span{text-align:left;margin-right:.2rem;}
</style>

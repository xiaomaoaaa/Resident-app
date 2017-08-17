<template>
    <div class="mao_report">
        <mt-header title="全部报告" fixed>
        <router-link to="/xie_home" slot="left">
            <mt-button icon="back" @click.native="maobreak"></mt-button>
        </router-link>
        <mt-button slot="right" v-on:click="gaojcx">高级查询</mt-button>
        </mt-header>
        <div class="mao_dianjixl" @click="maozzcdj">
            <ul>
                <li><span @click="maoqbbg" class="mao_bgls">全部报告</span></li>
                <li><span @click="maomzbg" class="mao_bgls">门诊报告</span></li>
                <li><span @click="maozybg" class="mao_bgls">住院报告</span></li>
            </ul>
        </div>
        <div class="maoserch">
            <mt-search v-model="value" placeholder="输入报告关键字搜索" cancel-text="" @click.native="maotzdserch"></mt-search>
        </div>
        <mt-loadmore @bottom-status-change="handleBottomChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="up" ref="loadmore">
        <div class="mao_bglb" @click.native="getList" v-show="showone">
            <ul>
                <li v-for="item in jybgsjlis" @click="maocszhi(item)">
                    <p><img :src="item.reportType" alt=""><b>{{item.itemName}}</b><span>{{(item.reportDt).split(" ")[0]}}</span></p>
                    <p class="maozsygp"><img src="../../../assets/img/mao_dibiao.png" alt=""><span>{{item.orgName}}</span><span class="mao_bgzy">{{item.reportSourceText}}</span></p>
                </li>
            </ul>
        </div>
        <div class="mao_bglbone" @click.native="getList"  v-show="showtwo">
            <ul>
                <li v-for="mzitem in jybgmzlis" @click="maocszhi(mzitem)">
                    <p><img :src="mzitem.reportType" alt=""><b>{{mzitem.itemName}}</b><span>{{(mzitem.reportDt).split(" ")[0]}}</span></p>
                    <p class="maozsygp"><img src="../../../assets/img/mao_dibiao.png" alt=""><span>{{mzitem.orgName}}</span><span class="mao_bgzy">{{mzitem.reportSourceText}}</span></p>
                </li>
            </ul>
        </div>
        <div class="mao_bglbtwo" @click.native="getList" v-show="showthr">
            <ul>
                <li v-for="zyitem in jybgzylis" @click="maocszhi(item)">
                    <p><img :src="zyitem.reportType" alt=""><b>{{zyitem.itemName}}</b><span>{{(zyitem.reportDt).split(" ")[0]}}</span></p>
                    <p class="maozsygp"><img src="../../../assets/img/mao_dibiao.png" alt=""><span>{{zyitem.orgName}}</span><span class="mao_bgzy">{{zyitem.reportSourceText}}</span></p>
                </li>
            </ul>
        </div>
        </mt-loadmore>
    </div>
</template>

<script>
import { Header,Button,Search,Indicator,Loadmore,Navbar,TabItem,Toast } from 'mint-ui';
import "../../../assets/css/mao_style.css";
import { commonAjaxKy } from "../../../api/api.js";
var imgUrl1=require("../../../assets/img/mao_jcxm.png")
var imgUrl2=require("../../../assets/img/mao_jybg.png")
    export default {
        data:function(){
            return{
                value:"",
                mimgsrc1:imgUrl1,
                mimgsrc2:imgUrl2,
                jybgsjlis:[],
                pageNo: 1,
                allLoaded: false,
                bottomStatus:'' ,
                jybgmzlis:[],
                totalGetCount:"",
                jybgzylis:[],
                showone:true,
                showtwo:false,
                showthr:false,
                loginhqmpild:""
            }
        },
        components:{
            "mt-header":Header,
            "mt-button":Button
        },
        created(){

        // this.getList();
        },
        mounted:function(){
            // document.getElementsByClassName("mint-header-title")[0].innerHTML="全部报告";
            // document.getElementsByClassName("mao_bgls")[0].classList.add("maonactive");
            // document.getElementsByClassName("mao_bgls")[1].classList.remove("maonactive");
            // document.getElementsByClassName("mao_bgls")[2].classList.remove("maonactive");
            var params='[]';
            Indicator.open('加载中...');
            commonAjaxKy(params,'hcn.device','getAppInfoByDevice').then(res=>{
                if(res.code==200){
                    // console.log(res)
                    this.loginhqmpild=res.body.user.mpiId
                    // console.log(this.loginhqmpild)
                    this.getList();
                }
            })

            document.getElementsByClassName("mint-header-title")[0].addEventListener("click",function(){
                document.querySelector(".mao_dianjixl").style.display="block";
            })
        },
        methods:{
            //高级查询
            gaojcx:function(){
                this.$router.push("/Reportone/reportgjsearch")
            },
            //遮罩层
            maoallbaogao:function(e){
                // console.log(e.target)

            },
            maobreak:function(){
                Indicator.close()//点击返回键直接取消加载圈
            },
            maozzcdj:function(){
                document.querySelector(".mao_dianjixl").style.display="none";
            },
            //选择全部还是门诊还是住院判断
            maoqbbg:function(){
                this.showone=true;
                this.showtwo=false;
                this.showthr=false;
                document.getElementsByClassName("mao_bgls")[0].classList.add("maonactive")
                document.getElementsByClassName("mao_bgls")[1].classList.remove("maonactive")
                document.getElementsByClassName("mao_bgls")[2].classList.remove("maonactive")
                document.getElementsByClassName("mint-header-title")[0].innerHTML="全部报告"
            },
            maomzbg:function(){
                this.showone=false;
                this.showtwo=true;
                this.showthr=false;
                document.getElementsByClassName("mao_bgls")[1].classList.add("maonactive")
                document.getElementsByClassName("mao_bgls")[0].classList.remove("maonactive")
                document.getElementsByClassName("mao_bgls")[2].classList.remove("maonactive")
                document.getElementsByClassName("mint-header-title")[0].innerHTML="门诊报告"
            },
            maozybg:function(){
                this.showone=false;
                this.showtwo=false;
                this.showthr=true;
                document.getElementsByClassName("mao_bgls")[2].classList.add("maonactive")
                document.getElementsByClassName("mao_bgls")[1].classList.remove("maonactive")
                document.getElementsByClassName("mao_bgls")[0].classList.remove("maonactive")
                document.getElementsByClassName("mint-header-title")[0].innerHTML="住院报告"
            },
            maotzdserch:function(){
                this.$router.push("/Reportone/reportsearch")
            },
            maocszhi:function(item){
                if(item.reportType==imgUrl1){
                    item.reportType="1"
                    // console.log(this.jybgsjlis[i])
                }
                if(item.reportType==imgUrl2){
                    item.reportType="2"
                }
                // console.log(item)
                sessionStorage.setItem('reporttwozhi',JSON.stringify(item));
                this.$router.push("/Reportone/reporttwodetail")
            },
        //     handleTopChange:function(status) {
        //     this.topStatus = status;
        //     console.log("this.topStatus = "+ status);
        //   },
            handleBottomChange:function(status) {
                this.bottomStatus = status;
            // console.log("this.bottomStatus = status; "+ status);
          },
            loadBottom:function() {
            // console.log("上拉在执行");
                this.pageNo=this.pageNo+1;
            if (this.pageNo == this.totalGetCount) {
                this.allLoaded = true;
            }
            // console.log("this.page:"+this.pageNo);
                this.getList(this.pageNo);
            // if(this.pageNo==3){
            //     this.allLoaded=true;  //当所有数据 全部读取完成的时候 停止下拉读取数据
            //     }
                this.$refs.loadmore.onBottomLoaded();
            },
            getList:function(pageNo){
                // console.log(this.loginhqmpild)
            let params=[{"mpiId":this.loginhqmpild,"pageSize":10,"pageNo":this.pageNo}];
            // Indicator.open('加载中...');
            commonAjaxKy(JSON.stringify(params),'hcn.report','queryList').then(res=>{
                if(res.code==200){
                    // console.log(res)
                    // this.jybgsjlis=res.body;
                    let tmparry=[];
                    if(res.body==null){
                        // Toast({
                        // message: '暂无数据',
                        // duration: 1000
                        // });
                    }else{
                    res.body.map((e,i)=>{
                       if(i<=10){
                          tmparry.push(e);
                        }
                        console.log(i)
                        console.log(e)
                        })
                    }

                    this.jybgsjlis = this.jybgsjlis.concat(tmparry);
                    // console.log(tmparry)

                    for(var i=0;i<this.jybgsjlis.length;i++){
                        if(this.jybgsjlis[i].reportType=="1"){
                            this.jybgsjlis[i].reportType=imgUrl1
                            // console.log(this.jybgsjlis[i])
                        }
                        if(this.jybgsjlis[i].reportType=="2"){
                            this.jybgsjlis[i].reportType=imgUrl2
                        }
                        if(this.jybgsjlis[i].reportSourceText=="门诊"){
                            this.jybgmzlis.push(this.jybgsjlis[i])
                            // console.log(this.jybgmzlis)
                        }
                        if(this.jybgsjlis[i].reportSourceText=="住院"){
                            this.jybgzylis.push(this.jybgsjlis[i])
                            // console.log(this.jybgzylis)
                        }
                    }
                    Indicator.close()
                }
            })

                    //console.log(res.data.debitList);
                .catch( (error) =>{
                //   this.jybgsjlis.push({
                //           "message": "1API rate limit exceeded ",
                //           "documentation_url": "https://developer.github.com/v3/#rate-limiting"
                //   },{
                //           "message": "2API rate limit exceeded)",
                //           "documentation_url": "https://developer.github.com/v3/#rate-limiting"
                //   });

                  console.log('错误:'+error);
                });
        }
        }
    }
</script>

<style scoped>
    .mao_report .mint-header{background-color:#35B46F;height:1rem;font-size:.37rem;}
    .mao_report .maoserch{padding-top:1rem;}
    .mao_report .mao_bglb{height:100%;width:100%;}
    .mao_report .mao_bglb ul {}
    .mao_report .mao_bglb ul li{height:1.6rem;border-bottom:1px solid #ccc;}
    .mao_report .mao_bglb ul li p{font-size:.33rem;height:.8rem;line-height:.8rem;display:flex;}
    .mao_report .mao_bglb ul li p img{width:.3rem;height:.3rem;margin-right:.2rem;margin-top:.2rem;margin-left:.2rem;}
    .mao_report .mao_bglb ul li p span{width:100%;height:.8rem;flex:1;text-align:right;color:#A0A0A0;margin-right:.2rem;}
    .mao_report .mao_bglb ul li p i{text-align:right;}
    .mao_report .mao_bglb ul li b{width:60%;}
    .mao_report .mao_bglb ul li .maozsygp .mao_bgzy{text-align:right;}
    .mao_report .mao_bglb ul li .maozsygp span{text-align:left;margin-right:.2rem;}
    .mao_report .mao_activeone{color:green;border:1px solid green;padding:.2rem}
    .mao_report .mao_activetwo{color:yellow;border:1px solid yellow;padding:.2rem}

    .mao_report .mao_bglbone{height:100%;width:100%;}
    .mao_report .mao_bglbone ul {}
    .mao_report .mao_bglbone ul li{height:1.6rem;border-bottom:1px solid #ccc;}
    .mao_report .mao_bglbone ul li p{font-size:.33rem;height:.8rem;line-height:.8rem;display:flex;}
    .mao_report .mao_bglbone ul li p img{width:.3rem;height:.3rem;margin-right:.2rem;margin-top:.2rem;margin-left:.2rem;}
    .mao_report .mao_bglbone ul li p span{width:100%;height:.8rem;flex:1;text-align:right;color:#A0A0A0;margin-right:.2rem;}
    .mao_report .mao_bglbone ul li p i{text-align:right;}
    .mao_report .mao_bglbone ul li b{width:60%;}
    .mao_report .mao_bglbone ul li .maozsygp .mao_bgzy{text-align:right;}
    .mao_report .mao_bglbone ul li .maozsygp span{text-align:left;margin-right:.2rem;}


    .mao_report .mao_bglbtwo{height:100%;width:100%;}
    .mao_report .mao_bglbtwo ul {}
    .mao_report .mao_bglbtwo ul li{height:1.6rem;border-bottom:1px solid #ccc;}
    .mao_report .mao_bglbtwo ul li p{font-size:.33rem;height:.8rem;line-height:.8rem;display:flex;}
    .mao_report .mao_bglbtwo ul li p img{width:.3rem;height:.3rem;margin-right:.2rem;margin-top:.2rem;margin-left:.2rem;}
    .mao_report .mao_bglbtwo ul li p span{width:100%;height:.8rem;flex:1;text-align:right;color:#A0A0A0;margin-right:.2rem;}
    .mao_report .mao_bglbtwo ul li p i{text-align:right;}
    .mao_report .mao_bglbtwo ul li b{width:60%;}
    .mao_report .mao_bglbtwo ul li .maozsygp .mao_bgzy{text-align:right;}
    .mao_report .mao_bglbtwo ul li .maozsygp span{text-align:left;margin-right:.2rem;}


    .mao_report .mao_dianjixl{position:absolute;background:rgba(0, 0, 0, 0.7);z-index:10;position:fixed;top:1rem;left:0;bottom:0;right:0;display:none;}
    .mao_report .mao_dianjixl ul{width:100%;height:1.4rem;line-height:1.4rem;display:flex;background-color:#FAFAFA;}
    .mao_report .mao_dianjixl ul li{float:left;font-size:.33rem;flex:1;text-align:center;}
    .mao_report .mao_dianjixl ul li span{padding:.2rem .4rem;background-color:white;border-radius:10px;}
    .mao_report .maonactive{background-color:green !important;color:white;}
</style>

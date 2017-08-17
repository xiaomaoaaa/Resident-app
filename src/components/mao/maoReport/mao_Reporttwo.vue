<template>
    <div class="maoreporttwodetail">
        <mt-header title="检验报告详情" fixed>
            <mt-button icon="back" slot="left" @click="maobtnfh"></mt-button>
        <mt-button slot="right" icon="more"></mt-button>
        </mt-header>
        <div v-show="mdetailone" class="divqieone">
            <div class="detailmiaosu">
                <ul>
                    <li><span class="detailms_left">检验项目</span><span>{{reportonesj.itemName}}</span></li>
                    <li><span class="detailms_left">申请机构</span><span>{{reportonesj.orgName}}</span></li>
                    <li><span class="detailms_left">检验机构</span><span>{{maorpjigou}}</span></li>
                    <li><span class="detailms_left">检验时间</span><span>{{maocjtime}}</span></li>
                    <li><span class="detailms_left">报告时间</span><span>{{maoqztime}}</span></li>
                    <li><span class="detailms_left">报告备注</span><span>{{maobgbz}}</span></li>
                </ul>
            </div>
            <div class="xmjgdwjs">
                <span class="maoxmjs">项目</span><span>结果</span><span>单位</span>
            </div>
            <div class="xmjgdwjs1" v-for="item in maobgxqlist">
                <span class="maoxmjs">{{item.labName}}</span><div><p class="maojgtop">{{item.result}}</p><p>({{item.referUpper}})</p></div><span>{{item.resultUnit}}</span>
            </div>
        </div>


        <div v-show="mdetailtwo"  class="divqietwo">
            <div class="detailmiaosu1">
                <ul>
                    <li><span class="detailms_left">检验项目</span><span>{{reportonesj.itemName}}</span></li>
                    <li><span class="detailms_left">申请机构</span><span>{{reportonesj.orgName}}</span></li>
                    <li><span class="detailms_left">报告机构</span><span>{{maorpjigou}}</span></li>
                    <li><span class="detailms_left">检验时间</span><span>{{maocjtime}}</span></li>
                    <li><span class="detailms_left">报告时间</span><span>{{maoqztime}}</span></li>
                </ul>
            </div>
            <div class="xmjgdwjs">
                <p>临床诊断</p>
            </div>
            <div class="lczdjieguo">
                <p>无</p>
            </div>
            <div class="yingxsjian">
                <p>影像所见</p>
            </div>
            <div class="yingxsjianjg">
                <p v-for="yxitem in yxsjmao">{{yxitem}}</p>
            </div>
            <div class="zhenduyij">
                <p>诊断意见</p>
            </div>
            <div class="zhendyjjg">
                <p v-for="zditem in zdyjmao">{{zditem}}</p>
            </div>
            <div class="xmjgdwjs1" v-for="item in maobgxqlist">
                <span class="maoxmjs">{{item.labName}}</span><div><p class="maojgtop">{{item.result}}</p><p>({{item.referUpper}})</p></div><span>{{item.resultUnit}}</span>
            </div>
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
                reportonesj:"",
                maoqqhtsjz1:"",
                maoqqhtsjz2:"",
                maorpjigou:"",
                maocjtime:"",
                maoqztime:"",
                maobgbz:"",
                mdetailone:false,
                mdetailtwo:false,
                maobgxqlist:[],
                yxsjmao:[],
                zdyjmao:[]
            }
        },
        components:{
            "mt-header":Header,
            "mt-button":Button
        },
        mounted:function(){
            document.getElementsByClassName("mintui mintui-more")[0].addEventListener("click",function(){
                Toast('此功能暂未开放');
            })
            this.reportonesj=JSON.parse(sessionStorage.getItem("reporttwozhi"));
            // console.log(this.reportonesj);
            if(this.reportonesj.reportType==="2"){
                this.mdetailone=true;
                this.mdetailtwo=false;
                this.maoqqhtsjz1=this.reportonesj.odsId;
                this.maoqqhtsjz2=this.reportonesj.readFlag;
                // console.log(this.maoqqhtsjz2)
                let params=`[${this.maoqqhtsjz1},${this.maoqqhtsjz2}]`;
                // console.log(params)
                Indicator.open('加载中...');
                commonAjaxKy(params,'hcn.labReport','getLabReport').then(res=>{
                    if(res.code==200){
                        // console.log(res)
                        this.maorpjigou=res.body.rpOrgName;
                        this.maocjtime=res.body.createDt.split(" ")[0];
                        this.maoqztime=res.body.reportDt.split(" ")[0];
                        this.maobgxqlist=res.body.details;
                        if(res.body.comment==""){
                            res.body.comment="无"
                        }
                        this.maobgbz=res.body.comment;
                        this.$nextTick(()=>{
                            for(var i=0;i<res.body.details.length;i++){
                                // console.log((Number(res.body.details[i].result)<Number(res.body.details[i].referUpper.split("~")[1])))
                                if((Number(res.body.details[i].result)<Number(res.body.details[i].referUpper.split("~")[0]))||(Number(res.body.details[i].result)>Number(res.body.details[i].referUpper.split("~")[1]))){
                                    // console.log(i)
                                    document.getElementsByClassName("maojgtop")[i].style.color="red";
                                }
                            }
                        })
                    }else{
                        Toast('暂无数据');
                        Indicator.close();
                    }
                    Indicator.close();
                })
            }
            //如果是胎儿的图片时
            if(this.reportonesj.reportType==="1"){
                this.mdetailtwo=true;
                this.mdetailone=false;
                this.maoqqhtsjz1=this.reportonesj.odsId;
                this.maoqqhtsjz2=this.reportonesj.readFlag;
                let params=`[${this.maoqqhtsjz1},${this.maoqqhtsjz2}]`;
                Indicator.open('加载中...');
                commonAjaxKy(params,'hcn.examReport','getExamReport').then(res=>{
                    if(res.code==200){
                        // console.log(res);
                        this.maorpjigou=res.body.rpOrgName;
                        this.maocjtime=res.body.createDt.split(" ")[0];
                        this.maoqztime=res.body.reportDt.split(" ")[0];
                        // console.log(res.body.examView.split("\n"))
                        var maoabc=res.body.examView.split("\n");

                        // var maobacd=maoabc.join("\n")
                        // this.yxsjmao=res.body.examView.replace("\n","<br />");
                        // console.log(this.yxsjmao)
                        this.yxsjmao=maoabc;

                        var maolsbc=res.body.diagnoseOpinion.split("\n");
                        this.zdyjmao=maolsbc;
                    }
                    Indicator.close();
                })
            }
        },
        methods:{
            maobtnfh:function(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .maoreporttwodetail .mint-header{background-color:#35B46F;height:1rem;font-size:.37rem;}
    .maoreporttwodetail .divqieone .detailmiaosu{height:100%;padding-top:1rem;}
    .maoreporttwodetail .divqieone .detailmiaosu ul{height:4rem;margin-left:.4rem;}
    .maoreporttwodetail .divqieone .detailmiaosu ul li{font-size:.33rem;display:flex;height:.6rem;line-height:.6rem;}
    .maoreporttwodetail .divqieone .detailmiaosu ul li span{flex:1.5;}
    .maoreporttwodetail .divqieone .detailmiaosu .detailms_left{flex:.5;color:#9F9F9F;}
    .maoreporttwodetail .divqieone .xmjgdwjs{height:.8rem;line-height:.8rem;font-size:.33rem;display:flex;background-color:#FAFAFA;color:#9B9B9B;}
    .maoreporttwodetail .divqieone .xmjgdwjs .maoxmjs{flex:.8;text-align:left;margin-left:.4rem;}
    .maoreporttwodetail .divqieone .xmjgdwjs span{flex:.6;text-align:center;}

    .maoreporttwodetail .divqieone .xmjgdwjs1{height:1.2rem;line-height:.4rem;font-size:.33rem;display:flex;background-color:#FAFAFA;border-bottom:1px solid #ccc;align-items:center;}
    .maoreporttwodetail .divqieone .xmjgdwjs1 .maoxmjs{flex:.8;text-align:left;margin-left:.4rem;text-overflow: ellipsis;white-space:nowrap;overflow: hidden;}
    .maoreporttwodetail .divqieone .xmjgdwjs1 span{flex:.6;text-align:center;}
    .maoreporttwodetail .divqieone .xmjgdwjs1 div{text-align:center;}
    .maoreporttwodetail .divqieone .xmjgdwjs1 div p{font-size:.23rem;}
    .maoreporttwodetail .divqieone .xmjgdwjs1 div .maojgtop{font-size:.33rem;}
    .maoreporttwodetail .divqieone .mztgbysactive{color:red;}



    .maoreporttwodetail .mint-header{background-color:#35B46F;height:1rem;font-size:.37rem;}
    .maoreporttwodetail .divqietwo .detailmiaosu1{height:100%;padding-top:1rem;}
    .maoreporttwodetail .divqietwo .detailmiaosu1 ul{margin-left:.4rem;}
    .maoreporttwodetail .divqietwo .detailmiaosu1 ul li{font-size:.33rem;display:flex;height:.6rem;line-height:.6rem;}
    .maoreporttwodetail .divqietwo .detailmiaosu1 ul li span{flex:1.5;}
    .maoreporttwodetail .divqietwo .detailmiaosu1 .detailms_left{flex:.5;color:#9F9F9F;}
    .maoreporttwodetail .divqietwo .xmjgdwjs{height:.8rem;line-height:.8rem;font-size:.33rem;display:flex;background-color:#FAFAFA;color:#9B9B9B;border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
    .maoreporttwodetail .divqietwo .xmjgdwjs p{margin-left:.4rem;}

    .maoreporttwodetail .divqietwo .xmjgdwjs1{height:1.2rem;line-height:.4rem;font-size:.33rem;display:flex;background-color:#FAFAFA;border-bottom:1px solid #ccc;align-items:center;}
    .maoreporttwodetail .divqietwo .xmjgdwjs1 .maoxmjs{flex:.8;text-align:left;margin-left:.4rem;text-overflow: ellipsis;white-space:nowrap;overflow: hidden;}
    .maoreporttwodetail .divqietwo .xmjgdwjs1 span{flex:.6;text-align:center;}
    .maoreporttwodetail .divqietwo .xmjgdwjs1 div{text-align:center;}
    .maoreporttwodetail .divqietwo .xmjgdwjs1 div p{font-size:.23rem;}
    .maoreporttwodetail .divqietwo .xmjgdwjs1 div .maojgtop{font-size:.33rem;}
    .maoreporttwodetail .divqietwo .mztgbysactive{color:red;}
    .maoreporttwodetail .divqietwo .lczdjieguo{height:1rem;font-size:.37rem;line-height:1rem;}
    .maoreporttwodetail .divqietwo .lczdjieguo p{margin-left:.4rem;}
    .maoreporttwodetail .divqietwo .yingxsjian{height:.8rem;line-height:.8rem;font-size:.33rem;background-color:#FAFAFA;color:#9B9B9B;border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
    .maoreporttwodetail .divqietwo .yingxsjian p{margin-left:.4rem;}
    .maoreporttwodetail .divqietwo .yingxsjianjg{height:100%;font-size:.33rem;text-indent:.66rem;padding: .3rem 0;}
    .maoreporttwodetail .divqietwo .yingxsjianjg p{line-height:.5rem;font-family:"微软雅黑";font-weight:400;}
    .maoreporttwodetail .divqietwo .zhenduyij{height:.8rem;line-height:.8rem;font-size:.33rem;background-color:#FAFAFA;color:#9B9B9B;border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
    .maoreporttwodetail .divqietwo .zhenduyij p{margin-left:.4rem;}
    .maoreporttwodetail .divqietwo .zhendyjjg{height:100%;font-size:.33rem;text-indent:.66rem;padding: .3rem 0;}
    .maoreporttwodetail .divqietwo .zhendyjjg p{line-height:.5rem;font-family:"微软雅黑";font-weight:400;}
</style>

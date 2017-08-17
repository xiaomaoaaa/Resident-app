<template>
    <div class="mdetection">
        <div class="header">
             <mt-header title="体质指数">
                <router-link to="/lsw_BMI" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
                <mt-button slot="right"><img src="../../../assets/img/mao_sharing.png" alt=""></mt-button>
            </mt-header>
            <div class="zhishukuai">
                <p>体质指数(BMI)</p>
                <p><b>{{BMIzhishu}}</b><span>{{shentizhuangkuan}}</span></p>
                <p>标准体重</p>
                <p>{{standard}}</p>
            </div>
        </div>
        
        <div class="stwtit">
            <div><p>性别</p><p>{{msgtzsex.sex}}</p></div>
            <div><p>身高</p><p>{{msgtzsex.height}}cm</p></div>
            <div class="lasttit"><p>体重</p><p>{{msgtzsex.weight}}kg</p></div>
        </div>

        <div class="instruction">
            <div class="instruction_tu">
                <h2>健康建议</h2>
                <p>{{tips}}</p>
                <p class="maoshuoming">计算结果仅供参考，不能作为指导医疗的唯一根据!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Header,Button,Search,Indicator,Loadmore,Navbar,TabItem,Toast } from 'mint-ui';
import "../../../assets/css/mao_style.css";
    export default {
        data:function(){
            return{
               msgtzsex:"",
               standard:"",
               shentizhuangkuan:"",
               BMIzhishu:"",
               tips:""
            }
        },
        mounted:function(){
            this.msgtzsex=JSON.parse(sessionStorage.getItem("sgtzsex"));
            //标准体重
            let dHeight = 0;
            if(this.msgtzsex.sex == "男"){
                dHeight = 50+0.9*(this.msgtzsex.height-150);
                this.standard = Math.round(dHeight*10)/10.0;
            }
            else if(this.msgtzsex.sex == "女"){
                dHeight = 45.5+0.9*(this.msgtzsex.height-150);
                this.standard = Math.round(dHeight*10)/10.0;
            }

            //BMI及温馨提示
            let Bheight=this.msgtzsex.height/100;
            let d=this.msgtzsex.weight/(Bheight*Bheight);
            let value = Math.round(d*10)/10.0;
            this.BMIzhishu=value;
            // console.log(value)
            if(value<18.5){
                this.shentizhuangkuan="偏瘦";
                this.tips="您目前的体重低于正常范围，请适当调整饮食结构，增加富含营养的食物摄入（如蔬菜水果、肉制品、鱼类等），加强锻炼。必要时请就医，检查有无患慢性全身性消耗性疾病（如贫血、慢性萎缩性胃炎、恶性肿瘤、糖尿病、结核病等）可能。"
            }else if(value>18.5&&value<24){
                this.shentizhuangkuan="正常";
                this.tips="您目前的体重在健康范围内，患心血管疾病、糖尿病、高血压、高血脂等疾病风险比较低，请继续保持。"
            }else if(value>=24&&value<27.9){
                this.shentizhuangkuan="偏胖";
                this.tips="您目前的体重稍高于正常范围，请适当运动，调整饮食结构，补充富含膳食纤维的食物（如蔬菜水果，粗粮杂粮、豆类及菌藻类食物），减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。同时，您患有心血管疾病、糖尿病、高血压、高血脂等疾病风险较高，请定期体检。"
            }else if(value>=28){
                this.shentizhuangkuan="肥胖";
                this.tips="您目前属于肥胖，请每日定量运动，调整饮食结构，补充富含膳食纤维的食物（如蔬菜水果、粗粮杂粮、豆类及菌藻类食物），减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。必要时及时就医，检查有无心血关疾病、高血压、高胆固醇等疾病。"
            }

        }
    }
</script>


<style scoped>
html,body{
    width:100%;
    height:100%;
    background:#FAFAFA;
}
    .mdetection{
        height:100%;
        width:100%;
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:#fafafa;
    }
    .mdetection .header{
        height:5rem;
        width:100%;
        background:url("../../../assets/img/mao_navigation-bg.png")
    }
    .mdetection .header .mint-header{
            background: hsla(147, 55%, 46%, 0);
    }
    .mdetection .header .zhishukuai{
        padding-top:1rem;
            
    }
    .mdetection .header .zhishukuai p{
        height:.8rem;
        line-height:.8rem;
        font-size:.33rem;
        text-align:center;
       
        color:#fff;
    }
    .mdetection .header .zhishukuai p b{
        font-size:.5rem;
        font-weight:400;
        color:#F3EF0A;
    }
    .mdetection .header .zhishukuai p span{
        margin-left:.1rem;
        padding:.1rem .2rem;
        background:#ECA012;
        border-radius:.4rem;
        font-size:.27rem;
        color:#fff;
    }
    .mdetection .stwtit{
        display:flex;
        height:1rem;
        margin:.2rem 0;  
    }
    .mdetection .stwtit div{
        flex:1;
        font-size:.33rem;
        text-align:center;
        height:100%;
        align-items:center;
    }
    .mdetection .stwtit div p{
        height:.5rem;
        line-height:.5rem;
        border-right:1px solid #ccc;
        color:#ccc;
    }
    .mdetection .instruction{
        width:100%;
        height:100%;
        margin-top:.8rem;
    }
    .mdetection .instruction .instruction_tu{
        height:4rem;
        width:90%;
        margin-left:.6rem;
        background:url("../../../assets/img/mao_suggest.png") no-repeat;
        background-size:contain;
        position: relative;
    }
    .mdetection .instruction .instruction_tu p{
        font-size:.27rem;
        margin-top:.6rem;
        width:78%;
        margin-left:1rem;
        line-height:.3rem;
    }
    .mdetection .instruction .instruction_tu h2{
        text-align:center;
        height:.6rem;
        line-height:.6rem;
    }
    .mdetection .instruction .instruction_tu .maoshuoming{
        font-size:.22rem;
        margin:0;
        line-height:.3rem;
        position:absolute;
        bottom:0.2rem;
    }
</style>
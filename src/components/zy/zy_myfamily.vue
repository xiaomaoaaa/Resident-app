<template>
    <div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
       <div class="header">
            <mt-header title="我的家庭">
                <a slot="left" @click='$router.push("jia_person")'>
                    <mt-button icon="back"></mt-button>
                </a>
                <span class="add" slot="right" @click='$router.push("gy_add_family")'></span>
            </mt-header>
        </div>
        <div class="session">
            <div class="bGreen">
                <div class="addInfo" id="addInfo">
                    <span v-if="familyArr.length">您目前已添加{{addLength}}位成员，最多可添加{{maxLength}}位成员</span>
                    <span v-else>提示：至多可添加{{maxLength}}位家庭成员</span>
                    <em class="closeAddInfo" @click="closeAddInfo"></em>
                </div>
            </div>
            <ul id="msgList" class="msgList" v-if="familyArr.length">
                <li class="cbafter" v-for="(item, index) in familyArr" :id="'member'+index" @click='$router.push("#")'>
                    <div class="fl">
                        <div class="memberImg">
                            <img src="../../assets/img/zy_memberImg.png">
                            <em>{{familyRelation[index]}}</em>
                        </div>
                        <div class="memberId">
                            <p>{{item.personName}}</p>
                            <span>{{familyId[index]}}</span>
                        </div>
                    </div>
                    <div class="fr">
                        <img style="width: .4rem;height: .4rem;" src="../../assets/img/zy_deleteMember.png" @click="deleteFamily(item.mpiId,index)">
                    </div>
                </li>
            </ul>
            <div class="noInfo" v-else>
                <span>没有信息哦</span>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import {
    commonAjax,
    requestLoginon,
    areaAjax,dicAjax,commonAjaxKy
} from '../../api/api.js'
import {
    mapState,
    mapActions
} from 'vuex'
import { MessageBox,Toast } from 'mint-ui'
export default {
    data: function() {
        return {
           familyArr: [],
           familyId: [],
           familyRelation: [],
           addLength: '',
           maxLength: 10
        }
    },
    mounted() {
        let params = [false]
        commonAjaxKy(JSON.stringify(params), 'hcn.person', 'getFamilyMemberList').then(res => {
            if (res.code === 200) {
                this.familyArr = res.body
                // console.log(this.familyArr)
                // this.familyArr = []
                this.addLength = this.familyArr.length;
                this.familyArr.forEach(item => {
                    // 身份证号码
                    let personId = item.certificate.certificateNo
                    let familyId = '';
                    this.familyId.push(personId.replace(personId.slice(-4),'****'))
                    // 家庭人物关系
                    let relationShipDic = ['','配偶','子','女','孙','父母','祖辈','兄弟姐妹','其他']
                    switch (item.relation){
                        case "0":
                            this.familyRelation.push(relationShipDic[0]);
                            break;
                        case "1":
                            this.familyRelation.push(relationShipDic[1]);
                            break;
                        case "2":
                            this.familyRelation.push(relationShipDic[2]);
                            break;
                        case "3":
                            this.familyRelation.push(relationShipDic[3]);
                            break;
                        case "4":
                            this.familyRelation.push(relationShipDic[4]);
                            break;
                        case "5":
                            this.familyRelation.push(relationShipDic[5]);
                            break;
                        case "6":
                            this.familyRelation.push(relationShipDic[6]);
                            break;
                        case "7":
                            this.familyRelation.push(relationShipDic[7]);
                            break;
                        default:
                            this.familyRelation.push(relationShipDic[8]);
                            break;
                    }
                })
            }
        })
    },
    methods: {
        closeAddInfo(){
            document.getElementById('addInfo').style.display = 'none'
            document.getElementById('msgList').style.marginTop = '-1.4rem'
        },
        deleteFamily(memberId,index){
            // 确认是否删除
            MessageBox({
                title: '',
                message: '确定要删除'+this.familyArr[index].personName+'?',
                showCancelButton: true,
                closeOnClickModal: false
            })
            MessageBox.confirm('确定要删除'+this.familyArr[index].personName+'?').then(action => {
                // console.log(action)
                let params = [memberId]
                commonAjaxKy(JSON.stringify(params), 'hcn.person', 'deleteFamilyMember').then(res => {
                    if (res.code === 200) {
                        let msgList = document.getElementById('msgList')
                        msgList.removeChild(document.getElementById('member'+index))
                        this.addLength--
                        // 提示删除成功框
                        let instance = Toast({
                            message: '删除成功',
                            position:'bottom'
                        });
                        setTimeout(() => {
                          instance.close();
                        }, 2000);
                        location.reload()
                    }
                })
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .4rem
.header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    .mint-header {
        height: 1rem;
        font-size: fontSize;
        background-color: mainColor;
    }
    .add{
        background-image: url('../../assets/img/zy_add.png');
        background-size: 100% 100%;
        width: .4rem;
        height: .4rem;
        display: inline-block;
    }
}
.session {
    margin-top: 1rem;
    padding-top:0;
    .bGreen{
        background-image: url('../../assets/img/zy_greenBg.png');
        background-size: 100% 100%;
        width: 100%;
        height: 2rem;
        box-sizing: border-box;
        padding: .5rem .2rem 0;
        .addInfo{
            display: block;
            background-color: #FFFAD0;
            font-size: .2rem;
            color: #FCA53A;
            text-align: center;
            border-radius: 5px;
            padding: .1rem 0;
            position: relative;
            .closeAddInfo{
                position: absolute;
                right: -.1rem;
                top: -.1rem;
                width: .3rem;
                height: .3rem;
                background-image: url('../../assets/img/zy_close.png');
                background-size: 100% 100%;
            }
        }
    }
    .noInfo{
        font-size: .3rem;
        color: #928F8A;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .msgList{
        padding: 0 .2rem;
        margin-top: -.4rem;
        li:last-child{
            margin-bottom: 0;
        }
        li{
            background-color: #fff;
            background-image: url('../../assets/img/zy_memberBg.png');
            background-size: 100% 100%;
            width: 100%;
            border-radius: 5px;
            box-sizing: border-box;
            padding: .3rem;
            margin-bottom: .5rem;
            box-shadow: -2px 0 5px #d9d9d9, 0px 0 1px #ddd, 3px 2px 5px #ddd, 0 5px 5px #d9d9d9;
            .memberImg{
                display: inline-block;
                vertical-align: middle;
                img{
                    width: 1rem;
                }
                em{
                    font-size: .2rem;
                    background-color: #FFA600;
                    color: #fff;
                    padding: .05rem .15rem;
                    border-radius: .17rem;
                    margin-left: -.5rem;
                }
            }
            .memberId{
                display: inline-block;
                vertical-align: middle;
                line-height: .3rem;
                p{
                    font-size: .25rem;
                    font-weight: 580;
                }
                span{
                    font-size: .2rem;
                    color: #93908C;
                }
            }
        }
    }
}
</style>

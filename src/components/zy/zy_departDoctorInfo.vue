<template>
<div class="app" style="overflow-x:hidden;height:100vh;background-color: #fafafa;">
    <div class="header">
        <mt-header :title="departTitle">
            <a slot="left" @click='$router.push("/xie_hospital")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="session">
        <ul class="doctorList">
            <li class="cbafter" v-for="(item, index) in doctorList" @click="$router.push('/zy_doctorPage?'+item.doctorId)">
                <img v-if="!item.fileId" class="fl" src="../../assets/img/zy_doctor2.png">
                <img v-else class="fl" :src="imgSrc + item.fileId">
                <div class="doctorInfo fl">
                    <p>{{item.doctorName}}&nbsp;&nbsp;
                        <star ref='zy_depart'></star>
                    </p>
                    <p class="hosName">{{item.shortName}}&nbsp;&nbsp;<i>{{item.deptName}}</i></p>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import md5 from 'md5'
import star from './zbl_scoretostar.vue'
import {
    commonAjax,
    requestLoginon,
    areaAjax,
    dicAjax,
    commonAjaxKy
} from '../../api/api.js'
import {
    Toast
} from 'mint-ui'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data: function() {
        return {
            departTitle: '',
            doctorList: [],
            orgId: '',
            departmentId: '',
            scores: 5,
            imgSrc:'http://122.224.131.235:9088/hcn-web/upload/'
        }
    },
    components: {
        star
    },
    mounted() {
        // console.log(this.xie_sendsave)
        this.departmentId = this.xie_sendsave.deptId
        this.orgId = this.xie_sendsave.userName
        // console.log(this.departmentId, this.orgId)
        let params = [this.orgId, this.departmentId]
        commonAjaxKy(JSON.stringify(params), 'hcn.department', 'getDept').then(res => {
            if (res.code === 200) {
                // console.log(res.body)
                this.departTitle = res.body.name
            }
        })
        commonAjaxKy(JSON.stringify(params), 'hcn.easyDoctor', 'getDoctorsByDeptId').then(res => {
            if (res.code === 200) {
                // console.log(res.body)
                this.doctorList = res.body
                if (this.doctorList.length == 0) {
                    Toast({
                        message: '该科室暂无医生',
                        position: 'bottom',
                        duration: 2000
                    });
                }
                this.$nextTick(() => {
                    for (var i = 0; i < this.doctorList.length; i++) {
                        if (this.doctorList[i].avglevel == 0 || !this.doctorList[i].avglevel) {
                            this.scores = 5
                        } else {
                            this.scores = this.doctorList[i].avglevel
                        }
                        this.$refs.zy_depart[i].scoreToStar(this.scores)
                    }
                })
            }
        })
    },
    computed: {
        ...mapState({
            xie_sendsave: state => state.xie_sendsave,
        })
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
}
.session {
    margin-top: 1rem;
    .doctorList{
        li{
            background: #fff;
            padding: .3rem;
            border-bottom: 1px solid #C8C7C7;
            img{
                width: 1rem;
                height: 1rem;
            }
            .doctorInfo{
                margin-left: .2rem;
                font-size: .3rem;
                span{
                    margin-left: .2rem;
                    color: #aaa;
                }
                em{
                    margin-left: .2rem;
                    display: inline-block;
                    width: 1.5rem;
                    height: .25rem;
                    background: url('../../assets/img/zy_starY.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            i{font-style: normal;}
            .hosName{
                font-size: .24rem;
                margin-top: .15rem;
                margin-bottom: .1rem;
            }
        }
    }
}
</style>

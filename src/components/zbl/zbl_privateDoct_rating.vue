<template>
<div class="app" style="overflow-x:hidden;height:100vh;">
    <div class="header">
        <mt-header title="秀新社康中心">
            <a slot="left" @click='$router.push("xie_home")'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <div class="body">
        <div class="ratingContent" v-for='item in ratingContent'>
            <span class="content">{{item.content}}</span>
            <markstar class="markstarConpoment" @marked='marked' :contentType='item.id'></markstar>
        </div>
        <mt-button @click='postRating'>发表评论</mt-button>
    </div>
</div>
</template>
<script>
import {
    commonAjax,
    commonAjaxKy
} from '../../api/api.js'
import markstar from './markStar.vue'
export default {
    data: function() {
        return {
            ratingContent: [],
            tempObj: {}
        }
    },
    computed: {},
    components: {
        markstar
    },
    methods: {
        postRating() {
            let itemList = []
            for (let props in this.tempObj) {
                let obj = {
                    'itemId': parseInt(props),
                    'level': parseInt(this.tempObj[props])
                }
                itemList.push(obj)
            }
            // console.log(itemList)
            let params = [{
                "accasion": "1",
                "businessId": "3",
                "businessType": "003",
                "doctorId": "eaa3e9b0-2248-4f53-89b0-c237b3d6b55d",
                "itemList": itemList,
                "mpiId": "0e08eea0d0d948ebaef2bb1483e21648",
                "orgId": "eaa3e9b0-2248-4f53-89b0-c237b3d6b55d",
                "userId": "f07a053f-17c0-4f19-8d57-4d604fd0f0dd"
            }]
            // commonAjaxKy(JSON.stringify(params), 'hcn.evaluation', 'queryItemsByBusinessType')
            //     .then(res => {
            //         if (res.code === 200) {
            //             console.log(res.body)
            //             this.ratingContent = res.body
            //         }
            //     })
        },
        marked(val) {
            let tempArr = val.split('-')
            this.tempObj[tempArr[0]] = tempArr[1]
            console.log(this.tempObj)
        }
    },
    created() {},
    mounted() {
        let params = ["003", "1", "1"]
        commonAjaxKy(JSON.stringify(params), 'hcn.evaluation', 'queryItemsByBusinessType')
            .then(res => {
                if (res.code === 200) {
                    // console.log(res.body)
                    this.ratingContent = res.body
                }
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
    .ratingContent {
        margin: 30px 0 30px 30px;
        font-size: fontSize;
    }
    .markstarConpoment {
        display: inline-block;
        margin-left: 30px;
    }
    .mint-button {
        display: block;
        width: 90%;
        margin: 70px auto;
        background-color: mainColor;
        color: #fff;
    }
}
</style>

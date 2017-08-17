<template>
<div class="zbl_physical" style="overflow-x:hidden;background-color:#fff;height:100vh;">
    <div class="header">
        <mt-header :title="fileIdDic[params]">
            <a slot="left" @click='$router.go(-1)'>
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
    <physicalComponent :typeId='params'></physicalComponent>
</div>
</template>
<script>
import physicalComponent from './zbl_physicalBody.vue'
export default {
    data: function() {
        return {
            params: '',
            fileIdDic: ['','','阳虚质','阴虚质','气虚质','痰湿质','湿热质','血淤质','特禀质','气郁质','平和质']
        }
    },
    components: {
        physicalComponent
    },
    computed: {},
    methods: {},
    mounted() {
        this.params = this.$route.query.typeId
    }
}
</script>
<style lang="stylus" scoped>
mainColor = #35B46F
greyFont = #ADADAD
fontSize = .3rem
.zbl_physical {
    font-size: fontSize;
}
.header {
    .mint-header {
        height: 1rem;
        font-size: .4rem;
        background-color: mainColor;
        color: #fff;
    }
}
</style>

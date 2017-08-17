<template>
<div class="stars">
    <i class="icon-star-full lightdown" v-for='(item,index) in starItems' @click='markStar(index,$event)' ref='starItems' :id='contentType'></i>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            starItems: ['', '', '', '', ''],
        }
    },
    props: ['contentType'],
    methods: {
        markStar(index,e) {
            let starArr = this.$refs.starItems
            for (var i = 0; i < starArr.length; i++) {
                starArr[i].classList.remove('lighton')
            }
            for (let i = 0; i <= index; i++) {
                starArr[i].classList.add('lighton')
            }
            let str = e.target.id + '-' + (index + 1)
            this.$emit('marked',str)
        }
    }
}
</script>
<style scoped>
.stars i {
    /*position: relative;
    width: auto;
    height: 20px;*/
}
.stars .lightdown {
    color: #ccc;
}
.stars .lighton {
    color: #fc0;
}

@font-face {
    font-family: 'icomoon';
    src: url('../../assets/font/star.ttf');
    font-weight: normal;
    font-style: normal;
}

[class^="icon-"],
[class*=" icon-"] {
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    letter-spacing: 0;
    -webkit-font-feature-settings: "liga";
    -moz-font-feature-settings: "liga=1";
    -moz-font-feature-settings: "liga";
    -ms-font-feature-settings: "liga" 1;
    font-feature-settings: "liga";
    -webkit-font-variant-ligatures: discretionary-ligatures;
    font-variant-ligatures: discretionary-ligatures;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-star-full:after {
    content: "\e9d9";
    font-size: 20px;
    /*margin-right: 0;*/
}
</style>

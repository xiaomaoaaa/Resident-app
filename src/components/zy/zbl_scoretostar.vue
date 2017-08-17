<template>
<div class="scoreToStar">
    <i class="icon-star-full lightdown" v-for='(item,index) in starItems' ref='starItems'></i>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            starItems: ['', '', '', '', '']
        }
    },
    props: [],
    computed: {},
    components: {},
    methods: {
        scoreToStar(score) {
            if (score > 4.5) {
                this.starFunc(5)
            } else if (score > 3.5 && score <= 4.5) {
                this.starFunc(4)
            } else if (score > 2.5 && score <= 3.5) {
                this.starFunc(3)
            } else if (score > 1.5 && score <= 2.5) {
                this.starFunc(2)
            } else if (score > 0.5 && score <= 1.5) {
                this.starFunc(1)
            }
        },
        starFunc(num) {
            let starItems = this.$refs.starItems
            for (var i = 0; i < num; i++) {
                starItems[i].classList.add('lighton')
            }
        }
    },
    created() {},
    mounted() {}
}
</script>

<style scoped>
.scoreToStar i {
    /*position: relative;
    width: auto;
    height: 20px;*/
}

.scoreToStar .lightdown {
    color: #ccc;
}

.scoreToStar .lighton {
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
    margin-right: 5px;
}
</style>

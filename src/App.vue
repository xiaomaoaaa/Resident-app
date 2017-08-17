<template>
    <div>
       <!-- <keep-alive><router-view ></router-view></keep-alive> -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scope>

body {
  /*background-color: #fbf9fe;*/
}
</style>

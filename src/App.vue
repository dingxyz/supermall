<template>
  <div id="app">
    <!-- keep-alive 可以保存组件内的状态 -->
    <!-- exclude 可以使某一个排除在外  Detail不排除的话每次进去不会刷新 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";

</style>

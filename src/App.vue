<template>
  <div id="app">
    <div class="logo_box">
      <img src="/static/img/logo@2x.png" alt srcset>
    </div>
    <div class="header">
      <Menu></Menu>
    </div>
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
// import { Admirettt } from "@/Api/Api";
export default {
  name: "App",
  components: {
    Menu
  },
  mounted() {
    console.log("%c ", "background: url(https://www.zgw.com/Images/logo01.png) no-repeat center;padding-left:180px;padding-bottom: 80px;border-radius:50%;")
  }
};
</script>

<style lang="less" scoped>
@import './assets/common.less';
#app {
  min-width: 1100px;
  background: url("/static/img/bg@2x.png") no-repeat;
  background-size: 100%;
  .logo_box {
    height: 140px;
    text-align: center;
    img {
      height: 90px;
      margin-top: 20px;
    }
  }
  .header {
    width: 1100px;
    margin: 0 auto;
  }
}

</style>


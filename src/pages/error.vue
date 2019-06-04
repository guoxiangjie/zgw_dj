<template>
  <div>
    <div class="error"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style lang="less" scoped>
.error {
  width: 1100px;
  margin: 0 auto;
  height: 400px;
  background: url("../assets/img/errorPage.png") no-repeat center center;
}
</style>

<template>
  <div>
    <div class="organization_content">
      <img src="../../static/img/zuzhijiagou.png" alt srcset>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
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
.DJ_width {
  width: 1100px;
  margin: 0 auto;
}
.shadow_box {
  width: inherit;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.content_mtop {
  margin-top: 30px;
}
.organization_content {
  .DJ_width;
  .content_mtop;
  height: 772px;
}
</style>

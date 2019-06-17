<template>
  <div style="padding-top:30px;">
    <StudyContent/>
    <Footer/>
    <BackTop :height="300" :bottom="200" :right="200">
      <div ref="GO_top" class="top">
        <Icon type="md-arrow-round-up" size="30"/>
      </div>
    </BackTop>
  </div>
</template>


<script>
import StudyContent from "@/components/StudyContent";
import Footer from "@/components/Footer";
export default {
  components: {
    StudyContent,
    Footer
  }
};
</script>


<style lang="less" scoped>
@import "../assets/common.less";
</style>

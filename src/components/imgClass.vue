<template>
  <div class="img" :style="{'width':width,'height':height}">
    <img v-show="!spinShow" :src="src" @load="spinShow=false" alt>
    <Spin v-if="spinShow" class="loading" fix size="large"></Spin>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    },
    src: {
      type: String
    }
  },
  data() {
    return {
      spinShow: true
    };
  }
};
</script>

<style lang="less" scoped>
.img {
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  img {
    height: 100%;
    width: 100%;
  }
}
.loading {
  background: rgba(0, 0, 0, 0);
}
</style>

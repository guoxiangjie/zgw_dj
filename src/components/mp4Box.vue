<template>
  <div
    onselectstart="return false;"
    class="mp4box"
    :class="{'shodw':paly}"
    @mouseenter="paly=true"
    @mouseleave="paly=false"
    :style="{'width':width,'height':height}"
  >
    <ImgClass :height="height" :src="src"/>
  </div>
</template>

<script>
import ImgClass from "@/components/imgClass";
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
  components: {
    ImgClass
  },
  data() {
    return {
      paly: false
    };
  }
};
</script>

<style lang="less" scoped>
.mp4box {
  position: relative;
  overflow: hidden;
}
.shodw {
    transform: translateY(-4px);
    transition: transform 0.4s ease-out;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: url(/static/img/play.png) no-repeat center center
      rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    animation: play 0.4s ease-out;
    transform: translate3d(0);
  }
}
@keyframes play {
  0% {
    transform: scale(1.4);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

<template>
  <Carousel
    :radius-dot="true"
    :autoplay="true"
    arrow="hover"
    v-model="value1"
    :autoplay-speed="5000"
  >
    <CarouselItem v-for="(item,index) in imgs" :key="index">
      <div class="swiper" :style="{'background':'url('+item.ImgUrl+')'}"></div>
    </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  props: {
    imgs: Array
  },
  created(){
    console.log(this.imgs)
  },
  data() {
    return {
      value1: 0
    };
  }
};
</script>

<style lang="less" scoped>
.swiper {
  width: 1100px;
  height: 400px;
  background-size: 100%;
  background-repeat: no-repeat;
  img {
    display: block;
    width: 1100px;
    height: 400px;
  }
}
</style>

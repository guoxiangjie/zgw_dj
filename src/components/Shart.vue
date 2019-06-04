<template>
  <div>
    <div class="shart_box">
      分享到：
      <div class="icon icon1" @click="btn(2)"></div>
      <div class="icon icon2" @click="btn(1)"></div>
      <div class="icon icon3" @click="btn(3)"></div>
      <div class="icon icon4" @click="btn(4)"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    btn(i){
      this.$emit("shart",i)
    }
  }
};
</script>

<style lang="less" scoped>
.shart_box {
  padding: 30px 0;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 1);
  .icon {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }
  .icon1 {
    background: url("../assets/img/icon-weixin1.png") no-repeat;
  }
  .icon2 {
    background: url("../assets/img/icon-weibo.png") no-repeat;
  }
  .icon3 {
    background: url("../assets/img/icon-kongjian.png") no-repeat;
  }
  .icon4 {
    background: url("../assets/img/icon-fuzhi.png") no-repeat;
  }
}
</style>

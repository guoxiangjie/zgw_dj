<template>
  <div style="position:relative">
    <div class="title" :style="{width:width+'px'}">
      <div class="title-left" :style="{background:background}">
        <img src="../assets/img/dang.png" alt srcset>
      </div>
      <div class="title-right" :style="{background:background}">{{text}}</div>
      <div class="triangles"></div>
    </div>
    <div v-if="href" class="title-more">
      <a :href="href" target="_blank">查看更多</a>
    </div>
    <div class="bottom" :style="{background:background}"></div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: "#FF0F00"
    },
    text: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 160
    },
    href: {
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  height: 36px;
  display: flex;
  .title-left {
    width: 40px;
    img {
      display: block;
      width: 30px;
      margin: 3px 0 0 3px;
    }
  }
  .title-right {
    flex-grow: 1;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }
  .triangles {
    width: 40px;
    height: 36px;
    border-color: red transparent;
    border-width: 0 20px 36px 0;
    border-style: solid;
  }
}
.bottom {
  height: 3px;
  width: 100%;
}
.title-more {
  font-size: 10px;

  position: absolute;
  right: 0;
  top: 0;
  height: 39px;
  line-height: 39px;
  cursor: pointer;
  a {
    color: #575757;
    &:hover {
      color: red;
    }
  }
}
</style>

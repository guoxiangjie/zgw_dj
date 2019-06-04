<template>
  <div class="box" :style="{'width':width,'height':height}">
    <div v-show="index == curractive" v-for="(item,index) in list" :key="index">
      <transition name="slide-fade">
        <img
          @click="url(item)"
          v-show="index == curractive"
          :style="{'width':width}"
          :src="item.ImgUrl"
          :class="{img_active:index==curractive}"
          alt
          srcset
        >
      </transition>
    </div>
    <div class="handle">
      <div
        v-show="index == curractive"
        v-for="(item,index) in list"
        :key="index"
        class="left"
      >{{item.Title}}</div>
      <div class="left" v-if="list.length==0">暂无数据</div>
      <div class="right" v-if="list.length>1">
        <div
          v-for="(item,index) in list"
          @click="change(index)"
          :key="index"
          class="min_item"
          :class="{active:index== curractive}"
        >{{index+1}}</div>
      </div>
    </div>
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
      default: "100px"
    },
    active: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    }
  },
  mounted() {
    if (this.autoplay) {
      setTimeout(() => {
        this.swiper();
      }, Math.floor(Math.random() * 1000));
    }
  },
  data() {
    return {
      curractive: this.active
    };
  },
  methods: {
    //3未制度建设
    url(item) {
      let routeUrl;

      if (item.ColumnsId == 1) {
        routeUrl = this.$router.resolve({
          name: "policy_details",
          params: { id: item.ID }
        });
      }
      if (item.ColumnsId == 2) {
        routeUrl = this.$router.resolve({
          name: "regim_details",
          params: { id: item.ID }
        });
      }
      if (item.ColumnsId == 3) {
        routeUrl = this.$router.resolve({
          name: "mien_details",
          params: { id: item.ID }
        });
      }
      if (item.ColumnsId == 4) {
        routeUrl = this.$router.resolve({
          name: "example_details",
          params: { id: item.ID }
        });
      }

      window.open(routeUrl.href, "_blank");
    },
    change(i) {
      this.curractive = i;
      clearInterval(this.$time);
      if (this.autoplay) {
        this.swiper();
      }
    },
    swiper() {
      var time = setInterval(() => {
        if (this.curractive == this.list.length - 1) {
          this.curractive = 0;
        } else {
          this.curractive += 1;
        }
      }, 5000);
      this.$time = time;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  img {
    cursor: pointer;
  }
  position: relative;
  overflow: hidden;
  .slide-fade-enter-active {
    transition: all 0.6s ease;
  }
  .slide-fade-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .handle {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    display: flex;
    .left {
      width: 60%;
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      padding: 0 15px;
      line-height: 40px;
    }
    .right {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      .min_item {
        width: 20px;
        height: 20px;
        background: #fff;
        color: rgba(87, 87, 87, 1);
        margin-left: 10px;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        transition: 0.4s all;
      }
      .active {
        background: red;
        color: #fff;
      }
    }
  }
}
</style>

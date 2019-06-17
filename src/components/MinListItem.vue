<template>
  <div @click="url(value)" class="box" :style="{'height':height}">
    <div class="icon" :class="{'full':type=='full'}">
      <img v-if="icon=='danghui'" src="../assets/img/icon-danghui@2x.png" alt srcset>
      <img v-if="icon=='zhidu'" src="../assets/img/icon-zhidu@2x.png" alt srcset>
    </div>
    <div class="content">{{subTitle(value.Title)}}</div>
    <div class="time" :class="{'time_right':type=='full'}">[{{value.CreateTimeT}}]</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    sub: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "zhidu"
    },
    type: {
      type: String
    },
    time: {
      type: String,
      default: ""
    },
    height: {
      type: String
    },
    value: {
      type: Object
    }
  },
  methods: {
    subTitle(title) {
      if (this.sub) {
        return title.length > 16 ? title.substring(0, 16) + "..." : title;
      } else {
        return title;
      }
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";
.box {
  width: 100%;
  display: flex;
  cursor: pointer;
  .icon {
    width: 60px;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 26px;
      display: block;
    }
  }
  .full {
    justify-content: left;
    width: 40px;
  }
  .content {
    flex-grow: 1;
    height: inherit;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: #000;

    &:hover {
      color: red;
    }
  }
  .time {
    width: 140px;
    height: inherit;
    color: rgba(87, 87, 87, 1);
    font-size: 18px;
    line-height: 48px;
  }
  .time_right {
    text-align: right;
  }
}
</style>

<template>
  <div class="box" onselectstart="return false" style="-moz-user-select:none;">
    <div class="box1" :style="{'width':width}">
      <div class="content" :style="{'height':height}">
        <div v-if="value.length==0" class="item">暂无数据</div>
        <div @click="url(o)" v-for="o in value" :key="o.id" class="item">{{o.Title}}</div>
        <div class="left_icon"></div>
        <div class="right_icon">{{value.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    }
  },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    value: {
      type: ""
    }
  },
  created(){
  }
};
</script>

<style lang="less" scoped>
.box1 {
  padding: 6px;
  .content {
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 14px 60px;
    position: relative;
    background: rgba(255, 255, 255, 1);
    .main {
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      width: 90%;
      color: rgba(0, 0, 0, 1);
      line-height: 40px;
      &:hover {
        color: red;
      }
    }
    .item {
      font-size: 14px;
      cursor: pointer;
      color: rgba(0, 0, 0, 1);
      line-height: 24px;
      &:hover {
        color: red;
      }
      &:nth-child(1) {
        .main;
      }
    }
  }
  .left_icon {
    width: 35px;
    height: 52px;
    background: url("../assets/img/box_1.png") no-repeat;
    background-size: 35px 52px;
    position: absolute;
    top: -5px;
    left: 10px;
  }
  .right_icon {
    width: 96px;
    height: 31px;
    background: url("../assets/img/box_2.png") no-repeat;
    background-size: 96px 31px;
    position: absolute;
    right: -8px;
    top: 21px;
    text-align: center;
    line-height: 24px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
  }
}
</style>

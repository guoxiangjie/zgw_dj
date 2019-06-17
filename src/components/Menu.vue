<template>
  <div class="box" v-if="isShow">
    <div
      onselectstart="return false"
      style="-moz-user-select:none;"
      @click="change(item,index)"
      v-for="(item,index) in menuItemList"
      :key="index"
      class="item"
      :class="{active:index==active}"
    >{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isShow: true,
      menuItemList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "政策宣贯",
          url: "/policy"
        },
        {
          name: "制度建设",
          url: "/Regim"
        },
        {
          name: "党建风采",
          url: "/Mien"
        },
        {
          name: "榜样的力量",
          url: "/Example"
        },
        {
          name: "组织架构",
          url: "/organization"
        },
        {
          name: "习语金句",
          url: "/Study"
        }
      ]
    };
  },
  watch: {
    $route(n) {
      this.changeRouter(n);
    }
  },
  created() {
    this.changeRouter(this.$route);
  },
  methods: {
    change(item, index) {
      this.active = index;
      this.$router.push({ path: item.url });
    },
    changeRouter(n) {
      switch (n.name) {
        case "Index":
          this.active = 0;
          break;
        case "policy":
          this.active = 1;
          break;
        case "policy_details":
          this.active = 1;
          break;
        case "regim":
          this.active = 2;
          break;
        case "regim_details":
          this.active = 2;
          break;
        case "mien":
          this.active = 3;
          break;
        case "example":
          this.active = 4;
          break;
        case "example_details":
          this.active = 4;
          break;
        case "mien_details":
          this.active = 3;
          break;
        case "directories":
          this.isShow = false;
          break;
        case "directories_details":
          this.isShow = false;
          break;
        case "organization":
          this.active = 5;
          break;
        case "study":
          this.active = 6;
          break;
        case "study_details":
          this.active = 6;
          break;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.box {
  width: 1100px;
  height: 68px;
  background: #ff4c00;
  display: flex;
  justify-content: center;
  .item {
    width: 134px;
    height: 68px;
    color: #ffffff;
    text-align: center;
    line-height: 68px;
    font-size: 20px;
    cursor: pointer;
    transition: 0.4s all;
    &:hover {
      .active;
    }
  }
  .active {
    background: #fff600;
    color: #ff4c00;
    font-weight: 700;
  }
}
</style>

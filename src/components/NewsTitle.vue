<template>
  <div
    class="box"
    :class="{'box-border':isborder}"
    :style="{'width':width,'height':height,'padding':padding}"
  >
    <div class="left" v-if="imgurl">
      <img :style="{'width':imgWidth,'max-height':height}" :src="imgurl" alt>
    </div>
    <div class="right">
      <div class="main_title">
        <div
          class="main_title_left"
          @click="url(value)"
          :style="{'font-size':size}"
          :class="{'main_title_left_ts':main}"
        >{{title}}</div>
        <div v-if="main==false&&timePosition=='top'" class="main_title_right">{{time}}</div>
      </div>
      <div class="main_text">
        {{text}}
        <span @click="url(value)">[详情]</span>
      </div>
      <div v-if="isfoot" class="footer">
        <div class="footer_left">
          <div v-if="isWatch" class="watch">
            <img src="../assets/img/wacth.png" alt srcset>浏览 {{value.TotalClick}}
          </div>
          <div v-if="isGood" class="good">
            <img src="../assets/img/good.png" alt srcset>点赞 {{value.Admire}}
          </div>
        </div>
        <div v-if="timePosition=='bottom'" class="footer_right">{{time}}</div>
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
      default: "200px"
    },
    value: {
      type: Object
    },
    padding: {
      type: String
    },
    size: {
      type: String
    },
    imgWidth: {
      type: String,
      default: "100%"
    },
    imgurl: {
      type: String
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    time: {
      type: String
    },
    timePosition: {
      type: String
    },
    main: {
      type: Boolean
    },
    isWatch: {
      type: Boolean
    },
    isGood: {
      type: Boolean
    },
    isfoot: {
      type: Boolean,
      default: false
    },
    isborder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
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
.box {
  display: flex;
  box-sizing: border-box;
  .left {
    width: 35%;
    margin-right: 5%;
    display: flex;
    align-items: center;
  }
  .right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    width: inherit;
    .main_title {
      display: flex;
      justify-content: space-between;
      .main_title_left {
        font-size: 18px;
        font-weight: 700;
        color: #000;
        cursor: pointer;
        &:hover {
          color: #ff0000;
        }
      }
      .main_title_left_ts {
        color: rgba(255, 0, 0, 1);
        font-size: 24px;
        font-weight: bold;
      }
      .main_title_right {
        font-size: 14px;
        display: flex;
        align-items: center;
      }
    }
    .main_text {
      font-size: 16px;
      color: rgba(87, 87, 87, 1);
 
      span {
        color: rgba(87, 87, 87, 1);
        cursor: pointer;
        font-size: 16px;
        margin-left: 8px;
        transition: 0.3s all;
        &:hover {
          color: #ff0000;
        }
      }
    }
    .footer {
      display: flex;
      height: 32px;
      align-items: center;
      justify-content: space-between;

      .footer_left {
        display: flex;
        font-size: 16px;
        color: #000;
        div {
          display: flex;
          align-items: center;
          &:nth-child(2) {
            margin-left: 30px;
          }
        }
        .watch {
          img {
            width: 28px;
            margin-right: 8px;
          }
        }
        .good {
          margin-left: 16px;
          img {
            width: 22px;
            margin-right: 8px;
          }
        }
      }
      .footer_right {
        color: #000;
        font-size: 16px;
      }
    }
  }
}
</style>

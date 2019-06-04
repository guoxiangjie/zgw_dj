<template>
  <div class="positionBox">
    <div class="top">热门风采</div>
    <div class="content">
      <div v-for="(item,index) in list" :key="index">
        <div class="item">
          <div class="left">
            <img :src="item.ImgUrl" alt>
          </div>
          <div class="right">
            <div @click="url(item)" class="right_title">{{item.Title}}</div>
            <div class="good">
              <img style="width:18px;margin-right:10px;" src="../assets/img/good.png" alt srcset>点赞 {{item.Admire}}
            </div>
          </div>
        </div>
        <div v-if="index!=2" class="border"></div>
      </div>
            <div class="item_0" v-if="list.length==0">暂无数据</div>
    </div>
  </div>
</template>

<script>
import NewsTitle from "@/components/NewsTitle";
import { GetClass_Hot } from "../Api/Api.js";
import { Columns } from "../../static/config.js";
export default {
  components: {
    NewsTitle
  },
  data() {
    return {
      list:[]
    };
  },
  created() {
    GetClass_Hot({
      ColumnsId: Columns.DJFC_CONFIG,
      Count: 3
    }).then(res => {
      this.list = res.data.Other.OtherImg
    });
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
.item_0{
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
  padding-left: 20px;
}
.shadow_box {
  width: inherit;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.border {
  width: 310px;
  border-top: 1px solid rgba(228, 228, 228, 1);
  margin: 15px auto;
}
.positionBox {
  .shadow_box;
  width: 350px;
  height: 440px;
  position: absolute;
  right: -370px;
  top: 39px;
  .top {
    height: 42px;
    width: 100%;
    background: url("../assets/img/pic-biaoti2.png") no-repeat;
    color: #fff;
    line-height: 42px;
    font-size: 20px;
    padding-left: 70px;
    font-weight: bold;
  }
  .content {
    display: flex;
    flex-direction: column;
    height: 360px;
    margin-top: 30px;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 90px;
      .left {
        width: 110px;
        height: 90px;
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 100%;
        }
      }
      .right {
        width: 174px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .right_title {
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
        .good {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>

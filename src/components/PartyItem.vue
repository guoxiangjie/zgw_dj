<template>
  <div class="party-item" @click="go">
    <div class="img-box">
      <img :src="item.PicPath" alt>
    </div>
    <div style="padding:0 10px">
      <div class="title">{{item.Name}}</div>
      <div class="text">{{item.CompanyDepartmentT}}</div>
      <div class="text">政治面貌：未提供</div>
      <div class="text">入党时间：{{item.JoinTimeT}}</div>
    </div>
  </div>
</template>

<script>
import { GetPartMemberByID } from "../Api/Api.js";
import { getCookie, setCookie, delCookie } from "../util/util.js";
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    go() {
      this.isgo(res=>{
        if(res){
        let routeUrl = this.$router.resolve({
        name: "directories_details",
        params: { id: this.item.ID }
      });
      window.open(routeUrl.href, "_blank");
        }
      })
    },
    isgo(callback) {
      GetPartMemberByID({
        ID: Number(this.item.ID),
        UserInfoId: Number(getCookie("userId"))
      }).then(res => {
        if (res.result != 1) {
          this.$Message.error(`${res.msg}`);
          callback(false)
        }else{
          callback(true)
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.party-item {
  width: 100%;
  height: 520px;
  background: #fff;
  transition: all 0.4s ease;
  margin-bottom: 22px;
  border: 1px solid #fff;
  box-shadow: 1px 1px 10px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
  cursor: pointer;
  &:hover {
    box-shadow: 4px 4px 40px rgba(39, 44, 49, 0.07),
      4px 12px 32px rgba(39, 44, 49, 0.04);
    transition: all 0.4s ease;
    .img-box {
      img {
        transform: translate3d(0);
        transform: scale(1.04);
      }
    }
  }
  .img-box {
    height: 320px;
    width: 240px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 5px;
    img {
      width: 100%;
      transition: transform 0.4s;
    }
  }
  .title {
    font-size: 24px;
    color: rgba(255, 0, 0, 1);
    padding-bottom: 10px;
    padding-top: 5px;
    font-weight: 700;
  }
  .text {
    font-size: 20px;
    color: rgba(0, 0, 0, 1);
    line-height: 36px;
  }
}
</style>

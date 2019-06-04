<template>
  <div class="box">
    <div class="content">
      <div class="list_box">
        <div class="left">
          <a href="https://www.zgw.com/"></a>
          <a href="http://sxy.zgw.com/"></a>
        </div>
        <div class="right">
          <div>
            <a target="_blank" v-for="(item,index) in list" :key="index" :href="item.url">{{item.name}}</a>
          </div>
          <div>全国咨询/投诉电话: 400-700-8508 豫ICP备 14018983号 Copyright &#169; 2005-2019</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "关于我们",
          url: "http://corp.steelcn.cn"
        },
        {
          name: "联系我们",
          url: "http://www.zgw.com/AbountUs/Linkus"
        },
        {
          name: "中钢之声",
          url: "http://sxy.zgw.com/Voice/ZgwVoice"
        },
        {
          name: "爱心基金会",
          url: "http://sxy.zgw.com/Voice"
        },
        {
          name: "年度价值观",
          url: "http://sxy.zgw.com/Voice/YourValue"
        },
        {
          name: "孝道文化",
          url: "http://sxy.zgw.com/Voice/FilialPiety"
        },
        {
          name: "中钢公益",
          url: "http://www.zgw.com/CommonWeal/Index"
        },
        {
          name: "网站地图",
          url: "http://www.zgw.com/Product/Map"
        },
        {
          name: "中钢首页",
          url: "http://www.zgw.com"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 465px;
  background: url("/static/img/pic-diwen@2x.png") no-repeat;
  background-size: 100% 100%;
  .content {
    width: 1100px;
    height: 465px;
    margin: 0 auto;
    .list_box {
      width: 100%;
      height: 465px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 300px;
        height: 70px;
        background: url("../assets/img/footer.png") no-repeat;
        display: flex;
        a{
          display: block;
          height: 70px;
          &:nth-child(1){
            width: 115px;
          }
          &:nth-child(2){
            flex-grow: 1;
          }
        }
      }
      .right {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        a {
          padding: 0 8px;
          border-right: 2px solid rgba(118, 118, 118, 1);
          font-size: 14px;
          color: rgba(87, 87, 87, 1);
          &:nth-last-child(1){
              border: 0;
          };
          &:nth-child(1){
              padding-left: 0;
          };
        }
      }
    }
  }
}
</style>

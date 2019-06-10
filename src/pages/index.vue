<template>
  <div class="DJ_box">
    <div class="header">
      <MaxSwiper v-if="siwperList!=null" :imgs="siwperList"></MaxSwiper>
    </div>
    <div class="Login">
      <login></login>
    </div>
    <div class="content4">
      <Title text="党建风采" href="http://sxy.zgw.com/DangJian/index.html#/Mien"></Title>
      <div class="content4_box">
        <div class="left">
          <Imgswiper :list="djfc_left" :autoplay="true" width="500px" height="320px"></Imgswiper>
        </div>
        <div class="right" style="min-width:500px;padding-left:55px;">
          <NewsTitle
            v-for="(item,index) in djfc_right"
            :key="index"
            width="537px"
            height="100px"
            :title="item.Title"
            :value="item"
            :text="item.Summary"
            :main="item.IsRed"
            :time="item.CreateTimeT"
            timePosition="top"
            :isfoot="false"
            :isborder="index!=2"
          ></NewsTitle>
          <div class="item_0" v-if="djfc_right.length==0">暂无数据</div>
        </div>
      </div>
    </div>

    <div class="content2">
      <Title text="政策宣贯" href="http://sxy.zgw.com/DangJian/index.html#/policy"></Title>
      <div class="content2_box">
        <div class="left">
          <Imgswiper :list="zcxg_left" :autoplay="true" width="500px" height="320px"></Imgswiper>
        </div>
        <div class="right">
          <Box
            v-for="(item,index) in zcxg_right"
            :key="index"
            :value="item"
            width="564px"
            height="151px"
          ></Box>
        </div>
      </div>
    </div>

    <div class="content2">
      <Title text="制度建设" href="http://sxy.zgw.com/DangJian/index.html#/Regim"></Title>
      <div class="content2_box">
        <div class="left">
          <Imgswiper :list="zdjs_right" :autoplay="true" width="500px" height="320px"></Imgswiper>
        </div>
        <div class="right">
          <MinListItem
            height="48px"
            v-for="(item,index) in zdjs_left"
            :value="item"
            :key="index"
            :text="item.Summary"
            :time="item.time"
          ></MinListItem>
          <div class="item_0" v-if="zdjs_left.length==0">暂无数据</div>
        </div>
      </div>
    </div>

    <div class="content3">
      <img src="/static/img/pic-jinju.png" alt srcset>
    </div>

    <div class="content5">
      <Title :width="180" text="榜样的力量" href="http://sxy.zgw.com/DangJian/index.html#/Example"></Title>
      <div class="content4_box">
        <div class="left">
          <Imgswiper :list="bydll_left" :autoplay="true" width="500px" height="320px"></Imgswiper>
        </div>
        <div class="right" style="min-width:500px">
          <NewsTitle
            v-for="(item,index) in bydll_right"
            :key="index"
            width="567px"
            height="100px"
            :title="item.Title"
            :value="item"
            :text="item.Summary"
            :main="item.IsRed"
            :isfoot="false"
            :isborder="index!=2"
          ></NewsTitle>
          <div class="item_0" v-if="bydll_right.length==0">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { GetIndexNewsList } from "../Api/Api.js";
import {
  content2_lit,
  content4_lit,
  content5_lit,
  zdjs,
  zcxg_right,
  djfc_right,
  bangyang_right,
  MaxSwiperImgs
} from "../../static/mock.js";
import Menu from "@/components/Menu";
import MaxSwiper from "@/components/MaxSwiper";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import MinListItem from "@/components/MinListItem";
import Login from "@/components/Login";
import Box from "@/components/Box";
import Imgswiper from "@/components/Imgswiper";
import NewsTitle from "@/components/NewsTitle";

export default {
  data() {
    return {
      siwperList: [],
      zdjs_left: [],
      zcxg_left: [],
      djfc_left: [],
      bydll_left: [],
      zdjs_right: [],
      bydll_right: bangyang_right,
      zcxg_right: zcxg_right,
      djfc_right: djfc_right
    };
  },
  created() {
    GetIndexNewsList().then(res => {
      this.siwperList =
        res.data.IndexSlide.IndexSlide == null
          ? MaxSwiperImgs
          : res.data.IndexSlide.IndexSlide;
          console.log(this.siwperList)
      let slide1 = res.data.IndexClassNews.IndexClassNews[0];
      let slide2 = res.data.IndexClassNews.IndexClassNews[1];
      let slide3 = res.data.IndexClassNews.IndexClassNews[2];
      let slide4 = res.data.IndexClassNews.IndexClassNews[3];
      this.zdjs_left = slide1.ClassNews.Other.OtherImg;
      this.zcxg_left = slide2.ClassNews.Slide.SlideImg;
      this.djfc_left = slide3.ClassNews.Slide.SlideImg;
      this.bydll_left = slide4.ClassNews.Slide.SlideImg;
      this.zdjs_right = slide1.ClassNews.Slide.SlideImg;

      //政策宣贯右侧栏目数据解析 分组处理
      let zcxg_right_lable1 = [];
      let zcxg_right_lable2 = [];
      let zcxg_right_lable_all = [];
      for (let i = 0; i < slide2.ClassNews.Other.OtherImg.length; i++) {
        if (slide2.ClassNews.Other.OtherImg[i].Lable == 1) {
          zcxg_right_lable1.push(slide2.ClassNews.Other.OtherImg[i]);
        } else {
          zcxg_right_lable2.push(slide2.ClassNews.Other.OtherImg[i]);
        }
      }
      zcxg_right_lable1.name = "中央精神";
      zcxg_right_lable2.name = "本地动态";
      zcxg_right_lable_all.push(zcxg_right_lable1);
      zcxg_right_lable_all.push(zcxg_right_lable2);

      this.zcxg_right = zcxg_right_lable_all;
      this.djfc_right = slide3.ClassNews.Other.OtherImg;
      this.bydll_right = slide4.ClassNews.Other.OtherImg;
    });
  },
  components: {
    Menu,
    MaxSwiper,
    Title,
    Footer,
    MinListItem,
    Login,
    Box,
    Imgswiper,
    NewsTitle
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";
.content1 {
  .header;
  .content_mtop;
  display: flex;
  justify-content: space-between;
  .left {
    width: 684px;
  }
  .right {
    width: 380px;
  }
  .ts {
    display: flex;
    flex-direction: column;
    padding-top: 26px;
  }
}
.content2 {
  .header;
  .content_mtop;
  .content2_box {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
.content3 {
  .header;
  padding: 30px 0;
  img {
    width: inherit;
  }
}
.content4 {
  .header;
  .content4_box {
    .content2>.content2_box;
  }
}
.content5 {
  .content4;
  .content_mtop;
}
</style>

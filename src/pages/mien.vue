<template>
  <div>
    <div class="mien_top">
      <Title text="党建风采"></Title>
      <PositionBox></PositionBox>
    </div>
    <div class="mien_content">
      <div class="item" v-for="(item,index) in djfc_page" :key="index">
        <NewsTitle
          width="100%"
          height="270px"
          :title="item.Title"
          :text="item.Summary"
          :time="item.CreateTimeT"
          :isfoot="true"
          :isWatch="true"
          :isGood="true"
          timePosition="bottom"
          :imgurl="item.ImgUrl"
          imgWidth="266px"
          padding="30px 70px"
          :value="item"
          size="24px"
        ></NewsTitle>
     
      </div>
         <div class="item_0" v-if="djfc_page.length==0">暂无数据</div>
    </div>
    <div class="page_num">
      <Page
        @on-change="pageChange"
        :total="total"
        :current="PageIndex"
        show-elevator
        :page-size="PageSize"
        :show-total="true"
      />
    </div>
    <BackTop :height="300" :bottom="200" :right="200">
      <div ref="GO_top" class="top">
        <Icon type="md-arrow-round-up" size="30"/>
      </div>
    </BackTop>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { djfc_page } from "../../static/mock.js";
import { ClassNewsList_Other } from "../Api/ReuseApi.js";

import { Columns } from "../../static/config.js";
import Title from "@/components/Title";
import NewsTitle from "@/components/NewsTitle";
import Footer from "@/components/Footer";
import PositionBox from "@/components/PositionBox";
export default {
  data() {
    return {
      djfc_page: djfc_page,
      ColumnsId: Columns.DJFC_CONFIG,
      PageIndex: 1,
      total: 0,
      PageSize: 4
    };
  },
  components: {
    Title,
    NewsTitle,
    Footer,
    PositionBox
  },
  created() {
    this.PageIndex = this.$route.query.page
      ? Number(this.$route.query.page)
      : 1;
    this.ClassNewsList_Other_function();
  },
  beforeRouteUpdate(to, from, next) {
    this.PageIndex = to.query.page;
    this.ClassNewsList_Other_function();
    next();
  },
  methods: {
    pageChange(page) {
      this.$router.push({ name: "mien", query: { page: page } });
      this.$refs.GO_top.click();
    },
    ClassNewsList_Other_function() {
      ClassNewsList_Other(
        this.ColumnsId,
        this.PageIndex,
        this.PageSize,
        res => {
          if (res.content == null) {
            this.$router.push({ name: "mien" });
            if (this.PageIndex != 1) {
              this.$Message.warning("未找到当前页码");
            }
          } else {
            this.total = res.total;
            this.djfc_page = res.content;
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";
.mien_top {
  .DJ_width;
  .content_mtop;
  position: relative;
}
.mien_content {
  .DJ_width;
  //   height: 1112px;
  min-height: 500px;
}
.item {
  .shadow_box;
  margin-bottom: 8px;
}
.page_num {
  .DJ_width;
  height: 80px;
  display: flex;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
}
</style>

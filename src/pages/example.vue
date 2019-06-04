<template>
  <div>
    <div class="example_top">
      <Title :width="180" text="榜样的力量"></Title>
    </div>
    <div class="example_content">
      <div class="item" v-for="(item,index) in bangyang_page" :key="index">
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
                 <div class="item_0" v-if="bangyang_page.length==0">暂无数据</div>
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
import { bangyang_page } from "../../static/mock.js";
import { ClassNewsList_Other } from "../Api/ReuseApi.js";
import { Columns } from "../../static/config.js";
import Title from "@/components/Title";
import NewsTitle from "@/components/NewsTitle";
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      bangyang_page: bangyang_page,
      ColumnsId: Columns.BYDLL_CONFIG,
      PageIndex: 1,
      total: 0,
      PageSize: 4
    };
  },
  components: {
    Title,
    NewsTitle,
    Footer
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
      this.$router.push({ name: "example", query: { page: page } });
      this.$refs.GO_top.click();
    },
    ClassNewsList_Other_function() {
      ClassNewsList_Other(
        this.ColumnsId,
        this.PageIndex,
        this.PageSize,
        res => {
          if (res.content == null) {
            this.$router.push({ name: "example" });
             if (this.PageIndex != 1) {
              this.$Message.warning("未找到当前页码");
            }
          } else {
            this.total = res.total;
            this.bangyang_page = res.content;
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";
.example_top {
  .DJ_width;
  .content_mtop;
}
.example_content {
  .DJ_width;
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

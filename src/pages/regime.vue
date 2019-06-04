<template>
  <div>
    <div class="regime_top">
      <Title text="制度建设"></Title>
    </div>
    <div class="regime_content">
      <MinListItem
        height="48px"
        v-for="(item,index) in zdjs_page"
        :value="item"
        :key="index"
        :text="item.name"
        :time="item.time"
      ></MinListItem>
         <div class="item_0" v-if="zdjs_page.length==0">暂无数据</div>
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
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { zdjs_page } from "../../static/mock.js";
import { ClassNewsList_Other } from "../Api/ReuseApi.js";
import { Columns } from "../../static/config.js";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import MinListItem from "@/components/MinListItem";
export default {
  data() {
    return {
      zdjs_page: zdjs_page,
      ColumnsId: Columns.ZDJS_CONFIG,
      PageIndex: 1,
      total: 0,
      PageSize: 10
    };
  },
  components: {
    Title,
    Footer,
    MinListItem
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
      this.$router.push({ name: "regim", query: { page: page } });
    },
    ClassNewsList_Other_function() {
      ClassNewsList_Other(
        this.ColumnsId,
        this.PageIndex,
        this.PageSize,
        res => {
          if (res.content == null) {
            this.$router.push({ name: "regim" });
            if(this.PageIndex!=1){
               this.$Message.warning("未找到当前页码");
            }
          } else {
            this.total = res.total;
            this.zdjs_page = res.content;
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.regime_top {
  .DJ_width;
  .content_mtop;
}
.regime_content {
  .shadow_box;
  .DJ_width;

  height: 528px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
}
.page_num {
  .DJ_width;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

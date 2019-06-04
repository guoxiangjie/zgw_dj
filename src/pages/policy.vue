<template>
  <div class="DJ_box">
    <div class="content2">
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
    <div class="policy_box ts" style="height:315px;padding-top:13px">
      <MinListItem
        height="48px"
        v-for="item in zcxg_page"
        type="full"
        icon="danghui"
        :value="item"
        :key="item.id"
        :text="item.name"
        :time="item.time"
      ></MinListItem>
      <div class="item_0" v-if="zcxg_page.length==0">暂无数据</div>
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
import { GetClassNewsList_zcxg } from "../Api/Api.js";
import { ClassNewsList_Other } from "../Api/ReuseApi.js";
import { Columns } from "../../static/config.js";
import {
  content2_lit,
  content4_lit,
  content5_lit,
  zdjs,
  zcxg_right,
  djfc_right,
  bangyang_right,
  zcxg_page
} from "../../static/mock.js";
import Box from "@/components/Box";
import Imgswiper from "@/components/Imgswiper";
import Footer from "@/components/Footer";
import MinListItem from "@/components/MinListItem";
export default {
  data() {
    return {
      ColumnsId: Columns.ZCXG_CONFIG,
      PageIndex: 1,
      total: 0,
      PageSize: 5,
      zcxg_left: [],
      zcxg_right: [[],[]],
      zcxg_page: zcxg_page
    };
  },
  components: {
    Imgswiper,
    Box,
    Footer,
    MinListItem
  },
  created() {
    GetClassNewsList_zcxg().then(res => {
      this.zcxg_left = res.data.Slide.SlideImg;

       //政策宣贯右侧栏目数据解析 分组处理
      let zcxg_right_lable1 = [];
      let zcxg_right_lable2 = [];
      let zcxg_right_lable_all = [];
      for (let i = 0; i < res.data.Top.OtherImg.length; i++) {
        if(res.data.Top.OtherImg[i].Lable==1){
          zcxg_right_lable1.push(res.data.Top.OtherImg[i])
        }else{
          zcxg_right_lable2.push(res.data.Top.OtherImg[i])
        }
      }
      zcxg_right_lable1.name="中央精神"
      zcxg_right_lable2.name="本地动态"
      zcxg_right_lable_all.push(zcxg_right_lable1)
      zcxg_right_lable_all.push(zcxg_right_lable2)

      this.zcxg_right = zcxg_right_lable_all
    });
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
      this.$router.push({ name: "policy", query: { page: page } });
    },
    ClassNewsList_Other_function() {
      ClassNewsList_Other(
        this.ColumnsId,
        this.PageIndex,
        this.PageSize,
        res => {
          if (res.content == null) {
            this.$router.push({ name: "policy" });
            if(this.PageIndex!=1){
               this.$Message.warning("未找到当前页码");
            }
           
          } else {
            this.total = res.total;
            this.zcxg_page = res.content;

          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import '../assets/common.less';

.DJ_box {
  .content_mtop {
    margin-top: 30px;
  }

  .content2 {
    .DJ_width;

    .content_mtop;
    .content2_box {
      display: flex;
      justify-content: space-between;
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
  .policy_box {
    .DJ_width;

    display: flex;
    flex-direction: column;
  }
  .page_num {
    .DJ_width;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

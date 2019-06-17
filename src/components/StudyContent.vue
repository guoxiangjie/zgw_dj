<template>
  <div>
    <div class="study_top">
      <Title :href="href" text="习语金句"></Title>
    </div>
    <div class="study_top">
      <div class="item_0" v-if="xujy_page.length==0">暂无数据</div>
    </div>

    <div class="regime_content">
      <Row :gutter="32" type="flex">
        <Col :key="item.ID" v-for="item in xujy_page" span="6">
          <div v-if="item.Introduce=='pdf'" class="item" @click="openPDF(item)">
            <ImgClass height="184px" src="../../static/img/pdf.png"/>
            <div class="text">{{item.Title}}</div>
          </div>
          <div v-else class="item" @click="goDetails(item.ID)">
            <mp4Box height="184px" :src="item.ImgUrl"/>
            <div class="text">{{item.Title}}</div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="page_num" v-if="!isIndex">
      <Page
        @on-change="pageChange"
        :total="total"
        :current="PageIndex"
        show-elevator
        :page-size="PageSize"
        :show-total="true"
      />
    </div>

    <Modal v-model="pdfModel" width="1100px" footer-hide :title="PDFtitle">
      <div style="height:70vh" ref="PDF"></div>
    </Modal>
    <Modal v-model="pdfModel_ie" width="1200px" footer-hide :title="PDFtitle">
      <iframe width="100%" height="700px" :src="pdfModel_ie_url" frameborder="0"></iframe>
    </Modal>
  </div>
</template>


<script>
import Title from "@/components/Title";
import mp4Box from "@/components/mp4Box";
import ImgClass from "@/components/imgClass";
import pdfobject from "pdfobject";
import { GetClassNewsList_Study } from "../Api/Api";
export default {
  data() {
    return {
      pdfModel: false,
      pdfModel_ie: false,
      pdfModel_ie_url: "",
      xujy_page: [],
      PageIndex: 1,
      total: 0,
      PageSize: this.isIndex ? 8 : 12,
      PDFtitle: ""
    };
  },
  props: {
    isIndex: Boolean,
    href: String
  },
  components: {
    Title,
    mp4Box,
    ImgClass
  },
  created() {
    this.PageIndex = this.$route.query.page
      ? Number(this.$route.query.page)
      : 1;
    this.GetClassNewsList_Study_function();
  },
  beforeRouteUpdate(to, from, next) {
    this.PageIndex = Number(to.query.page);
    this.GetClassNewsList_Study_function();
    next();
  },
  methods: {
    //获取列表
    GetClassNewsList_Study_function() {
      GetClassNewsList_Study({
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      }).then(res => {
        if (res.data.Class_Study_News.length == 0) {
          this.$router.push({ name: "study" });
          if (this.PageIndex != 1) {
            this.$Message.warning("未找到当前页码");
          }
        } else {
          this.total = res.data.RowCount;
          this.xujy_page = res.data.Class_Study_News;
        }
      });
    },

    pageChange(page) {
      this.$router.push({ name: "study", query: { page: page } });
      this.$refs.GO_top.click();
    },
    //打开FDP
    openPDF(item) {
      this.pdfModel_ie_url = "";
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.pdfModel_ie = true;
        this.$nextTick(() => {
          this.pdfModel_ie_url =
            "/PDFView/web/viewer.html?file=" + item.FilePath;
        });

        //  window.open("/PDFView/web/viewer.html?filepath=" + item.FilePath)
      } else {
        if (pdfobject.supportsPDFs) {
          //检测浏览器是否支持pdfobject
          this.pdfModel = true;
          console.log(item.FileUrl);
          this.PDFtitle = item.Title;
          var options = {
            pdfOpenParams: { scrollbars: "0", toolbar: "0", statusbar: "0" } //禁用工具栏代码
          };
          this.$nextTick(() => {
            pdfobject.embed(item.FileUrl, this.$refs.PDF, options);
          });
        } else {
          this.pdfModel_ie = true;
          this.$nextTick(() => {
            this.pdfModel_ie_url =
              "/PDFView/web/viewer.html?file=" + item.FilePath;
          });
        }
      }
    },
    //前往视频详情页
    goDetails(item) {
      let routeUrl = this.$router.resolve({
        name: "study_details",
        params: { id: item }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";
.study_top {
  .DJ_width;
}
.regime_content {
  .DJ_width;
  min-height: 400px;
  color: #000;
  overflow: hidden;
  .item {
    height: 210px;
    margin-top: 40px;
    cursor: pointer;
    .text {
      font-size: 16px;
      height: 26px;
      line-height: 26px;
      text-align: center;
    }
  }
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

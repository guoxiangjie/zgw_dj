<template>
  <div>
    <div class="study_top">
      <Title text="学习教育"></Title>
    </div>
    <div class="regime_content">
      <Row :gutter="32" type="flex">
        <Col :key="item" v-for="item in 6" span="6">
          <div class="item">
            <mp4Box height="184px" src="https://gaopin-img.bj.bcebos.com/133204469315.jpg"/>
            <div class="text">习近平出席 不忘初心牢…</div>
          </div>
        </Col>
        <Col :key="item+10" v-for="item in 6" span="6">
          <div
            class="item"
            @click="openPDF('http://www.rkcinst.co.jp/chinese/pdf/sa200_inst_c.pdf')"
          >
            <ImgClass height="184px" src="/static/img/pdf.png"/>
            <div class="text">习近平出席 不忘初…</div>
          </div>
        </Col>
      </Row>
    </div>
    <Footer/>
    <Modal v-model="pdfModel" width="1100px"  footer-hide  title="学习教育PDF">
      <div style="height:70vh" ref="PDF"></div>
    </Modal>
  </div>
</template>


<script>
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import mp4Box from "@/components/mp4Box";
import ImgClass from "@/components/imgClass";
import pdfobject from "pdfobject";
export default {
  data() {
    return {
      pdfModel: false
    };
  },
  components: {
    Title,
    Footer,
    mp4Box,
    ImgClass
  },
  created() {
    console.log(pdfobject);
  },
  methods: {
    openPDF(src) {
      console.log(src);
      this.pdfModel = true;
      this.$nextTick(() => {
        pdfobject.embed(src, this.$refs.PDF);
      });
    }
  }
};
</script>


<style lang="less" scoped>
@import "../assets/common.less";
.study_top {
  .DJ_width;
  .content_mtop;
}
.regime_content {
  .DJ_width;
  min-height: 500px;
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
</style>

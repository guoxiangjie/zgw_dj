<template>
  <div>
    <div class="mien_details_content">
      <!-- <Alert type="warning" show-icon>
        注意
        <template
          slot="desc"
        >该页面为模拟数据,暂未提供数据接口</template>
      </Alert>-->
      <div class="mien_details_content_title">{{pageIndex.Title}}</div>
      <div class="DoubleSwiper-box">
        <DoubleSwiper :imgs="imgandvideo"></DoubleSwiper>
      </div>
    </div>

    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { NewsContent } from "../Api/Api.js";
import Footer from "@/components/Footer";
import DoubleSwiper from "@/components/DoubleSwiper";
export default {
  data() {
    return {
      pageIndex:Object,
      imgandvideo:[]
    };
  },
  methods: {
    getNewsContent() {
      NewsContent({
        ID: this.$route.params.id
      }).then(res => {

        if (res.result == 0) {
          this.$Message.warning(`接口报错提醒：${res.msg}`);
        } else {
          this.pageIndex = res.data;
          this.imgandvideo = res.data.imgandvideo
        }
      });
    }
  },
  created() {
    this.getNewsContent()
  },
  components: {
    Footer,
    DoubleSwiper
  }
};
</script>

<style lang="less" scoped>
.DJ_width {
  width: 1100px;
  margin: 0 auto;
}
img {
  display: block;
}
.shadow_box {
  width: inherit;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.content_mtop {
  margin-top: 30px;
}
.mien_details_content {
  .DJ_width;
  background: #fff;
}
.mien_details_content_title {
  height: 150px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 40px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.DoubleSwiper-box {
  .DJ_width;
}
</style>

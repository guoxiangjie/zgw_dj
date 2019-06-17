<template>
  <div>
    <div class="content-w">
      <div class="content">
        <div class="title">
          学习教育 >>
          <span>视频详情</span>
        </div>
        <div class="video-name">{{video_page.Title}}</div>
        <div class="video">
          <video
            width="900px"
            autoplay
            :src="video_page.FilePath"
            controls="controls"
          >您的浏览器不支持网页播放，请升级您的浏览器</video>
        </div>
        <Shart color="#fff" @shart="maxShart"/>
        <button ref="copy_hidden" class="copy-hidden" hidden :data-clipboard-text="href">Copy</button>
        <Modal
          v-model="qe_code"
          :closable="false"
          ok-text="关闭"
          cancel-text
          title="微信扫描二维码分享链接"
          width="380"
        >
          <div ref="qrcode" style="height:310px;text-align:center" id="qrcode"></div>
        </Modal>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<script>
import Clipboard from "clipboard";
import Footer from "@/components/Footer";
import Shart from "@/components/Shart";
import QRCode from "qrcodejs2";
import { shareToSinaWB, shareToQzone } from "../util/util.js";
import { NewsContent_Study } from "../Api/Api";
export default {
  data() {
    return {
      pageIndex: "",
      title: "",
      qe_code: false,
      href: "",
      video_page: ""
    };
  },
  components: {
    Footer,
    Shart
  },
  created() {
    this.href = window.location.href;
    NewsContent_Study({
      ID: this.$route.params.id
    }).then(res => {
      if (res.result == 1) {
        this.video_page = res.data;
      } else {
        this.$Message.warning(`${res.msg}`);
        this.$router.push({ path: "/error" });
      }
    });
  },
  methods: {
    maxShart(data) {
      this.share_all(data);
      console.log(data);
    },
    share_all(i) {
      if (i == 1) {
        shareToSinaWB(window.location, this.pageIndex.Title);
      }
      if (i == 2) {
        this.$refs.qrcode.innerHTML = "";
        this.qe_code = true;
        this.$nextTick(() => {
          new QRCode(this.$refs.qrcode, {
            width: 330,
            height: 310,
            text: window.location.href
          });
        });
      }
      if (i == 3) {
        shareToQzone(window.location, this.pageIndex.Title);
      }
      if (i == 4) {
        const clipboard = new Clipboard(".copy-hidden");
        this.$refs.copy_hidden.click();
        this.$Message.success("复制成功");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content-w {
  height: 900px;
  margin-top: 40px;
  background: #303036;
  .content {
    width: 1100px;
    margin: 0 auto;
    height: inherit;
    .title {
      height: 90px;
      line-height: 90px;
      font-size: 16px;
      color: #fff;
      span {
        font-weight: 600;
      }
    }
    .video-name {
      margin-bottom: 37px;
      font-size: 30px;
      color: #fff;
    }
    .video {
      width: 1100px;
      text-align: center;
      padding: 30px 0;
      background: #000;
    }
  }
}
</style>

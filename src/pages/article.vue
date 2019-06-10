<template>
  <div>
    <div class="article_title">
      <div class="left">
        {{titleArr[0]}}>>
        <span>{{titleArr[1]}}</span>
      </div>
      <div class="right">
        <div class="printer" @click="Print">
          <img src="../assets/img/icon-dayin.png" alt srcset>
          打印
        </div>

        <div class="share">
          <img src="../assets/img/icon-fenxiang.png" alt srcset>
          <Dropdown trigger="click" @on-click="share_all">
            分享
            <Icon type="ios-arrow-down"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="1">
                <img src="../assets/img/icon-weibo1.png" alt srcset>新浪微博
              </DropdownItem>
              <DropdownItem name="2">
                <img src="../assets/img/icon-weixin.png" alt srcset>微信
              </DropdownItem>
              <DropdownItem name="3">
                <img src="../assets/img/icon-kongjian1.png" alt srcset>QQ空间
              </DropdownItem>
              <DropdownItem name="4">
                <img src="../assets/img/icon-fuzhi1.png" alt srcset>复制链接
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div ref="article_content" class="article_content">
      <div class="article_content_h1">{{pageIndex.Title}}</div>
      <div class="article_content_handle">
        <div class="left">
          <span class="margin-right">{{pageIndex.CreateTimeT}}</span>
          <span>来源:</span>
          <span class="margin-right" style="color:red">{{pageIndex.Source}}</span>
          <span>浏览:{{pageIndex.TotalClick}}</span>
        </div>
        <div class="right">
          字体:
          <span
            class="size"
            @click="sizeChange(index)"
            :class="{active:index == active}"
            v-for="(item,index) in sizeList"
            :key="index"
          >[{{item.name}}]</span>
        </div>
      </div>
      <div
        class="article_content_text"
        :style="{'font-size':sizeList[active].size+'!important'}"
        v-html="pageIndex.Content"
      ></div>
    </div>
    <div class="article_good">
      <div class="icon" @click="AdmireAdd"></div>
      {{Admire}}
    </div>
    <div class="article_shart">
      <Shart @shart="maxShart"></Shart>
    </div>
    <div class="article_more">
      <div class="article_more_title">相关阅读</div>
      <div class="article_more_content">
        <MinListItem
          height="48px"
          v-for="(item,index) in more"
          type="full"
          icon="danghui"
          :value="item"
          :key="index"
          :text="item.Title"
          :time="item.CreateTimeT"
        ></MinListItem>
        <div style="font-size:20px" v-if="more.length==0">暂无相关阅读新闻</div>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
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
    <BackTop :height="340" :bottom="200" :right="200">
      <div ref="GO_top" class="top">
        <Icon type="md-arrow-round-up" size="30"/>
      </div>
    </BackTop>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { more } from "../../static/mock.js";
import { NewsContent, Admire } from "../Api/Api.js";
import { shareToSinaWB, shareToQzone } from "../util/util.js";
import Footer from "@/components/Footer";
import Shart from "@/components/Shart";
import MinListItem from "@/components/MinListItem";
import QRCode from "qrcodejs2";
export default {
  components: {
    Shart,
    Footer,
    MinListItem
  },
  data() {
    return {
      title: "",
      qe_code: false,
      titleArr: [],
      href: "",
      active: 1,
      more: more,
      sizeList: [
        {
          name: "大",
          size: "20px"
        },
        {
          name: "中",
          size: "18px"
        },
        {
          name: "小",
          size: "16px"
        }
      ],
      pageIndex: Object,
      Admire: 0
    };
  },
  methods: {
    Print() {
      this.$print(this.$refs.article_content);
    },
    maxShart(data) {
      this.share_all(data);
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
    },
    sizeChange(i) {
      this.active = i;
    },
    mounted() {},
    getNewsContent() {
      NewsContent({
        ID: this.$route.params.id
      }).then(res => {
        if (res.result == 1) {
          this.pageIndex = res.data;
          this.Admire = res.data.Admire;
          this.more = res.data.Relate.OtherImg;
        } else {
          this.$Message.warning(`${res.msg}`);
          this.$router.push({ path: "/error" });
        }
      });
    },

    AdmireAdd() {
      Admire({
        ID: this.$route.params.id
      }).then(res => {
        if (res.result == 1) {
          this.$Message.success(`点赞成功`);
          this.Admire += 1;
        } else {
          this.$Message.warning(`接口报错提醒：${res.msg}`);
        }
      });
    }
  },
  created() {
    this.getNewsContent();
    this.href = window.location.href;
    switch (this.$route.name) {
      case "mien_details":
        this.titleArr.push("党建风采");
        this.titleArr.push("风采学习");
        break;
      case "policy_details":
        this.titleArr.push("政策宣贯");
        this.titleArr.push("政策学习");
        break;
      case "regim_details":
        this.titleArr.push("制度建设");
        this.titleArr.push("制度学习");
        break;
      case "example_details":
        this.titleArr.push("榜样得力量");
        this.titleArr.push("榜样学习");
        break;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.article_title {
  .DJ_width;
  .content_mtop;
  height: 65px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .left {
    height: inherit;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
    span {
      font-weight: bold;
      color: rgba(255, 0, 0, 1);
      margin-left: 6px;
    }
  }
  .right {
    display: flex;
    height: inherit;
    .printer {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
      margin-right: 20px;
      cursor: pointer;
      img {
        margin-right: 6px;
      }
    }
    .share {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
      cursor: pointer;
      img {
        margin-right: 6px;
      }
    }
  }
}
.article_content {
  .DJ_width;
  .content_mtop;
  min-height: 200px;
  background: url("../assets/img/pic-zhuangshi.png") no-repeat 20px 22px #fff;
  .article_content_h1 {
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    font-size: 30px;
    text-align: center;
    padding: 33px 210px;
    margin-bottom: 20px;
  }
  .article_content_handle {
    padding: 16px 0;
    display: flex;
    width: 940px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(228, 228, 228, 1);
    font-size: 16px;
    color: rgba(0, 0, 0, 1);
    justify-content: space-between;
    padding-left: 40px;
    .size {
      cursor: pointer;
      margin-left: 4px;
      transition: color 0.4s;
      &:hover {
        color: red;
      }
    }
    .active {
      color: red;
    }
    .margin-right {
      margin-right: 10px;
    }
  }
  .article_content_text {
    padding: 30px 53px;
    text-align: justify;
    min-height: 400px;
  }
}
.article_good {
  .DJ_width;
  text-align: center;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  line-height: 32px;
  .icon {
    width: 88px;
    height: 88px;
    background: url("../assets/img/icon-dianzan.png") no-repeat;
    margin: 0 auto;
    cursor: pointer;
  }
}
.article_shart {
  .DJ_width;
  width: 940px;
  margin-top: 15px;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.article_more {
  .DJ_width;
  width: 940px;
  .article_more_title {
    font-size: 30px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    padding: 25px 0;
  }
}
</style>

<template>
  <div>
    <div class="top">
      <Title text="党员资料"></Title>
    </div>
    <div class="content" v-if="show">
      <div class="title">党员资料</div>
      <div class="table" v-cloak>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="row" style="height:320px">
          <div class="col" style="width:240px;padding:4px;">
            <img style="width:100%;" :src="pageData.PicPath" alt srcset>
          </div>
          <div class="col noBorder" style=" flex-grow: 1">
            <div class="row" style="height:80px">
              <div class="col" style="width:150px">姓名</div>
              <div class="col" style="width:215px">{{pageData.Name}}</div>
              <div class="col" style="width:150px">部门</div>
              <div class="col" style="width:215px">{{pageData.CompanyDepartmentT}}</div>
            </div>
            <div class="row" style="height:80px">
              <div class="col" style="width:150px">性别</div>
              <div class="col" style="width:215px">{{pageData.Sex == 0 ? '男':'女'}}</div>
              <div class="col" style="width:150px">年龄</div>
              <div class="col" style="width:215px">{{pageData.Age}}</div>
            </div>
            <div class="row" style="height:80px">
              <div class="col" style="width:150px">出生时间</div>
              <div class="col" style="width:215px">{{pageData.BirthdayT}}</div>
              <div class="col" style="width:150px">学历</div>
              <div class="col" style="width:215px">{{pageData.Education}}</div>
            </div>
            <div class="row" style="height:80px">
              <div class="col" style="width:150px">政治面貌</div>
              <div class="col" style="width:215px">{{pageData.PoliticT}}</div>
              <div class="col" style="width:150px">入党时间</div>
              <div class="col" style="width:215px">{{pageData.JoinTimeT}}</div>
            </div>
          </div>
        </div>
        <div style="height:80px" class="row">
          <div class="col" style="width:240px;">党关系所在地</div>
          <div class="col" style="width:730px;padding:0 20px;text-align:left">{{pageData.Place}}</div>
        </div>
        <div style="height:80px" class="row">
          <div class="col" style="width:240px;">党支部职务</div>
          <div
            class="col"
            style="width:730px;padding:0 20px;text-align:left"
          >{{pageData.PartyPosition}}</div>
        </div>
        <div style="height:360px" class="row">
          <div class="col" style="width:240px;line-height:320px">备注</div>
          <div
            class="col"
            style="width:730px;padding:20px;line-height:40px;text-align:left"
            v-html="pageData.Career"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="!show" class="content_no"></div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { GetPartMemberByID } from "../Api/Api.js";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import { getCookie, setCookie, delCookie } from "../util/util.js";
export default {
  components: {
    Footer,
    Title
  },
  data() {
    return {
      pageData: Object,
      show: true,
      spinShow: true
    };
  },
  methods: {},
  created() {
    GetPartMemberByID({
      ID: Number(this.$route.params.id),
      UserInfoId: Number(getCookie("userId"))
    }).then(res => {
      this.spinShow = false;
      if (res.result != 1) {
        this.show = false;
        this.$Message.error(`${res.msg}`);
      } else {
        this.pageData = res.data;
        this.show = true;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.DJ_width {
  width: 1100px;
  margin: 0 auto;
}
.shadow_box {
  width: inherit;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.content_mtop {
  margin-top: 30px;
}
.content_no {
  .DJ_width;
  height: 400px;
  background: url("../assets/img/quanxian.png") no-repeat center center;
}
.row {
  display: flex;
  width: 100%;
}
.col {
  box-sizing: border-box;
  border-left: 1px solid #000000;
  border-top: 1px solid #000000;
  text-align: center;
  line-height: 80px;
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
}
.col:nth-child(odd) {
  font-weight: 700;
}

.noBorder {
  border: 0;
}
.top {
  .DJ_width;
  .content_mtop;
}
.content {
  .shadow_box;
  .DJ_width;
  .content_mtop;
  height: 1050px;
  .title {
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-weight: bold;
    color: rgba(255, 0, 0, 1);
    font-size: 40px;
  }
  .table {
    width: 970px;
    margin: 0 auto;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
}
</style>

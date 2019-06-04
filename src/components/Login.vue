<template>
  <div
    class="box"
    onselectstart="return false"
    style="-moz-user-select:none;"
    :style="{'width':width,'height':height}"
  >
    <Modal v-model="loginErr" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <p>账号或密码错误</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="loginErr=false">关闭</Button>
      </div>
    </Modal>

    <div v-if="!isLogin" class="login_no">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Form
        class="login_form"
        style="width:1100px"
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        inline
      >
        <div class="item item-hello">欢迎你，来到中钢网党建智慧云，如对党建有任何意见及建议请联系党支部书记。</div>
        <div class="item">
          <FormItem prop="name">
            <Input
              @on-focus="loginErr=false"
              class="ts_input"
              v-model="formValidate.name"
              placeholder="请输入账号"
            />
          </FormItem>
        </div>
        <div class="item">
          <FormItem prop="password">
            <Input
              v-model="formValidate.password"
              type="password"
              placeholder="请输入密码"
              @on-focus="loginErr=false"
            />
          </FormItem>
        </div>
        <div class="ts ts2">
          <Button @click="handleSubmit" type="primary">登录</Button>
        </div>
        <div class="item ts">
          <Tooltip style="cursor: pointer;font-size:12px;" content="忘记密码，请联系中钢网党建管理人员">忘记密码？</Tooltip>
        </div>
      </Form>
    </div>

    <div v-else class="login_yes">
      <div class="login_yes_content">
        <div class="login_yes_content_left">欢迎你，来到中钢网党建智慧云，如对党建有任何意见及建议请联系党支部书记。</div>
        <div class="login_yes_content_right">
          <div class="head_pic">
            <img src="../assets/img/pic-touxiang.png" alt srcset>
          </div>
          <div class="head_name">
            <div class="text">{{name}}</div>
            <div class="btn">
              <Poptip confirm title="确定要退出吗？" placement="bottom" @on-ok="quit">[退出]</Poptip>
            </div>
          </div>
          <div class="title">{{oclass}}</div>
          <div class="TheList" @click="go">党员名录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PartMemberLogin } from "../Api/Api.js";
import { getCookie, setCookie, delCookie } from "../util/util.js";
export default {
  data() {
    return {
      single: "",
      name: "",
      oclass: "",
      loginErr: false,
      isLogin: false,
      spinShow: false,
      formValidate: {
        name: "",
        password: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    let user = getCookie("user");
    if (user != null) {
      this.name = unescape(getCookie("user"));
      this.oclass = unescape(getCookie("oclass"));
      this.isLogin = true;
    }
  },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleSubmit() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.spinShow = true;
          setTimeout(() => {
            PartMemberLogin({
              UserName: this.formValidate.name,
              passwords: this.formValidate.password
            }).then(res => {
              if (res.result == 1) {
                setCookie("user", res.data.Name);
                setCookie("oclass", res.data.Politic);
                setCookie("userId", res.data.UserId);
                this.name = res.data.Name;
                this.oclass = res.data.Politic;
                this.spinShow = false;
                this.isLogin = true;
                this.$Message.success("登陆成功");
              } else {
                this.spinShow = false;
                this.loginErr = true;
              }
            });
          }, 500);
        } else {
        }
      });
    },
    go() {
      let routeUrl = this.$router.resolve({
        name: "directories"
      });
      window.open(routeUrl.href, "_blank");
    },
    quit() {
      this.isLogin = false;
      delCookie("user");
      delCookie("userId");
      delCookie("oclass");

      this.formValidate = {
        name: "",
        password: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 380px;
  display: flex;
  justify-content: center;
  position: relative;
}
.zz {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
}
.login_no {
  width: 1100px;
  display: flex;
  flex-direction: column;
  background: #efefef;
  margin: 10px 0;
  position: relative;
  .item {
    display: flex;
  }
  .item-hello {
    flex-grow: 1;
    font-size: 14px;
  }
  .ts {
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
  }
  .ts2 {
    display: block;
    text-align: center;
  }
}
.login_form {
  display: flex;
  height: 90px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px;
}
.login_yes {
  width: 100%;
  margin: 10px 0;

  .login_yes_content {
    background: #efefef;
    width: 1100px;
    margin: 0 auto;
    display: flex;
    padding: 0 30px;
    height: 90px;
    display: flex;
    align-items: center;
    .login_yes_content_left {
      flex-grow: 1;
      font-size: 14px;
    }
    .login_yes_content_right {
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn {
        cursor: pointer;
      }
      .TheList {
        cursor: pointer;
        background: #fff;
        padding: 4px 10px;
        &:hover {
          background: red;
          color: #fff;
        }
      }
    }
  }
}
</style>

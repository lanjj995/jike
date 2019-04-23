<template>
  <div class="form">
    <div class="title">注册</div>
    <inputComponent type="tel" placeholder="账号( 请输入手机号码 )" v-model="phone">
      <span class="check">{{checkObject.checkPhoneValue}}</span>
    </inputComponent>
    <inputComponent type="text" :width="228" placeholder="图形验证码" v-model="imgCaptcha">
      <span v-html="captcha" class="captcha" ></span>
      <span class="check">{{checkObject.checkImgCaptchaVlaue}}</span>
    </inputComponent>
    <inputComponent :width="228" placeholder="短信验证码" v-model="smsCaptcha">
      <buttonComponent
        @click.native="getCaptcha"
        :disabled="isdisabled"
        value="获取验证码"
        class="buttonStyle"
      ></buttonComponent>
      <span class="check">{{checkObject.checkSMSCaptchaValue}}</span>
    </inputComponent>
    <inputComponent
      type="password"
      placeholder="密码( 请输入6-20位字符 )"
      minlength="6"
      maxlength="20"
      v-model="password"
    >
      <span class="check">{{checkObject.checkPasswordValue}}</span>
    </inputComponent>
    <inputComponent
      type="password"
      placeholder="确认密码"
      minlength="6"
      maxlength="20"
      v-model="comfirPasssword"
    >
      <span class="check">{{checkObject.checkComfirmPasswordValue}}</span>
    </inputComponent>
    <div class="finishDiv">
      <buttonComponent type="button" class="finishButton" value="注册" @click.native="registmethod"></buttonComponent>
    </div>
    <div class="form-bottom1" >
      <span>已经有APIS账号了</span>
      <buttonComponent value="登录" class="loginButton" @click.native="goLogin"></buttonComponent>
    </div>
  </div>
</template>
<script>
import inputComponent from "../input/input-text";
import buttonComponent from "../input/input-button";
import {
  getImgCaptcha,
  getSmsCaptcha,
  getSmsCaptchaReceive,
  regist
} from "@/api/user.js";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      captcha: "",
      isdisabled: false,
      phone: "",
      imgCaptcha: "",
      smsCaptcha: "",
      password: "",
      comfirPasssword: "",
      captchasuccess:false,
      checkObject: {
        checkPhoneValue: "",
        checkImgCaptchaVlaue: "",
        checkSMSCaptchaValue: "",
        checkPasswordValue: "",
        checkComfirmPasswordValue: ""
      }
    };
  },
  components: {
    inputComponent,
    buttonComponent
  },
  methods: {
    checkPhone() {
      if (this.phone) {
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          this.checkObject.checkPhoneValue = "手机号码有误，请重填";
          return false;
        } else {
          this.checkObject.checkPhoneValue = "";
          return true;
        }
      } else {
        this.checkObject.checkPhoneValue = "请输入手机号";
        return false;
      }
    },
    checkImgCaptcha() {
      if (this.imgCaptcha) {
        this.checkObject.checkImgCaptchaVlaue = "";
        return true;
      } else {
        this.checkObject.checkImgCaptchaVlaue = "请输入图形验证码";
        return false;
      }
    },
    checkSMSCaptcha() {
      if (this.smsCaptcha) {
        this.checkObject.checkSMSCaptchaValue = "";
        return true;
      } else {
        this.checkObject.checkSMSCaptchaValue = "请输入手机验证码";
        return false;
      }
    },
    checkPassword() {
      if (this.password) {
        if (!/^[\w]{6,12}$/.test(this.password)) {
          this.checkObject.checkPasswordValue = "必须是6-24位";
          return false;
        } else {
          this.checkObject.checkPasswordValue = "";
          return true;
        }
      } else {
        this.checkObject.checkPasswordValue = "请输入密码";
        return false;
      }
    },
    checkComfirmPassword() {
      if (this.comfirPasssword) {
        if (!/^[\w]{6,12}$/.test(this.comfirPasssword)) {
          this.checkObject.checkComfirmPasswordValue = "必须是6-24位";
          return false;
        } else {
          if (this.comfirPasssword == this.password) {
            this.checkObject.checkComfirmPasswordValue = "";
            return true;
          } else {
            this.checkObject.checkComfirmPasswordValue = "两次密码不一致";
            return false;
          }
        }
      } else {
        this.checkObject.checkComfirmPasswordValue = "请确认密码";
        return false;
      }
    },
    goLogin() {
      this.$router.push({ path: "login" });
    },
    // 获取短信验证码
    getCaptcha() {
      var isPhone = this.checkPhone();
      if (!isPhone) return;
      if (this.captchasuccess) {
        this.getCaptchaRecevie();
      } else {
         getSmsCaptcha(this.phone, "register", this.imgCaptcha)
         .then(res => {
          if (
            res.data.code === "success" ||
            res.data.code === "sms_captcha_has_sent"
          ) {
            this.captchasuccess = true;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
      }
    
    },
    // 获取短信验证码
    getCaptchaRecevie() {
      getSmsCaptchaReceive(this.phone, "register")
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              type: "success",
              message: "您的短信验证码是" + res.data.data.smsCaptcha
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
        });
    },
    registmethod() {
      var isPhone = this.checkPhone();
      if (!isPhone) return;
      var isImgCaptcha = this.checkImgCaptcha();
      if (!isImgCaptcha) return;
      var isSMSCaptcha = this.checkSMSCaptcha();
      if (!isSMSCaptcha) return;
      var isPassword = this.checkPassword();
      if (!isPassword) return;
      var isComfirmPassword = this.checkComfirmPassword();
      if (!isComfirmPassword) return;
      regist(this.phone, this.password, this.smsCaptcha)
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.goLogin();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      
    },
    // 获取图片验证码
    getImgCaptchaMethod(){
        getImgCaptcha()
      .then(res => {
        this.captcha = res.data;
      })
      .catch(err => {
        console.log(err);
      });
      }

  },

  created() {
    this.getImgCaptchaMethod();
  },
   
};
</script>
<style scoped>
.form {
  width: 568px;
  position: absolute;
  left: 674px;
  top: 107px;
  background: #466d9c;
  box-shadow: 6px 6px 14px 5px rgba(39, 52, 101, 0.08);
}
.title {
  font-size: 36px;
  color: #ffffff;
  text-align: center;
  margin: 40px 0 30px 0;
}
.buttonStyle {
  width: 139.8px;
  color: #ffffff;
  background: #ff8000;
  margin-left: 12px;
}
.finishDiv {
  width: 380px;
  margin: 40px auto 50px;
}
.finishButton {
  width: 100%;
  height: 53px;
  color: #ffffff;
  background: #ff8000;
}
.form-bottom1 {
  height: 108px;
  border-top: 1px solid #fff;
  color: #ffffff;
  font-size: 14px;
  padding: 0 20px;
  line-height: 108px;
  box-sizing: border-box;
  vertical-align: middle;
}
.loginButton {
  width: 66px;
  height: 41px;
  font-size: 20px;
  background: #ffffff;
  color: #0d407e;
  float: right;
  margin-top: 33.5px;
}
.captcha {
  display: inline-block;
  width: 140px;
  margin-left: 12px;
  height: 56px;
  float: right;
  padding: 10px 30px;
  box-sizing: border-box; 
}

.check {
  color: #f00;
  font-size: 12px !important;
}
</style>

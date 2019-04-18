<template>
  <div class="updatepsw">
    <div class="title">
      <span></span>账户设置-修改密码
    </div>
    <div class="form">
      <inputComponent type="tel" placeholder="请输入手机号" :border="'1px solid #DCDCDC'" v-model="phone">
      <span class="check">{{checkObject.checkPhoneValue}}</span>
      </inputComponent>
      <inputComponent
        type="text"
        :width="228"
        placeholder="图形验证码"
        :border="'1px solid #DCDCDC'"
        v-model="imgCaptcha"
      >
      <span v-html="captcha" class="captcha"></span>
      <span class="check">{{checkObject.checkImgCaptchaVlaue}}</span>
      </inputComponent>
      <inputComponent
        :width="228"
        placeholder="短信验证码"
        :border="'1px solid #DCDCDC'"
        v-model="smsCaptcha"
      >
        <buttonComponent value="获取验证码" class="buttonStyle" @click.native="getCaptcha"></buttonComponent>
      <span class="check">{{checkObject.checkSMSCaptchaValue}}</span>

      </inputComponent>
      <inputComponent
        type="password"
        placeholder="请输入新密码"
        :border="'1px solid #DCDCDC'"
        v-model="newPassword"
      ></inputComponent>
      <span class="check">{{checkObject.checkPasswordValue}}</span>

      <inputComponent
        type="password"
        placeholder="确认密码"
        :border="'1px solid #DCDCDC'"
        v-model="confirmpassword"
      >
      <span class="check">{{checkObject.checkComfirmPasswordValue}}</span>
      
      </inputComponent>
      <div class="finishDiv">
        <buttonComponent width class="finishButton" @click.native="updatePswMethod" value="完成"></buttonComponent>
      </div>
    </div>
  </div>
</template>
<script>
import inputComponent from "@/components/input/input-text";
import buttonComponent from "@/components/input/input-button";
import {updateUserMessage} from "@/api/account.js";
import {getImgCaptcha,updatepsw,getSmsCaptchaReceive,getSmsCaptcha} from "@/api/user.js";
export default {
  components: {
    inputComponent,
    buttonComponent
  },
  data(){
    return {
      phone:"",
      imgCaptcha:"",
      smsCaptcha:"",
      newPassword:"",
      confirmpassword:"",
      captcha:"",
      checkObject: {
        checkPhoneValue: "",
        checkImgCaptchaVlaue: "",
        checkSMSCaptchaValue: "",
        checkPasswordValue: "",
        checkComfirmPasswordValue: ""
      },
      captchaSuccess:false
    }
  },
  methods:{
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
    // 获取短信验证码
    getCaptcha() {
      var isPhone = this.checkPhone();
      if (!isPhone) return;
getSmsCaptcha(this.phone,"reset",this.imgCaptcha).then(res => {
  if (res.data.code === "success") {
     this.$message({
              type: "success",
              message: res.data.data.message
            });
      this.captchaSuccess = true;
  } else {
            this.$message.error(res.data.message);

  }
}).catch(err => {

});
      
    },
    // 获取图片验证码
    getImgCaptchaMethod(){
        getImgCaptcha()
      .then(res => {
        this.captcha = res.data;
      })
      .catch(err => {
        // 错误处理
      });
      },
    updatePswMethod() {
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
      updatepsw(this.phone, this.smsCaptcha, this.password)
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.goLogin();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch:{
    captchaSuccess(value){
      if (value){
   
      getSmsCaptchaReceive(this.phone, "reset")
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
      }
    }
  },
  created(){
    this.getImgCaptchaMethod();
  }
};
</script>
<style scoped>
.updatepsw {
  width: 1032px;
  background: #fff;
  margin: auto;
  padding-bottom: 30px;
}
.title {
  height: 30px;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid #dcdcdc;
  margin-bottom: 30px;
}
.title > span {
  display: inline-block;
  width: 0;
  height: 100%;
  border-left: 2px solid #0074ff;
  border-right: 2px solid #0074ff;
  margin-right: 50px;
  vertical-align: middle;
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
  width: 380px;
  height: 53px;
  color: #ffffff;
  background: #ff8000;
}
.check {
  color: #f00;
  font-size: 12px !important;
}
</style>

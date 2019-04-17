<template>
  <div class="updatepsw">
    <div class="title">
      <span></span>账户设置-修改密码
    </div>
    <div class="form">
      <inputComponent type="tel" placeholder="请输入手机号" :border="'1px solid #DCDCDC'" v-model="phone"></inputComponent>
      <inputComponent
        type="text"
        :width="228"
        placeholder="图形验证码"
        :border="'1px solid #DCDCDC'"
        v-model="imgCaptcha"
      ></inputComponent>
      <inputComponent
        :width="228"
        placeholder="短信验证码"
        :border="'1px solid #DCDCDC'"
        v-model="smsCaptcha"
      >
        <buttonComponent value="获取验证码" class="buttonStyle"></buttonComponent>
      </inputComponent>
      <inputComponent
        type="password"
        placeholder="请输入新密码"
        :border="'1px solid #DCDCDC'"
        v-model="newPassword"
      ></inputComponent>
      <inputComponent
        type="password"
        placeholder="确认密码"
        :border="'1px solid #DCDCDC'"
        v-model="password"
      ></inputComponent>
      <div class="finishDiv">
        <buttonComponent width class="finishButton" value="完成"></buttonComponent>
      </div>
    </div>
  </div>
</template>
<script>
import inputComponent from "@/components/input/input-text";
import buttonComponent from "@/components/input/input-button";
export default {
  components: {
    inputComponent,
    buttonComponent
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
</style>

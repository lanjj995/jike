<template>
  <div class="form">
    <div class="title">
      <span></span>账户设置
    </div>
    <div class="content">
      <div class="avator">
      <img src="@/assets/header.png">
      <label for="avator" class="avatorLable">上传头像</label><input type="file" id="avator">
      </div>
      <p>{{this.$store.state.user.nickname}}</p>

      <table>
        <tr>
          <td>昵称</td>
          <td>
            <inputCom
              style="height:51px;"
              :width="380"
              :height="38"
              :border="'1px solid #6f6f6f'"
              v-model="username"
            ></inputCom>
          </td>
        </tr>
        <tr>
          <td>手机号</td>
          <td>182*****440</td>
        </tr>
        <tr>
          <td>密码</td>
          <td>
            ******
            <inputButtonCom
              style="width:110px;height:38px;float:right;background: #FF8000;color:#fff;vertical-align: middle;"
              value="修改"
              @click.native="toUpdatePsw"
            ></inputButtonCom>
          </td>
        </tr>
      </table>
    </div>
    <div class="submit">
      <inputButtonCom style="width:110px;color:#fff;height:38px;background: rgb(255, 128, 0);" value="保存"></inputButtonCom>
    </div>
  </div>
</template>
<script>
import inputCom from "../input/input-text";
import inputButtonCom from "../input/input-button";
export default {
  components: {
    inputCom,
    inputButtonCom,
  },
  data(){
    return {
    username:""
    }
  },
  methods: {
    toUpdatePsw() {
      this.$router.push("/account/updatepsw");
    }
  },
  created(){
    this.username = this.$store.state.user.nickname;
  }
};
</script>
<style scoped>
.title {
  height: 30px;
  padding: 30px 0 30px 0;
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
.avator{
  width: 82.6px;
  margin:auto;
  position: relative;
}
.submit{
  text-align: center;
}
.form > .content {
  text-align: center;
}
.avator > img {
  width: 82.6px;
  height: 82.6px;
  border-radius: 50%;
}
.avatorLable{
  display: block;
  width: 82.6px;
  height: 82.6px;
  border-radius: 50%;
  line-height: 82.6px;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  margin: auto;
  position: absolute;
  top: 0;
  display: none;
}

table {
  margin: auto;
}
table > tr > td {
  width: 100px;
  height: 50px;
}
table > tr > td:nth-child(2) {
  text-align: left;
  line-height: 50px;
}


input[type=file]{
  display: none;
}
</style>

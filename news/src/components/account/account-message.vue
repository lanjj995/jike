<template>
  <div class="form">
    <div class="title">
      <span></span>账户设置
    </div>
    <div class="content">
      <div class="avator">
        <img :src="src?src:this.$store.state.avatar?this.$store.state.avatar:header" @mouseover="isshow=true">
        <label for="avator" class="avatorLable" v-show="isshow" @mouseout="isshow=false">上传头像</label>
        <input
          type="file"
          id="avator"
          @change="sheckFileSize"
          accept="image/x-png, image/gif, image/jpeg, image/bmp"
        >
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
      <inputButtonCom
        style="width:110px;color:#fff;height:38px;background: rgb(255, 128, 0);"
        @click.native="updateUserMessageMethod"
        value="保存"
      ></inputButtonCom>
    </div>
  </div>
</template>
<script>
import inputCom from "../input/input-text";
import inputButtonCom from "../input/input-button";
import { updateUserMessage } from "@/api/account.js";
import header from "@/assets/header.png";
export default {
  components: {
    inputCom,
    inputButtonCom
  },
  data() {
    return {
      username: "",
      isshow: false,
      checkFile: false,
      checkUsername: "",
      src:"",
      header,
    };
  },
  methods: {
    // 检查文件大小
    sheckFileSize() {
      let avator = document.getElementById("avator");
      let file = avator.files[0];
      console.log(file.size);
      if (file) {
        let size = file.size/1024;
        if (size > 300) {
          this.$message.error("上传文件不能大于300K");
        } else {
          this.checkFile = true;
          // 获取文件读取对象
          var reader = new FileReader();
          // 文件读取完后的展示图片
          reader.addEventListener(
            "load",
            () => {
              this.src = reader.result;
            },
            false
          );
          reader.readAsDataURL(file);
        }
      }
    },
    toUpdatePsw() {
      this.$router.push("/account/updatepsw");
    },
    updateUserMessageMethod() {
      if (this.checkFile) {
        if (this.checkUsername === "err_long"){
          this.$message.error("昵称长度不能大于32个字符");
          return;
        }
        let avator = document.getElementById("avator");
      let file = avator.files[0];
        updateUserMessage(this.$store.state.user.token, file, this.username)
              .then(res => {
                if (res.data.code === "success") {
                  this.$store.state.user.nickname = this.username;
                  this.$store.state.user.avatar = this.src;
                  localStorage.user = JSON.stringify(this.$store.state.user);
                  this.$message(
                    {type:"success",message:res.data.message}
                  );
                } else {
                  this.$alert(res.data.message,"提示信息",{ confirmButtonText: '确定',});
                }
              })
              .catch(err => {
                // 错误处理
              });
      } else {

        if (this.checkUsername === "success") {
         updateUserMessage(this.$store.state.user.token, file, this.username)
              .then(res => {
                if (res.data.code === "success") {
                  this.$store.state.user.nickname = this.username;
                  localStorage.user = JSON.stringify(this.$store.state.user);
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                // 错误处理
              });
        }   else{
            this.$alert(this.checkUsername,"提示信息",{ confirmButtonText: '确定',});
        }
      } 
    }
  },
  watch: {
    username(value) {
      if (!value) {
        this.checkUsername = "err_null";
        this.checkUsername = "昵称不能为空";
        return;
      }
      if (value.length > 32) {
        this.$message.error("昵称长度不能大于32个字符");
        this.checkUsername = "昵称长度不能大于32个字符";
        return;
      }
      if (value === this.$store.state.user.nickname) {
        this.checkUsername = "您的昵称没有改变";
        return;
      }
      this.checkUsername = "success";
    }
  },
  created() {
    this.username = this.$store.state.user.nickname;
  },
  updated(){
    console.log(this.checkUsername,this.src);
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
.avator {
  width: 82.6px;
  margin: auto;
  position: relative;
}
.submit {
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
.avatorLable {
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

input[type="file"] {
  display: none;
}
</style>

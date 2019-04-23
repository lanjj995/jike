<template>
  <div class="login_wrapper">
    <div class="login">
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item>
          <h2 class="title">即刻公考后台管理系统</h2>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="adminlogin('userForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="bei">京ICP备18050367号-1</p>
  </div>
</template>
<script>
import { login } from "../api/user.js";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    adminlogin(formName) {
      this.$refs[formName].validate(valia => {
        if (valia) {
          login(this.user)
            .then(res => {
              if (res.data.code === "success") {
                  this.$message(
                      {message:"登陆成功",type:"success"}
                  )
                localStorage.user = JSON.stringify(res.data.data.user);
                localStorage.token = JSON.stringify(res.data.data.token);
                this.$store.state.user = res.data.data.user;
                this.$store.state.token = res.data.data.token;
                this.$router.push( "/");

              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              // 错误处理
              this.$router.push("/");
            });
        } else {
        }
      });
    }
  },
  updated() {
    console.log(this.user);
  }
};
</script>

<style>
.login {
  width: 450px;
  height: auto;
  margin: 150px auto 0px;
  padding: 50px 20px;
  border: 1px solid #eaeaea;
  -webkit-box-shadow: 0 0 25px #cac6c6;
  box-shadow: 0 0 25px #cac6c6;
}
.el-form-item__content {
    width: 300px;
    margin: auto;
}
.el-form-item__content > .el-button {
    width: 300px;
}
</style>


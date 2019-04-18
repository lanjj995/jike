<template>
  <header>
    <div :class="[color?'logoWhite':'logo']"></div>
    <span>新闻项目</span>
    <div class="login-regist" v-show="!this.$store.state.user">
      <a href="#" :style="{color:color?color:'#0074ff;'}">登录</a>
      <a href="#" :style="{color:color?color:'#0074ff;'}">注册</a>
    </div>
    <div class="user-header" v-show="this.$store.state.user">
      <img :src="avatar?avatar:defaultAvator" alt="头像" id="header" @click="goMessage">
      <span id="username" @click="goMessage">{{user.nickname}}</span>

      <img :src="imgUrl" class="arrow_down" @click="falg = !falg">
      <nav :style="{display:falg?'block':'none'}">
        <li @click="goAccount">
          <img src="@/assets/icon_my.png">
          我的账户
        </li>
        <li @click="loginOut">
          <img src="@/assets/icon_out.png">
          退出登录
        </li>
      </nav>
    </div>
  </header>
</template>
<script>
import defaultAvator from "@/assets/header.png";
export default {
  props: {
    color: String
  },
  data() {
    return {
      falg: false,
      user:{},
      avatar:"",
      defaultAvator,
    };
  },
  methods:{
    goMessage(){
      this.$router.push({path:'/message'});
    },
    goAccount(){
      this.$router.push({path:'/account'});
    },
    loginOut(){
      this.$store.state.user = {};
      localStorage.user = null;
      this.$router.push({path:'/user/login'});
    }
  },
  computed: {
    imgUrl() {
      return this.falg
        ? require("@/assets/icon_arrow_up.png")
        : require("@/assets/icon_arrow_down.png");
    }
  },
  created(){
    this.user = this.$store.state.user;
    this.avatar = this.$store.state.avatar;
    
  }
};
</script>

<style>
header {
  width: 100%;
  height: 80px;
  font-size: 26px;
  color: #0074ff;
  line-height: 80px;
}
a {
  color: #0074ff;
  font-size: 20px;
}

header > .logo {
  display: inline-block;
  width: 130px;
  height: 80px;
  background: url("../../assets/logo_color.png") 100% 50% no-repeat;
  vertical-align: middle;
  margin: 0 30px 0 130px;
}

.logoWhite {
  display: inline-block;
  width: 130px;
  height: 80px;
  background: url("../../assets/logo_white.png") 100% 50% no-repeat;
  vertical-align: middle;
  margin: 0 30px 0 130px;
}

header > span {
  display: inline-block;
  height: 80px;
  line-height: 80px;
}

header > .login-regist {
  display: inline-block;
  height: 80px;
  vertical-align: middle;
  float: right;
}

header > .login-regist > a:last-child {
  margin: 0 130px 0 30px;
}
.user-header {
  height: 100%;
  display: inline-block;
  float: right;
  color: #fff;
  font-size: 18px;
  margin-right: 130px;
  vertical-align: middle;
  position: relative;
}
header > .user-header > #header {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 20px;
}

header > .user-header > .arrow_down {
  margin-left: 20px;
  vertical-align: middle;
  cursor: pointer;
}

nav {
  width: 140px;
  list-style: none;
  font-size: 14px;
  color: #333;
  box-shadow: -2px -2px 3px 1px rgba(39, 52, 101, 0.08),
    2px 2px 3px 1px rgba(39, 52, 101, 0.08);
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 999;
  background: #fff;
}
nav > li {
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  cursor: pointer;
}
nav > li > img {
  vertical-align: middle;
  margin-right: 9px;
}
</style>
<template>
  <div class="message-content">
    <div class="message-content-nav">
      <div class="head">
        <img src="../assets/user.jpg">
        <p>匿名用户</p>
        <div class="line"></div>
      </div>
      <div class="nav">
        <ul>
          <router-link to="myset">
            <li class="router">个人设置</li>
          </router-link>
          <router-link to="mycourse">
            <li class="router">我的课程</li>
          </router-link>
          <router-link to="order">
            <li class="router">我的订单</li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="message-content-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import myset from "../components/myset";
import mycourse from "../components/mycourse";
import myorder from "../components/myorder";
export default {
  components: {
    myset,
    mycourse,
    myorder
  }
};
</script>
<style scoped>
.message-content {
  width: 1180px;
  margin: auto;
}
.message-content::after {
  content: "";
  display: block;
  clear: both;
}
.message-content-nav {
  width: 280px;
  background: #fff;
  border: 1px solid #d4cfbf;
  float: left;
}
.message-content-nav > .head {
  text-align: center;
  padding: 20px 0;
  box-sizing: border-box;
}
.message-content-nav > .head > img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.message-content-nav > .head > .line {
  height: 0;
  width: 260px;
  margin: auto;
  border-bottom: 1px solid #e9e9e9;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}
.router {
  font-size: 16px;
  color: #000;
  padding: 20px;
}
.router:first-child {
  background: #5ecfba;
}
.message-content-content {
  width: 876px;
  background: #fff;
  float: left;
  margin-left: 20px;
  border: 1px solid #d4cfbf;
  padding: 30px;
  box-sizing: border-box;
}
</style>

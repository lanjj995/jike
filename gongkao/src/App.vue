<template>
  <div id="app">
    <div class="header">
      <div class="content">
        <div class="logo"></div>
        <div class="nav">
          <ul>
            <router-link to="/">
              <li class="navLi">首页</li>
            </router-link>
            <router-link to="/courses">
              <li class="navLi">课程库</li>
            </router-link>
            <li class="navLi">真题库</li>
            <router-link to="/students">
              <li class="navLi">学员风采</li>
            </router-link>
            <li class="navLi">关于我们</li>
          </ul>
        </div>
        <div class="user">
          <span></span>
          <span>注册</span>
          <span>|</span>
          <span>登录</span>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view/>
    </div>
    <div class="footer">Copyright © 2018 apis.sh All Rights Reserved | 陕ICP备15013925号-3</div>
  </div>
</template>

<style scoped>
#app {
  font-size: 16px;
  font-weight: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: #222222;
}
a {
  color: #222222;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.header {
  width: 100%;
}
.content {
  width: 1180px;
  height: 68px;
  margin: 0 auto;
  border-bottom: 1px solid #5ecfba;
}
.content > .logo {
  display: inline-block;
  width: 100px;
  height: 68px;
}
.content > .nav {
  display: inline-block;
}
.content > .nav > ul {
  overflow: auto;
}
.navLi {
  height: 68px;
  float: left;
  padding: 0 16px;
  line-height: 68px;
  cursor: pointer;
}
.navLi:hover {
  color: #fff;
  background: #5ecfba;
  transition: 1s;
}

.content > .user {
  display: inline-block;
  height: 68px;
  float: right;
}
.content > .user::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.content > .user > span:first-child {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: url("./assets/user.jpg");
  vertical-align: middle;
  margin-right: 20px;
}
.content > .user > span {
  color: #8a8d93;
  font-size: 14px;
  vertical-align: middle;
}
.content > .user > span:nth-child(3) {
  font-size: 14px;
  margin: 0 10px 0 10px;
}
.main {
  background: #fafafa;
  padding: 10px 0;
  box-sizing: border-box;
}
.footer {
  height: 60px;
  line-height: 60px;
  font-size: 12px;
  text-align: center;
  background: #fafafa;
}
</style>

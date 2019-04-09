<template>
  <div class="details">
    <div class="top">
      <div class="left">
        <img src="../assets/course.jpg">
      </div>
      <div class="right">
        <p class="title">全程课程</p>
        <div class="message">
          <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
          <span class="price">￥293</span>
          <div class="desc">这是一个非常棒的视频。</div>
        </div>
        <div class="buy">
          <input type="button" value="立即购买">
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="nav">
          <span>课程介绍</span>
          <span>课程列表</span>
        </div>
        <div class="msg">
          <img src="../assets/1.jpg">
        </div>
      </div>
      <div class="content-right">
        <div class="teacher">
          <p class="teacher-top">
            <img src="../assets/user.jpg">
            <span class="teacher-name">张倩</span>
          </p>
          <div
            class="desc"
          >这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，</div>
        </div>
        <div class="teacher">
          <p class="teacher-top">
            <img src="../assets/user.jpg">
            <span class="teacher-name">张倩</span>
          </p>
          <div
            class="desc"
          >这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，</div>
        </div>
        <div class="teacher">
          <p class="teacher-top">
            <img src="../assets/user.jpg">
            <span class="teacher-name">张倩</span>
          </p>
          <div
            class="desc"
          >这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，这是一个非常棒的老师，</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.details {
  width: 100%;
  background: #e9e9e9;
  padding-top: 20px;
}
.top {
  width: 1180px;
  margin: auto;
  padding: 35px 50px;
  box-sizing: border-box;
  background: #fff;
}
.top::after {
  content: "";
  display: block;
  clear: both;
}
.top > .left > img {
  width: 498px;
  height: 285px;
  border: 1px solid #e9e9e9;
}
.top > .left {
  display: inline-block;
  float: left;
}
.top > .right {
  display: inline-block;
  padding-left: 30px;
}
.top > .right > .title {
  font-size: 22px;
}
.top > .right > .message {
  display: block;
  padding: 10px;
  width: 550px;
  box-sizing: border-box;
  background: #f6f6f6;
}
.top > .right > .message > .desc {
  padding-top: 20px;
  color: #4f4f4f;
  height: 100px;
}
.top > .right > .message > span:first-child {
  margin-right: 20px;
  color: #969696;
}
.top > .right > .message > .price {
  color: #ff6029;
}
.top > .right > .buy {
  margin-top: 18px;
}
.top > .right > .buy > input[type="button"] {
  background: #ff6029;
  width: 110px;
  height: 33px;
  color: #fff;
  border: none;
  border-radius: 5px;
}
.content {
  margin-top: 20px;
  width: 1180px;
  margin: 10px auto;
  padding-bottom: 20px;
}
.content::after {
  content: "";
  display: block;
  clear: both;
}
.content > .content-left {
  width: 800px;
  float: left;
  background: #fff;
}
.content > .content-left > .nav {
  background: #f5f5f5;
}

.content > .content-left > .nav > span {
  display: inline-block;
  padding: 5px 10px;
}
.content > .content-left > .msg {
  width: 750px;
  margin: auto;
}
.content > .content-right {
  display: inline-block;
  margin-left: 20px;
  width: 360px;
}
.content > .content-right > .teacher {
  padding: 14px 30px;
  background: #fff;

  margin-bottom: 10px;
}
.content > .content-right > .teacher > .teacher-top > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  vertical-align: middle;
}
.content > .content-right > .teacher > .teacher-top > .teacher-name {
  margin-left: 20px;
  font-size: 23px;
}
.content > .content-right > .teacher > .desc {
  height: 140px;
  border-top: 1px solid #ddd;
  font-size: 14px;
  color: #676767;
  padding: 20px 0;
  box-sizing: border-box;
}
</style>

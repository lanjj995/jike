<template>
  <div class="myset">
    <h1>个人设置</h1>
    <div class="myset-content">
      <div class="myhead">
        <div class="title">头像:</div>
        <div class="img">
          <img src="../assets/user.jpg" alt="头像">
        </div>
        <lable for="header">修改头像</lable>
        <input type="file" id="header">
      </div>
      <div class="myhead">
        <div class="title">昵称:</div>
        <div class="myname-content"></div>
        <span>编辑</span>
      </div>
      <div class="myhead"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.myset {
  color: #333;
}
.myset > h1 {
  font-size: 18px;
  font-weight: normal;
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;
}
.myset-content {
  padding-left: 75px;
}
.myhead {
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e9e9e9;
}
.myset-content > .myhead > .title {
  display: inline-block;
  width: 100px;
  height: 36px;
  line-height: 36px;
}
.myset-content > .myhead > .img {
  display: inline-block;
  padding: 5px;
  border: 1px solid #e9e9e9;
  vertical-align: top;
}
.myset-content > .myhead > .img > img {
  width: 100px;
  height: 100px;
}
.myset-content > .myhead > lable {
  display: inline-block;
  background: #5ecfba;
  padding: 5px 13px;
  border-radius: 5px;
  font-size: 14px;
  float: right;
}
.myset-content > .myhead > input[type="file"] {
  display: none;
}
</style>

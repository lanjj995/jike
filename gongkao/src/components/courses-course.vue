<template>
  <div class="courses-course">
    <div class="img">
      <img src="../assets/course.jpg">
      <div class="content"></div>
    </div>
    <div class="message">
      <span>讲师：</span>
      <span>大大</span>
      <span>￥378</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.courses-course {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.courses-course > .message > span {
  font-size: 12px;
  color: #666;
}
.courses-course > .message {
  width: 100%;
  line-height: 30px;
  padding: 10px 10px;
  box-sizing: border-box;
}

.courses-course > .message > span:last-child {
  display: inline-block;
  height: 30px;
  background: #f60;
  padding: 0 8px;
  color: #fff;
  box-sizing: border-box;
  float: right;
}
</style>

<template>
  <div class="course">
    <img src="../assets/course.jpg">
    <p class="title">2019年山西省考申论精讲班</p>
    <p class="message">
      <span>主讲：可可老师</span>
      <span>￥369.0</span>
    </p>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.course {
  display: inline-block;
  border: 1px solid #ddd;
  background: #fff;
  float: left;
  margin-bottom: 20px;
  margin-right: 20px;
  cursor: pointer;
}
.course:hover {
}
.course > .title {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
  padding: 0 10px 0 10px;
}
.course > .message {
  font-size: 14px;
  color: #333;
  margin: 10px 0;
  padding: 0 10px 0 10px;
}
.course > .message > span:first-child {
  color: #959595;
}

.course > .message > span:last-child {
  float: right;
  color: red;
}
</style>

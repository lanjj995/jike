<template>
  <div class="big-courses">
    <h3>
      <span></span>推荐课程
      <span>更多</span>
    </h3>
    <div class="content">
      <courseCom></courseCom>
      <courseCom></courseCom>
      <courseCom></courseCom>
      <courseCom style="margin-right:0;"></courseCom>
      <courseCom></courseCom>
      <courseCom></courseCom>
      <courseCom></courseCom>
      <courseCom style="margin-right:0;"></courseCom>
    </div>
  </div>
</template>
<script>
import courseCom from "../components/course";
export default {
  props: {
    title: String
  },
  components: {
    courseCom
  }
};
</script>
<style scoped>
.big-courses {
  width: 1180px;
  margin: auto;
}
.big-courses > h3 {
  margin-top: 10px;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
.big-courses > h3 > span:first-child {
  width: 0;
  height: 100%;
  border-left: 4px solid #5ecfba;
  margin-right: 20px;
}
.big-courses > h3 > span:last-child {
  display: inline-block;
  height: 100%;
  font-size: 14px;
  color: #ddd;
  font-weight: normal;
  font-family: 微软雅黑;
  float: right;
  margin-right: 20px;
  margin-top: 3px;
}

.big-courses > .content {
  font-size: 0;
}
.big-courses > .content::after {
  content: "";
  display: block;
  clear: both;
}
</style>

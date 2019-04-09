<template>
  <div class="index">
    <div class="banner"></div>
    <div class="courses">
      <coursesCom></coursesCom>
      <coursesCom></coursesCom>
      <div class="teachers">
        <h3>
          <span></span>金牌讲师
          <span>更多</span>
        </h3>
        <div class="content">
          <teacherCom></teacherCom>
          <teacherCom></teacherCom>
          <teacherCom></teacherCom>
          <teacherCom style="margin-right:0;"></teacherCom>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import coursesCom from "../components/bigCourse";
import teacherCom from "../components/teacher";

export default {
  components: {
    coursesCom,
    teacherCom
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 420px;
  background: url("../assets/banner1.jpg") 50% 50%;
}
.courses {
  width: 100%;
  margin: auto;
  padding: 30px 0;
  background: #fafafa;
}
.teachers {
  width: 1180px;
  margin: auto;
}
.teachers > h3 {
  margin-top: 10px;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
.teachers > h3 > span:first-child {
  width: 0;
  height: 100%;
  border-left: 4px solid #5ecfba;
  margin-right: 20px;
}
</style>

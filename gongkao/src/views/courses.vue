<template>
  <div class="courses">
    <div class="classify">
      <div class="classify-one">
        <div class="title">
          分类:
          <span>系统课程</span>
          <span>专项课程</span>
          <div class="search">
            <input type="search">
            <input type="button" value="搜索">
          </div>
        </div>
      </div>
      <div class="classify-one">
        <div class="title">
          类型:
          <span>全部</span>
          <span>申论</span>
          <span>行测</span>
          <span>面试</span>
          <span>事业单位</span>
          <span>其他</span>
        </div>
      </div>
      <div class="classfiy-one">
        <div class="title">
          收费模式:
          <span>全部</span>
          <span>免费</span>
          <span>收费</span>
        </div>
      </div>
      <div class="classfiy-one">
        <div class="title">
          排序方式:
          <span>综合排序</span>
          <span>最新发布</span>
          <span>最多报名</span>
          <span>最近开课</span>
        </div>
      </div>
    </div>
    <div class="content">
      <coursesCourseCom @click.native="goDetails"></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom style="margin-right:0;"></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
      <coursesCourseCom></coursesCourseCom>
    </div>
  </div>
</template>
<script>
import coursesCourseCom from "../components/courses-course";
export default {
  methods: {
    goDetails() {
      console.log(this.$router);
      this.$router.push("/details");
    }
  },
  components: {
    coursesCourseCom
  }
};
</script>
<style scoped>
.courses {
  width: 1180px;
  padding-top: 50px;
  margin: auto;
}
.classify {
  border: 1px solid #ddd;
  background: #fff;
  padding: 10px;
  margin: auto;
  box-sizing: border-box;
}
.title {
  height: 26px;
  font-size: 14px;
  font-weight: bold;
}
.title > span {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 5px;
  font-size: 14px;
  color: #666;
  font-weight: normal;
  margin: 0 10px;
  cursor: pointer;
}

.title > span:hover {
  background: #5ecfba;
  color: #fff;
}
.title > .search {
  display: inline-block;
  float: right;
}
.title > .search > input[type="search"] {
  width: 150px;
  height: 26px;
}
.title > .search > input[type="button"] {
  width: 80px;
  height: 28px;
  background: #5ecfba;
  border: none;
  color: #fff;
}
.courses > .content {
  width: 1180px;
  padding: 30px 0;
  margin: auto;
}
.courses > .content::after {
  content: "";
  display: block;
  clear: both;
}
</style>


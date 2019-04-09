<template>
  <div class="student">
    <img src="../assets/banner1.jpg" alt="学员">
    <p class="desc">2016年百知教育2016年百知教育2016年百知教育2016年百知教育2016年百知教育2016年百知教育</p>
  </div>
</template>
<script>
export default {
  props: {
    imgurl: String,
    desc: String
  }
};
</script>
<style>
.student {
  width: 320px;
  height: 300px;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #eee;
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.student > img {
  width: 318px;
  height: 234px;
}
.student > .desc {
  margin: 10px 0;
  padding: 0 10px;
  text-align: left;
  font-size: 14px;
  color: #999999;
}
</style>

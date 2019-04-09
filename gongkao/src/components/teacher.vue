<template>
  <div class="teacher">
    <img src="../assets/student.jpg">
    <p class="name">大大</p>
    <div class="desc">电商平台中有海量的非结构化文本数据，如商品描述、用户评论、用</div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.teacher {
  display: inline-block;
  width: 275px;
  text-align: center;
  border: 1px solid #ddd;
  background: #fff;
  margin-right: 20px;
}
.teacher > img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-top: 20px;
}
.teacher > .name {
  font-size: 16px;
  color: #333;
  margin: 10px 0 10px 0;
}
.teacher > .desc {
  color: #888;
  border-top: 1px solid #ddd;
  background: #fcfcfc;
  padding: 15px;
  font-size: 14px;
}
</style>

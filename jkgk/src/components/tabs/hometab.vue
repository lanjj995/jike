<template>
  <el-carousel indicator-position="outside" height="600px">
    <el-carousel-item v-for="item in banners" :key="item">
      <img :src="item">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import banner4 from "@/assets/banner4.jpg";
export default {
  data() {
    return {
      banners: [banner1, banner2, banner3, banner4]
    };
  }
};
</script>
style
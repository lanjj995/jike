<template>
  <div class="main">
    <headerCom style="background:#0074ff;color:#fff;" :color="'#ffffff'"></headerCom>
    <div class="content">
      <router-view></router-view>
    </div>
    <footerCom :style="{}"></footerCom>
  </div>
</template>

<script>
import headerCom from "../components/common/header";
import footerCom from "../components/common/footer";

export default {
  name: "home",
  components: {
    headerCom,
    footerCom
  },
  
};
</script>

<style>
.content {
  position: relative;
}
</style>


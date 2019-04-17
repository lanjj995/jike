<template>
  <div class="main">
    <headerCom></headerCom>
    <div class="content">
      <router-view></router-view>
    </div>
    <footerCom></footerCom>
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
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 860px;
  background: url("../assets/bg_sign.png");
  position: relative;
}
</style>


<template>
  <div class="main">
    <headerComponent style="background:#0074ff;color:#fff;" :color="'#ffffff'"></headerComponent>
    <div class="content">
      <router-view/>
    </div>
    <footerComponent class="footer"></footerComponent>
  </div>
</template>
<script>
import headerComponent from "../components/common/header";
import footerComponent from "../components/common/footer";
export default {
  components: {
    headerComponent,
    footerComponent,
  },

};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  position: relative;
}
.content {
  padding: 50px 0 50px 0;
}
.form {
  width: 1032px;
  height: 566px;
  background: #ffffff;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.11);
  margin: auto;
}
.footer {
  position: absolute;
  bottom: 0;
}
</style>

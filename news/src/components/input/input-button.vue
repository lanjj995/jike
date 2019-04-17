<template>
  <input type="button" class="button">
</template>
<script>
export default {
  computed: {}
};
</script>
<style>
.button {
  height: 56px;
  outline: none;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
}
input[type="button"]:disabled {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: not-allowed;
}
</style>
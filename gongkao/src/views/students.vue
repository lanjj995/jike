<template>
  <div class="students-content">
    <student></student>
    <student></student>
    <student></student>
    <student></student>
    <student></student>
    <student></student>
    <student></student>
    <student></student>
  </div>
</template>
<script>
import student from "../components/student";
export default {
  components: {
    student
  }
};
</script>
<style scoped>
.students-content {
  width: 1026px;
  margin: auto;
  padding-top: 20px;
}
.students-content::after {
  content: "";
  display: block;
  clear: both;
}
</style>

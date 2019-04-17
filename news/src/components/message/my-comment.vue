<template>
  <div class="mycomment">
    <div v-if="comments.length===0">暂时没有评论</div>
    <commentItem :comments="comments"></commentItem>
  </div>
</template>
<script>

import commentItem from "./comment-item.vue";
import {userComments} from "@/api/account.js";
export default {
  components:{  
    commentItem
  },
  data() {
    return {
        comments:[],
        page:1,
        limit:10
    }
  },
  methods:{
    getMyCommentList(){
      userComments(this.$store.state.user.token,this.page,this.limit).then(res => {
          console.log(res);
        if(res.data.code === "success") {
          this.comments = res.data.data.comments;
          console.log(this.comments);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {

      });
    }
  },
  created(){
    this.getMyCommentList();
    
  }
};
</script>
<style scoped>
.mycomment{
  min-height: 480px;
}
</style>

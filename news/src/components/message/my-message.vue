<template>
  <div class="mycomment"> 
    <div v-if="messages.length===0">暂时没有消息</div>
    <div class="comment-item" v-for="message in messages" :key="message.commentId">
      <div class="comment-item-left">
        <div class="yidu"></div>
      </div>
      <div class="comment-item-right">
        <div class="comment-item-head">
          <span>{{message.user.nickname}}回复你</span>
          <span>{{message.create_time | getTime}}</span>
        </div>
        <div class="content">
          <p class="comment-content" style="">{{message.content}}</p>
        </div>
        <p class="commentform" @click="goDetails(message.articleId._id)">{{message.articleId.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { messageList,messageCheck } from "@/api/account.js";
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      messages: []
    };
  },
  methods: {
    getMyMessageList(token, page, limit) {
      messageList(token, page, limit)
        .then(res => {
          if (res.data.code === "success") {
            this.messages = res.data.data.comments;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },
    goDetails(id) {
       this.$router.push({name:'details',params:{id}});
    }
  },
  filters: {
    getTime(value) {
      let create_time = new Date(value);
      let now = new Date();
      let cha = now.getTime - create_time;

      function isless10(value) {
        if (value >= 10) {
          return value;
        } else {
          return "0" + value;
        }
      }
      let year = create_time.getFullYear();
      let month = create_time.getMonth() + 1;
      let day = create_time.getDate();
      let hour = create_time.getHours();
      let minute = create_time.getMinutes();
      return (
        year +
        "-" +
        isless10(month) +
        "-" +
        isless10(day) +
        " " +
        isless10(hour) +
        ":" +
        isless10(minute)
      );
    }
  },
  created() {
    this.getMyMessageList(this.$store.state.user.token, this.page, this.limit);
  }
};
</script>
<style scoped>
.mycomment{
  min-height: 480px;
}
.comment-item {
  border-bottom: 1px solid #dcdcdc;
  position: relative;
  margin-bottom: 20px;
}

.comment-item-left{
  width:30px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  top: -8px;
}
.comment-item-left::after{
  content: "";
  width: 0;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.comment-item-right{
  margin-left: 30px;
}
.comment-item-head > span:last-child {
  float: right;
  margin-left: 20px;
}
.comment-item > div,
.commentform {
  font-size: 14px;
  color: #6f6f6f;
}
.commentform {

  cursor: pointer;
}
.comment-content {
  color: #333;
}
.yidu{
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background:#FF8000;
  vertical-align: middle;
}

</style>

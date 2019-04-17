<template>
  <div>
    <div class="comment-item" v-for="comment in comments" :key="comment.commentId">
      <div class="time">{{comment.create_time | getTime}}</div>
      <div class="content">
        <p>
          <span class="comment-content">{{comment.content}}</span>
          <span>
            <img src="@/assets/icon_comment.png">
          </span>
          <span>
            <img :src="isup">
            {{comment.vote}}
          </span>
          <span>
            <img :src="isdown">
            {{comment.against}}
          </span>
        </p>
        <p class="gailou">
          <span>盖楼被隐藏</span>
          <span>
            {{!(isShow.indexOf(comment.commentId)===-1)?'折叠':'展开'}}
            <img :src="!(isShow.indexOf(comment.commentId)===-1)===-1?arrowUp:arrowDown" alt @click="getcomments_level(comment.commentId)">
          </span>
        </p>
        <div class="body" v-if="!(isShow.indexOf(comment.commentId)===-1)">
          <comment
            :flag="'sss'"
            :commentList="commentList"
            :commentIds="commentIds"
            :level="commentIds.split(',').length"
          ></comment>
        </div>
      </div>
      <p class="commentform" @click="goDetails(comment.articleId._id)">{{comment.articleId.title}}</p>
    </div>
  </div>
</template>
<script>
import up from "@/assets/icon_thumb_up.png";
import upActive from "@/assets/icon_thumb_up_active.png";
import down from "@/assets/icon_thumb_down.png";
import downActive from "@/assets/icon_thumb_down_active.png";
import comment from "@/components/new/comment.vue";
import arrowDown from "@/assets/icon_arrow_down_color.png";
import arrowUp from "@/assets/icon_arrow_up_color.png";
import { comments_level } from "@/api/account.js";
export default {
  props: ["comments"],
  data() {
    return {
      isShow: [],
      arrowDown,
      arrowUp,
      isup: up,
      isdown: up,
      commentList: {},
      commentIds: ""
    };
  },
  components: {
    comment
  },
  methods: {
    getcomments_level(commentId) {
      comments_level(commentId)
        .then(res => {
          if (res.data.code === "success") {
            this.commentList = res.data.data.comments;
            this.commentIds = res.data.data.commentIds;
            let index = this.isShow.indexOf(commentId);
            if (index===-1) {
                this.isShow.push(commentId);
                console.log(this.isShow);
            }  else {
                this.isShow.splice(index,1);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
        });
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
  created(){
    console.log(this.comments);
  }
};
</script>
<style>
.comment-item {
  border-bottom: 1px solid #dcdcdc;
  margin-bottom: 20px;
}
.comment-item > .content > p > span:not(:first-child) {
  float: right;
  margin-left: 20px;
}
.comment-item > .content > p > span:not(:first-child) > img {
  vertical-align: middle;
  margin-right: 5px;
}
.commentform {
  cursor: pointer;
}
.gailou > span:nth-child(2) {
  color: #ff8000;
}
.gailou > span:nth-child(2) > img {
  margin-left: 10px;
  cursor: pointer;
}
.comment-item > div,
.commentform {
  font-size: 14px;
  color: #6f6f6f;
}
.comment-content {
  color: #333;
}
</style>

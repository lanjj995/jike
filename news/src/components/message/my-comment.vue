<template>
  <div class="mycomment">
    <div class="none">
      {{none}}
    </div>
    <div v-if="comments.length!=0">
      <commentItem :comments="comments"></commentItem>
    </div>
  </div>
</template>
<script>
import commentItem from "./comment-item.vue";
import { userComments, userCommentslevel } from "@/api/account.js";
import { Promise } from "q";
export default {
  components: {
    commentItem
  },
  data() {
    return {
      comments: [],
      page: 1,
      limit: 10,
      none:""
    };
  },
  methods: {
    // 获取我的评论列表
    getMyCommentList() {
      userComments(this.$store.state.token, this.page, this.limit)
        .then(res => {
          if (res.data.code === "success") {
            let comments = res.data.data.comments;
            if (comments.length === 0) {
              this.none = "您还没有评论";
            }
            let arr = [];
            for (let index in comments) {
              let p1 = new Promise(function(resolve, reject) {
                userCommentslevel(comments[index].commentId)
                  .then(res => {
                    resolve(res.data.data);

                    // if (res.data.data.commentIds.split(",").length === 1) {
                    //   comments[index]['data'] = '';

                    // } else {
                    //   comments[index]['data'] = res.data.data;
                    // }
                  })
                  .catch(err => {
                    // 错误处理
                    reject(err);

                    console.log(err);
                  });

              });
              arr.push(p1);
            }
            
            Promise.all(arr).then(res => {
              for (let index in res) {
                if (res[index].commentIds.split(",").length === 1) {
                  comments[index]['data'] = '';
                } else {
                  comments[index]['data'] = res[index];
                }
              }
              this.comments = comments;
            }).catch(err => {
              console.log(err);
            })
          } else {
            this.$alert("提示信息", "您的身份已经过期，请重新登陆!", {
              comfirmButtomText: "去登陆",
              callback: action => {
                this.$router.push("/user/login");
              }
            });
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
          this.$router.push("/404");
        });
    }
  },
  created() {
    // 获取评论列表
    this.getMyCommentList();
  }
};
</script>
<style scoped>
.none{
  text-align: center;
  font-size: 30px;
}
.mycomment {
  min-height: 480px;
}
</style>

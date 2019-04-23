<template>
  <div class="mycomment"> 
    <div class="biaojiyidu" v-show="this.$route.path.indexOf('/mymessage')!=-1">
        <span @click="biaojiAll">

        <img src="@/assets/icon_sign.png"  >
        全部标记为已读
        </span>
      </div>
      <div class="none">{{none}}</div>
    <div class="comment-item" v-for="message in messages" :key="message.commentId">
      <div class="comment-item-left">
        <div class="yidu" v-show="!message.isRead"></div>
      </div>
      <div class="comment-item-right">
        <div class="comment-item-head">
          <span>{{message.user.nickname}}回复你</span>
          <span>{{message.create_time | getTime}}</span>
        </div>
        <div class="content">
          <p class="comment-content" :style="{color:!message.isRead?'#333':'#6f6f6f'}">{{message.content}}</p>
        </div>
        <p class="commentform" @click="goDetails(message.isRead,message.commentId,message.articleId._id)">{{message.articleId.title}}</p>
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
      messages: [],
      none:""
    };
  },
  methods: {
    getMyMessageList(token, page, limit) {
      messageList(token, page, limit)
        .then(res => {
          if (res.data.code === "success") {
            this.messages = res.data.data.commnets;
             if ( this.messages.length === 0) {
              this.none = "您还没有消息";
            }
            this.messages.sort(function(a,b) {
              if (a.isRead==b.isRead) return 0;
              if (a.isRead<b.isRead) return -1;
              if (a.isRead>b.isRead) return 1;
            })
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },
    // 全部标记
    biaojiAll(){
      messageCheck(null,this.$store.state.user.token).then(res=> {
        if (res.data.code === "success") {
          this.$message({
            type:'success',
            message:'消息已读'
          });
          for (let index in this.messages) {
            let s = this.messages[index];
            s.isRead = true;
            this.$set(this.messages,index,s);
          }
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        // 错误处理
      });
    },
    goDetails(isRead,commentId,id) {
      if (!isRead) {
 messageCheck(commentId,this.$store.state.user.token).then(res => {
         if (res.data.code === "success") {
           this.$message({
             code:'success',
             message:'消息已读'
           });
       this.$router.push({name:'details',params:{id}});

         } else {
           if (res.data.code === "account_token_invalid") {
                  this.$alert("消息提示", res.data.message, {
                    comfirmButtonText: "确认",
                    callback: action => {
                      this.$router.push("/user/login");
                    }
                  });
                } else {
                  this.$message.error(res.data.message);
                }
         }
       }).catch(err => {
         // 错误处理
       });
      } else {
       this.$router.push({name:'details',params:{id}});

      }
      
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
.none{
  text-align: center;
  font-size: 30px;
}
.mycomment{
  min-height: 480px;
  position: relative;
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
.biaojiyidu{
  width: 100%;
  margin:auto;
  overflow: auto;
  margin-bottom :10px;
  position: absolute;
  top: -50px;
}
.biaojiyidu > span{
  cursor: pointer;
  float: right;
}
</style>

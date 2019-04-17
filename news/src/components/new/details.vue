<template>
  <div class="details">
    <div class="comment-msg">
      <ul>
        <li>
          <img src="@/assets/icon_comment_color.png" alt> {{news.comment_sum}}
        </li>
        <li>
          <img src="@/assets/icon_saw_color.png" alt> {{news.comment_sum}}
        </li>
        <li class="fenxiangLi">
          <img src="@/assets/icon_share.png" @click="isImg = !isImg" >
          <img src="@/assets/fenxiang.png" class="fenxiang" v-show="isImg">
        </li>
      </ul>
    </div>
    <div class="news-details">
      <div class="title">{{news.title}}</div>
      <div class="message">
        <span>{{news.source}}</span>
        <span>{{news.create_time | getTime}}</span>
      </div>
      <div class="detials-img">
        <img src="@/assets/new.png" alt="图片" class="details-image">
      </div>
      <div class="content" v-html="news.details">
        <!-- <p>介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴介夫子消息，12月25日滴滴</p> -->
      </div>
      <div class="publish-comment">
        <h2>新闻点评</h2>
        <textarea rows="1" class="comment-texerea" placeholder="我有话要说...." v-model="commentcontent"></textarea>
        <inputButton
          style="width:110px;height:36px;background:#FF8000;color:#FFFFFF;float:right;margin-top:10px;"
          :value="this.$store.state.user.token?'评论':'登陆评论'"
          @click.native="comment()"
        ></inputButton>
      </div>
      <div class="new-comment">
        <h2>最近评论</h2>
        <div class="body" v-for="commentIds in commentIdsList" :key="commentIds">
          <comment :commentList="commentList" :commentIds="commentIds" :level="commentIds.split(',').length"></comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import inputButton from "../input/input-button";
import comment from "./comment";
import {details,comment_list,addcomment} from "@/api/new.js"
export default {
  data(){
    return {
      news:{},
      imgUrl:"",
      id:"",
      page:1,
      limit:10,
      commentList:{},
      commentIdsList:[],
      commentcontent:'',
      isImg:false,
    }
  },
  filters:{
     getTime(value){
      let create_time = new Date(value);
      let now = new Date();
      let cha = now.getTime - create_time;
      if (cha < 43200000) {
        if (cha < 3600000) {
          return cha/60000+"分钟前";
        } else {
          return cha/3600000+"小时前";
        }
      } else {
        function isless10(value) {
          if (value > 10) {
            return value;
          } else {
            return "0"+value;
          }
        }
        let month = create_time.getMonth()+1;
        let day = create_time.getDate();
        return isless10(month) + "月" + isless10(day) + "日";
      }
    }
  },
  methods:{
    // 获取评论列表
    getcomment_list(id,page,limit){
      comment_list(id,page,limit).then(res => {
        if (res.data.code === "success") {
          this.commentList = res.data.data.comments;
          this.commentIdsList = res.data.data.commentIds;
        } else {
            this.$message.error(res.data.message);
        }
      }).catch(err => {
        // 错误处理
      });
    },
    // 获取文章详情
    getdetails(id){
      details(id).then(res => {
      if (res.data.code === "success") {
        this.news = res.data.data.news;
        this.imgUrl = require("@/assets/new.png");
      } else {
            this.$message.error(res.data.message);

      }
    }).catch(err => {
      // 错误处理
    })
    },
    // 评论
    comment(){
      if (this.$store.state.user.token) {
        if (!this.commentcontent) {
            this.$message({
              type:'warning',
              message:"请输入评论内容"
            })
        } else {
      addcomment(this.id,null,this.commentcontent,this.$store.state.user.token).then(res => {
        if (res.data.code === "success") {
          this.$message(
            {
              message:"评论成功",
              type:"success"
            }
          );
          // 添加评论
        } else {
            this.$message.error(res.data.message);
        }
      }).catch(err => {
        // 处理错误
      });
        }
 
      } else{
        this.$router.push("/user/login");
      }
     
    }
  },
  components: {
    inputButton,
    comment,
  },
  created(){
    this.id = this.$route.params.id;
    this.getdetails(this.id);
    this.getcomment_list(this.id,this.page,this.limit);
  
  },
  mounted(){
    window.onscroll = function(){}
  }
};
</script>
<style scoped>
.details {
  width: 100%;
}
.comment-msg {
  position: absolute;
  top: 66px;
  left: 80px;
  font-size: 14px;
color: #9B9B9B;
}
.comment-msg > ul > li {
  height: 30px;
  width: 134px;
  padding: 10px 0 10px 0;
}
.comment-msg > ul > li:nth-child(2) {
  border-bottom: 1px solid #dcdcdc;
}
.comment-msg > ul > li > img {
  margin-right: 10px;
  vertical-align: middle;
}
.news-details {
  width: 858px;
  margin: auto;
}
.title {
  font-size: 26px;
  color: #333333;
  padding: 20px 0 20px 0;
}
.message {
  padding-bottom: 20px;
  font-size: 14px;
}
.message > span:first-child {
  color: #333333;
  margin-right: 20px;
}
.message > span:last-child {
  color: #9b9b9b;
}
.detials-img {
  width: 655px;
  height: 337px;
  margin: auto;
}
.details-image {
  width: 100%;
  height: 100%;
}
.content {
  padding: 10px 0 30px 0;
}
.content > p {
  font-size: 16px;
  color: #333333;
}
.publish-comment {
  border-top: 1px solid #dcdcdc;
  padding: 20px 0 20px 0;
}
.publish-comment::after {
  content: "";
  display: block;
  clear: both;
}
.publish-comment > h2,
.new-comment > h2 {
  font-size: 16px;
  color: #6f6f6f;
  font-weight: 0;
  font-family: MicrosoftYaHei;
}
.new-comment > h2 {
  margin: 0;
}
.new-comment > h2 {
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 20px;
}
.comment-texerea {
  width: 100%;
  border: 1px solid #979797;
  border-radius: 4px;
  resize: none;
  font-size: 16px;
  padding: 10px 20px;
  box-sizing: border-box;
}
.commentTocomment {
  width: 85%;
  background: #f3f3f3;
  padding: 20px;
  box-sizing: border-box;
}
.body{
   padding: 30px 10px 30px 10px;
  border-bottom: 1px solid #dcdcdc;
  overflow: auto;
}
::-webkit-input-placeholder {
  color: #9b9b9b;
  font-size: 16px;
  font-family: MicrosoftYaHei;
}

::-moz-placeholder {
  color: #9b9b9b;
  font-size: 16px;
  font-family: MicrosoftYaHei;
}

:-ms-input-placeholder {
  color: #9b9b9b;
  font-size: 16px;
  font-family: MicrosoftYaHei;
}
.fenxiangLi{
  position: relative;
}
.fenxiang {
  position: absolute;
      top: 12px;
    right: -25px;
    border:1px solid #ddd;
}
</style>

<template>
  <div class="article" >
    <div class="msg">
      <div class="title" :title="item.title">{{item.title | titleFilter}}</div>
      <div class="message">
        <div class="message-left">
          <span v-for="i in item.keywords" :key="i">{{i}}</span>
        </div>
        <div class="message-right">
          <span>
            <img :src="commentUrl" style="vertical-align:middle;"> {{item.comment_sum}}
          </span>
          <span>
            <img :src="sawUrl" style="vertical-align:middle;"> {{item.comment_sum}}
          </span>
        </div>
      </div>
      <img src="@/assets/new.png" class="articleImg" @click="goDetails(''+ item._id +'')">
      <div class="time">
        <p>{{item.create_time | getTime}}</p>
        <p :title="item.source">{{item.source | sourcefilter}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    item:Object
  },
  data(){
    return {
      commentUrl:"",
      sawUrl:""
    }
  },
  methods:{
    goDetails(id){
      this.$router.push({name:'details',params:{id}});
    }
  },
  filters:{
    titleFilter(value) {
        return value.length>23?value.substring(0,23)+"...":value;
    },
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
    },
    sourcefilter(value){
      if (value.length > 5) {
          return value.substring(0,5)+"...";
      } else {
        return value;
      }
    }
  },
  created(){
    this.commentUrl = require("@/assets/icon_comment.png");
    this.sawUrl = require("@/assets/icon_saw.png");
    }
};
</script>
<style scoped>
.article {
  background: #fff;
  width: 726px;
  height: 300px;
  margin-top: 50px;
  position: relative;
}
.article> .msg {
  width: 80%;
  float: right;
}
.msg > .title {
  font-size: 24px;
  color: #333333;
  padding: 20px 0 10px 0;
}
.message {
  width: 80%;
  font-size: 14px;
  color: #9b9b9b;
  padding-bottom: 10px;
}
.message-left {
  display: inline-block;
  float: left;
}
.message-left > span {
  margin-right: 20px;
}
.message-right {
  float: right;
}
.message-right > span {
  margin-left: 20px;
}
.message::after {
  content: "";
  display: block;
  clear: both;
}
.articleImg {
  width: 418.6px;
  height: 184.6px;
}
.time {
  width: 140px;
  height: 78px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  font-size: 24px;
  color: #9b9b9b;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  top: -24px;
  left: -30px;
}
.time > p {
  margin: 0;
  padding: 0;
  text-align: center;
}
.time > p:last-child {
  text-align: left;
  padding-top: 4px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>

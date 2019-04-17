<template>
  <div class="main">
    <headerCom class="accountHeader" :color="'#ffffff'"></headerCom>
    <div class="content">
      <div class="header">
        <img src="../assets/header.png">
      </div>
      <div class="biaojiyidu" v-show="this.$route.path.indexOf('/mymessage')!=-1">
        <span>

        <img src="@/assets/icon_sign.png"  >
        全部标记为已读
        </span>
      </div>
      <div class="account-content">
        <div class="nav">
          <ul>
            <router-link to="/message">
            
            <li :class="{active:this.$route.path.indexOf('mymessage')===-1?true:false}">我的评论</li>
            </router-link>
            <router-link to="/message/mymessage">
            <li :class="{active:this.$route.path.indexOf('mymessage')===-1?false:true}">我的消息({{count}})</li>
            </router-link>
          </ul>
        </div>
        <div class="account-content-right">

        <router-view></router-view>
        </div>
      </div>
    </div>
    <footerCom></footerCom>
  </div>
</template>

<script>
import headerCom from "../components/common/header";
import footerCom from "../components/common/footer";
import {messageCount} from "@/api/account.js";
export default {
  data() {
    return {
      count:0
    };
  },
  components: {
    headerCom,
    footerCom
  },
  methods:{
    getMessageCount(){
      messageCount(token).then(res => {
        if (res.data.code === "success") {
          this.count = res.data.count;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        // 错误处理
      })
    }
  },
  created(){
    this.getMessageCount(this.$store.state.user.token);
  }
};
</script>

<style scoped>
.accountHeader {
  height: 334px;
  color: #fff;
  background: url("../assets/bg_my.png");
}
.content {
  background: #f9f9f9;
  position: relative;
  padding-bottom: 30px;
}
.content > .header {
  width: 127px;
  height: 127px;
  border-radius: 50%;
  position: relative;
  margin: auto;
}
.content > .header > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: -64px;
}

.account-content {
  width: 1046px;
  margin: auto;
  position: relative;
}
.nav {
  background: #ffffff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.12);
  display: inline-block;
  position: absolute;
  top: 0px;
  color: #333333;

}
a{
  color: #333;
}
.nav ul li {
  width: 134px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0 20px 0;
  cursor: pointer;
}
.account-content-right{
  width: 896px;
  display: inline-block;
  margin-left: 150px;
  background: #fff;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;
}

.active {
  border-left: 4px solid #ff8000;
  color: #ff8000;
}
.biaojiyidu{
  width: 1046px;
  margin:auto;
  overflow: auto;
  margin-bottom :10px;
}
.biaojiyidu > span{
  float:right;
  cursor: pointer;
}
</style>


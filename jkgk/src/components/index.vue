<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header class="header_one">
        <headerCom></headerCom>
    </el-header>
    <el-main>
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <menuCom :menus="menus" @addTab="addTabMethod"></menuCom>
        </el-aside>

        <el-container>
          <el-header class="tabheader" height="30px">
            <el-button size="mini" v-for="t in tabs" :key="t.index" @click="goRouter(t.index,t.router)">{{t.title}}<i class="el-icon-close" @click="closeTab(t.index)"></i></el-button>
          </el-header>
          <div class="main">

          <router-view/>
          </div>
        </el-container>
      </el-container>
    </el-main>
    <el-footer>陕西省即刻公考版权所有</el-footer>
  </el-container>
</template>
<script>
import menuCom from "./common/menu";
import headerCom from "./common/header";
import { getmenu } from "../api/menu";
export default {
  components: {
    menuCom,
    headerCom
  },
  data() {
    return {
      menus: [],
      
      tabs:[
        {
          title:'home',
          index:0,
          router:'home'
        }
      ]
    };
  },
  methods: {
    getMenuMethod() {
      getmenu()
        .then(res => {
          if (res.data.code === "success") {
            this.menus = res.data.data;
          }
        })
        .catch(err => {
          // 错误
        });
    },
    addTabMethod(value){
      var length = this.tabs.length;
      this.tabs.push({
        title:value.title,
        router:value.router,
        index:length
      })
    },
    goRouter(index,router) {
      this.$router.push({name:router});
    },
    closeTab(index,router) {
      console.log(index,router);
      console.log(this.tabs.splice(index,1));
      console.log(this.tabs);
      this.$router.push({name:this.tabs[index-1]['router']});
    }
  },
  created() {
    this.getMenuMethod();
    this.$router.push({name:'home'});
  },
};
</script>


<style>
.main{
box-sizing: border-box;
min-height: 500px;}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.header_one {
  text-align: right;
}
.header_one > span:first-child {
  float: left;
}
.el-main {
  padding: 0;
}
.el-aside {
  color: #333;
}
.el-tabs {
  width: 100%;
}
.el-tabs__content {
  height: auto;
}
.el-carousel__item>img {
  width: 100%;
  height: 100%;
}
.tabheader{
  line-height: 30px;
  text-align: left;
  padding: 0;
}
.tabheader > .el-icon-close{
  float: right;
}
.el-icon-close {
  float: right;
}
.active{
  background: #f00;
}
</style>


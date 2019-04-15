<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header class="header_one">
      <span>即刻公考后台管理系统</span>

      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-main>
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <menuCom :menus="menus"></menuCom>
        </el-aside>

        <el-container>
          <el-header class="tabheader" height="30px">
            <el-button size="mini" v-for="t in tabs" :key="t.index">{{t.title}}<i class="el-icon-close"></i></el-button>
          </el-header>
          <router-view/>
        </el-container>
      </el-container>
    </el-main>
    <el-footer>陕西省即刻公考版权所有</el-footer>
  </el-container>
</template>
<script>
import menuCom from "./common/menu";
import { getmenu } from "../api/menu";
export default {
  components: {
    menuCom,
  },
  data() {
    return {
      menus: [],
      
      tabs:[
        {
          title:'home',
          index:0
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
    addtab(title){
      var length = this.tabs.length;
      this.tabs.push({
        title:title,
        index:length
      })
    }
  },
  created() {
    this.getMenuMethod();
  }
};
</script>


<style>
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

</style>


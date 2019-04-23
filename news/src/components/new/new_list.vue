<template>
  <div class="news">
    <div class="input-search">
      <input
        list="searchs"
        type="text"
        placeholder="大家都在搜索：张继科"
        @focus="gethotNews_list"
        v-model="search"
      >
      <datalist id="searchs">
        <option v-for="(hotnew,index) in hotnews" :key="index">
          <span style="display:inline-block;color:#f00;margin-right:5px;">{{index+1}}.</span>
          {{hotnew.title}}
        </option>
      </datalist>
      <div @click="getSearchList">
        <canvas id="myCanvas" width="100" height="48"></canvas>
      </div>
    </div>
    <div class="nav" :style="{top:top+'px'}">
      <ul>
        <li
          @click="getnewlist('yaowen',page,limit)"
          :class="{active:isActive=='yaowen'?true:false}"
        >要闻</li>
        <li
          @click="getnewlist('shehui',page,limit)"
          :class="{active:isActive=='shehui'?true:false}"
        >社会</li>
        <li @click="getnewlist('ent',page,limit)" :class="{active:isActive=='ent'?true:false}">军事</li>
        <li @click="getnewlist('tech',page,limit)" :class="{active:isActive=='tech'?true:false}">科技</li>
        <li @click="getnewlist('war',page,limit)" :class="{active:isActive=='war'?true:false}">娱乐</li>
      </ul>
    </div>

    <div class="new_articles">
      <div class="none">
      {{none}}
      </div>
      <div is="newComponent" v-for="(item,index) in news" :key="index" :item="item"></div>
      <div class="loading" v-if="isloading && news.length!=0">
          <el-button  :loading="true">加载中</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import newComponent from "./article";
import { new_getnewList, hotNews_list, searchList } from "@/api/new.js";
export default {
  data() {
    return {
      keyList: ["yaowen", "shehui", "ent", "tech", "war"],
      isActive: "yaowen",
      count: 0,
      news: [],
      hotnews: [],
      page: 1,
      page2: 1,
      limit: 10,
      top: 186,
      search: "",
      isloading:true,
      none:""
    };
  },
  methods: {
    getSearchList() {
      // 搜索热词
      if (!this.search) {
        this.$message.error("请输入您想要搜索的关键词");
        return;
      } else {
        this.isActive = this.search;
        this.page=1;
        this.page2=1;
        this.news=[];
        this.getnewlist(this.isActive, this.page, this.limit);
      }
    },
    getnewlist(channelname) {
      if (this.isActive != channelname) {
        this.isActive = channelname;
        this.page=1;
        this.page2=1;
        this.news=[];
      }
      if (this.page === this.page2) {
        this.page2 += 1;
        if (this.keyList.indexOf(channelname) === -1) {
          searchList(channelname,  this.page, this.limit)
            .then(res => {
              if (res.data.code === "success") {
                this.news = this.news.concat(res.data.data.news);
                console.log(this.news.length);
                if (this.news.length===0)
                  this.none = "没有相关文章";
                this.count = res.data.data.counts;
                this.page += 1;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              // 错误处理

              console.log(err);

            });
        } else {
          new_getnewList(channelname, this.page, this.limit)
            .then(res => {
              if (res.data.code === "success") {
                this.news = this.news.concat(res.data.data.news);
                this.count = res.data.data.counts;
                this.page += 1;
                if (this.news.length===0)
                  this.none = "没有相关文章";
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              // 错误处理
              console.log(err);

        // this.$router.push("/404");

            });
        }
      }
    },
    gethotNews_list() {
      hotNews_list()
        .then(res => {
          if (res.data.code === "success") {
            this.hotnews = res.data.data.news;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
          console.log(err);
        // this.$router.push("/404");

        });
    }
  },
  components: {
    newComponent
  },
  watch: {
   
  },
  created() {
    this.getnewlist(this.isActive,this.page,this.limit);
  },

  mounted() {
    var myCanvas = document.getElementById("myCanvas");
    var context = myCanvas.getContext("2d");
    context.arc(65, 0, 60, 0, Math.PI * 2, true);
    context.fillStyle = "#FF8000";
    context.fill();
    var img = new Image();
    img.onload = function() {
      context.drawImage(img, 45, 10, 28, 28);
    };
    img.src = require("@/assets/icon_ search.png");
    window.onscroll = () => {
      // 导航
      this.top = 187 + document.documentElement.scrollTop;

      let arr = document.querySelectorAll(".article");
      let last = arr[arr.length - 1];
      if (!last)
      return ;
      if (
        last.offsetTop -
          document.documentElement.scrollTop +
          last.clientHeight <
        document.documentElement.clientHeight
      ) {
        if (arr.length < this.count) {
          this.getnewlist(this.isActive, this.page, this.limit);
        } else {
          this.isloading = false;
        }
      }
    };
  }
};
</script>
<style scoped>
.none{
  text-align: center;
  font-size: 30px;
}
.news {
  background: #f9f9f9;
  padding: 50px 0 30px 0;
}

.active {
  border-left: 4px solid #ff8000;
  color: #ff8000;
}
.new_articles {
  width: 726px;
  margin: 70px auto 20px;
  min-height: 600px;
}
.nav {
  background: #ffffff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.12);
  display: inline-block;
  position: absolute;
  left: 130px;
  top: 186px;
}

.nav ul li {
  width: 134px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0 20px 0;
  cursor: pointer;
  box-sizing: border-box;
}

.input-search {
  width: 520px;
  height: 48px;
  position: relative;
  margin: auto;
}
input[type="text"] {
  position: absolute;
  width: 520px;
  height: 48px;
  padding-left: 20px;
  box-sizing: border-box;
  border: 1px solid #ff8000;
  font-size: 14px;
  color: #333;
}
#searchs {
  width: 520px;
  font-size: 14px;
}
.input::-webkit-input-placeholder {
  color: #9b9b9b;
}
.input::-moz-placeholder {
  color: #9b9b9b;
}
.input:-ms-input-placeholder {
  color: #9b9b9b;
}
#myCanvas {
  position: absolute;
  right: 0;
}
.hotnews0 {
  color: #ff0000;
  margin-right: 5px;
}
.hotnews1 {
  color: #ff6300;
  margin-right: 5px;
}
.hotnews2 {
  color: #ff8200;
  margin-right: 5px;
}
.hotnews3 {
  margin-right: 5px;
  color: #9b9b9b;
}
.hotnews4 {
  margin-right: 5px;
  color: #9b9b9b;
}
</style>

<template>
  <div>
    <el-table :data="banners" style="width:100%" fi border highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="banner">
          <img :src="'http://localhost:3000'+banner.row.imgPath" class="banner">
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="100"></el-table-column>
      <el-table-column prop="imgPath" label="图片路径" width="180"></el-table-column>
      <el-table-column prop="descreption" label="描述" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="50">
        <template slot-scope="banner">{{banner.row.status | getShowStatus}}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="banner">{{banner.row.createDate | getTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button title="详情" type="info" icon="el-icon-message" size="mini" circle></el-button>
          <el-button
            title="修改"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="openUpdateDialog(scope.row)"
          ></el-button>
          <el-button
            title="删除"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteBanner(scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form :model="banner" label-position="right" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="banner.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="banner.descreption" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio v-model="banner.status" label="1">显示</el-radio>
          <el-radio v-model="banner.status" label="0">不显示</el-radio>
        </el-form-item>

        <el-form-item label="创建时间">
         
        </el-form-item>
        <el-form-item label="图片">
            <el-upload action="http://localhost:3000/banner/motify">
                <el-button>点击上传文件</el-button>
            </el-upload>
        </el-form-item>
        
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { bannerList, bannerDelete } from "@/api/banner.js";
export default {
  data() {
    return {
      banners: [],
      dialogVisible: false,
      banner: {}
    };
  },
  methods: {
    // 查询所有
    getBannerList() {
      bannerList()
        .then(res => {
          if (res.data.code === "success") {
            this.banners = res.data.data;
          } else {
            this.$message({
              message: res.data.message,
              type: "err"
            });
          }
        })
        .catch(err => {
          // 错误处理
        });
    },
    // 删除一个
    deleteBanner(index) {
      let id = this.banners[index].id;

      bannerDelete(id)
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.banners.splice(index, 1);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
        });
    },

    // 打开修改对话框
    openUpdateDialog(row) {
      this.dialogVisible = true;
      this.banner = row;
      console.log(this.banner.status);
    }
  },
  updated() {
    console.log(this.banner);
  },
  filters: {
    // 过滤时间
    getTime(value) {
      let date = new Date(value);
      function islessten(value) {
        if (value < 10) {
          return "0" + value;
        } else {
          return value;
        }
      }
      return (
        islessten(date.getFullYear()) +
        "-" +
        islessten(date.getMonth() + 1) +
        "-" +
        islessten(date.getDate())
      );
    },
    getShowStatus(value) {
      return value ? "显示" : "未显示";
    }
  },
  created() {
    this.getBannerList();
  }
};
</script>
<style scoped>
.banner {
  width: 200px;
  height: 100px;
}
</style>

<template>
  <div>
    <el-button type="success" size="mini" style="float:left;" @click="openAddDialog">
      <i class="el-icon-plus"></i>添加老师
    </el-button>
    <el-table
      :data="teachers"
      style="width:100%"
      @sort-change="sortChange"
      fi
      border
      highlight-current-row
      :loading="true"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          
  <div class="comment-item">
    <img :src="'http://localhost:3000'+props.row.imgPath" class="banner">
    <div class="inner-box">
      <span class="user">{{props.row.name}}</span>
      <span class="time">{{props.row.type}}</span>
      <span class="floor-count" >{{props.row.status}}</span>
      <p class="content">
      <span>
        {{props.row.descreption}}
      </span>
    </p>
    </div>
  </div>

        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="100" sortable="'custom'"></el-table-column>
      <el-table-column prop="type" label="类型" width="180" sortable="'custom'"></el-table-column>
      <el-table-column prop="imgPath" label="图片路径" width="180" sortable="'custom'"></el-table-column>
      <el-table-column prop="descreption" label="描述" width="200" sortable="'custom'"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" sortable="'custom'">
        <template slot-scope="teacher">{{teacher.row.status | getShowStatus}}</template>
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
            @click="deleteTeacher(scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog :title="dialogFlag==='add'?'添加':'修改'" :visible.sync="dialogVisible" width="35%">
      <el-form :model="teacher" label-position="right" label-width="80px" :inline="true" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="teacher.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="teacher.type" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item label="是否在职">
          <el-radio v-model="teacher.status" label="1">在职</el-radio>
          <el-radio v-model="teacher.status" label="0">离职</el-radio>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="teacher.descreption" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <label class="uploadLabel" for="teacherImg">上传图片</label>
          <input type="file" id="teacherImg" @change="imgBase64">
          <img :src="teacherImg" v-show="teacherImg" class="teacherImg">
        </el-form-item>
        <el-form-item>
          <el-button type="suceess" @click="submitForm">{{dialogFlag==='add'?'添加':'修改'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      :page-sizes="[10,20,30,40,50]"
      :page-size="5"
      @size-change="changSize"
      @current-change="currentPage"
    ></el-pagination>
  </div>
</template>
<script>
import {
  teacherAdd,
  teacherList,
  teacherDelete,
  teacherUpdate
} from "@/api/teacher.js";
export default {
  data() {
    return {
      teachers: [],
      dialogVisible: false,
      teacher: {},
      teacherImg: "",
      dialogFlag: "add",
      file: {},
      page: 1,
      limit: 10,
      count: 0
    };
  },
  methods: {
    // 查询所有
    getteacherList(page, limit, column, order) {
      teacherList(page, limit, column, order)
        .then(res => {
          if (res.data.code === "success") {
            this.teachers = res.data.data.teachers;
            this.count = res.data.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
        });
    },
    // 删除一个
    deleteTeacher(index) {
      let id = this.teachers[index].id;

      teacherDelete(id)
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.teachers.splice(index, 1);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
        });
    },
    // 增加老师
    addTeacher() {
      teacherAdd(this.teacher)
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.teachers.push(res.data.data);
            this.dialogVisible = false;
            this.dialogFlag = "";
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
          this.$router.push("/index/404");
        });
    },
    // 修改老师
    updateTeacher() {
      teacherUpdate(this.teacher)
        .then(res => {
          if (res.data.code === "success") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.teachers.push(res.data.data);
            this.dialogVisible = false;
            this.dialogFlag = "";
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // 错误处理
          this.$router.push("/index/404");
        });
    },
    // 提交表单数据
    submitForm() {
      if (this.dialogFlag === "add") {
        this.addTeacher();
      } else {
        this.updateTeacher();
      }
    },
    //每页多少数改变
    changSize(val) {
      this.limit = val;
      this.getteacherList(this.page, this.limit);
    },
    // 当前页数改变时
    currentPage(val) {
      this.page = val;
      this.getteacherList(this.page, this.limit);
    },
    // 排序
    sortChange(val) {
      this.page = 1;
      var column = val.prop;
      var order = val.order;
      this.getteacherList(this.page, this.limit, column, order);
    },
    // 打开修改对话框
    openUpdateDialog(row) {
      this.dialogVisible = true;
      this.teacher = row;
      this.dialogFlag = "update";
    },
    // 打开添加对话框
    openAddDialog() {
      this.dialogVisible = true;
      this.dialogFlag = "add";
    },
    imgBase64(event) {
      let file = event.target.files[0];
      this.teacher["img"] = file;
      let fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.teacherImg = fileReader.result;
      });
      fileReader.readAsDataURL(file);
    }
  },
  watch: {
    dialogVisible(value) {
      this.teacherImg = "";
      if (!value) {
        this.teacher = {};
      }
    }
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
    this.getteacherList(this.page, this.limit);
  }
};
</script>
<style scoped>
.banner {
  width: 200px;
  height: 100px;
}
.uploadLabel {
  display: inline-block;
  width: 100%;
  height: 40px;
  background: #409eff;
  border-radius: 4px;
  color: #fff;
}
.teacherImg {
  width: 100%;
  height: 200px;
}
input[type="file"] {
  display: none;
}

.comment-rate > textarea{
  width: 100%;
  height: 114px;
  background: #FCFCFC;
border: 1px solid #979797;
padding: 10px;
box-sizing: border-box;
resize:none;
}
p{
  padding: 0;
  overflow: auto;
}

.comment-item>img {
  float: left;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;  
}
.comment-info span,.inner-box span {
  font-size: 12px;
}
.user,.time{
  color: #6f6f6f;
}
.comment-item .inner-box {
  margin-left: 50px;
}
.floor-count{
  float: right;
  color: #333;
}
.content {
  margin: 10px 0;
}
.content >span > img{
  vertical-align: middle;
  margin-right: 5px;
}
.content > span:not(:first-child) {
  font-size: 14px;
  color: #6f6f6f;
  float: right;
  margin-left: 20px;
}
span{
  cursor: pointer;
}
.user {
  margin-left: 5px;
  margin-right: 20px;
}
</style>

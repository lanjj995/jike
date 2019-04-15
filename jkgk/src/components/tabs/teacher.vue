<template>
  <div>
    <el-table :data="teachers" style="width:100%" fi border highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="teacher">
          <img :src="'http://localhost:3000'+teacher.row.imgPath" class="banner">
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="imgPath" label="图片路径" width="180"></el-table-column>
      <el-table-column prop="descreption" label="描述" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
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
    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form :model="teacher" label-position="right" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="teacher.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="teacher.descreption" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio v-model="teacher.status" label="1">显示</el-radio>
          <el-radio v-model="teacher.status" label="0">不显示</el-radio>
        </el-form-item>

        <el-form-item label="创建时间">
          
        </el-form-item>
        <el-form-item label="图片">
          
        </el-form-item>
        
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { teacherList, teacherDelete } from "@/api/teacher.js";
export default {
  data() {
    return {
      teachers: [],
      dialogVisible: false,
      teacher: {}
    };
  },
  methods: {
    // 查询所有
    getteacherList() {
      teacherList()
        .then(res => {
          if (res.data.code === "success") {
            this.teachers = res.data.data;
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

    // 打开修改对话框
    openUpdateDialog(row) {
      this.dialogVisible = true;
      this.teacher = row;
      console.log(this.teacher.status);
    }
  },
  updated() {
    console.log(this.teacher);
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
    this.getteacherList();
  }
};
</script>
<style scoped>
.banner {
  width: 200px;
  height: 100px;
}
</style>

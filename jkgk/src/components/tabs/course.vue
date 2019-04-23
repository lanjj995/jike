<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
      
      
        <!-- 操作区----start -->
        <el-row class="mgb15">
            <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
            <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="150" align="center" sortable="'custon'">
                 <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center" width="150">
            </el-table-column>
            <el-table-column prop="teacher" label="老师" align="center" width="150">
                 <template slot-scope="scope" align="center" width="150">
                    <span>{{ scope.row.type |convertType}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="intro" label="简介" align="center" width="100">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center" width="100">
                 <template slot-scope="scope">
                    <span>{{ scope.row.gender==1?'男':'女' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="image_large" label="大图片路径" width="180" sortable>
            </el-table-column>
             <el-table-column prop="image_small" label="小图片路径" width="180" sortable>
            </el-table-column>
             <el-table-column prop="apply_count" label="销量" width="180" sortable>
            </el-table-column>
             <el-table-column prop="class_time" label="上传时间" width="180" sortable>
            </el-table-column>
             <el-table-column prop="class_hour" label="课程时间" width="180" sortable>
            </el-table-column>

            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="标题" prop="title" class="inline">
                    <el-input v-model="formEdit.name" placeholder="姓名" ></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="city" class="inline">
                    <el-input v-model="formEdit.city" placeholder="地址"></el-input>
                </el-form-item>
                 <el-form-item label="类别" prop="type" class="inline">
                    <el-select v-model="formEdit.type" placeholder="类别">
                        <el-option label="留言" value="1"></el-option>
                        <el-option label="建议" value="2"></el-option>
                        <el-option label="BUG" value="3"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="年龄" prop="age" class="inline">
                    <el-input  v-model="formEdit.age" placeholder="年龄"></el-input>
                </el-form-item>
                 <el-form-item label="性别" prop="gender" class="inline">
                    <el-select v-model="formEdit.gender" placeholder="性别">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="qq" prop="qq" class="inline"> 
                    <el-input v-model="formEdit.qq" placeholder="QQ号"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->

    </div>
</template>

<style>

    .mgb15>button{
        float: left;
    }
   .el-form-item__content {
        width: 220px;
    }
    .el-dialog__title{
        float: left;
    }

</style>

<script>
export default {
    name: 'messageboard',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            formSearch: { //表单查询
                name: '',
                city:'',
                type:null,
                age:'',
                gender:null,
                qq: '',
                startdate:null,
                enddate:null
            },
            formEdit: { //表单编辑
                id:null,
                name: '',
                city:'',
                type:'',
                age:'',
                gender:null,
                qq: ''
            },
             rulesEdit:  {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
                ],
                city:[{ required: true, message: "请输入城市", trigger: "blur" }]
                ,
                type: [{ required: true, message: "请选择类别", trigger: "change" }],
                gender: [{ required: true, message: "请选择性别", trigger: "change" }]
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [  //表单列表
                {   id:"1",
                    createtime: "2016-05-02",
                    name: "李紫婷",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                     id:"2",
                    createtime: "2016-05-04",
                    name: "杨超越",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                     id:"3",
                    createtime: "2016-05-01",
                    name: "赖小七",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id:"4",
                    createtime: "2016-05-03",
                    name: "张紫宁",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    computed:{
        
    },
    filters: {
        convertType: function (type) {
            if(type==1){
                return '留言';
            }
            else if(type==2)
            {
                return '建议';
            }
            else if(type==3){
                return 'BUG';
            }
        }
    },
    mounted(){
      
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
         
        },
        handleSave(){
            
        },
        /**
         * 保存
         */
        save() {
           
        },
         /**
         * 更新
         */
        update() {
            

        },
        /**
         * 批量删除
         */
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
           
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        
                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        onReset(){
        },
        /**
         * 打开编辑弹窗
         */
        handleAdd() {
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.formEditDisabled=false;
            });
           
            
        },
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.formEdit.gender+='';//必须转换成字符串才能回显
            });  
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                 this.dialogType='show';
                this.formEditTitle='详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.formEdit.gender+='';
            });
           
        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        }
        
        
    }
};
</script>

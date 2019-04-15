<template>
    <div class="login_wrapper">
        <div class="login">
            <el-form :model="user">
                <el-form-item>
                    <h2 class="title">即刻公考后台管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.username" placeholder="账号" required="required"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.password" placeholder="密码" show-password required="required"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="adminlogin">登陆</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <p class="bei">京ICP备18050367号-1</p>
    </div>
</template>
<script>
import {login} from "../api/user.js";
export default {
    name: 'login',
    data() {
        return {
            user:{},
        }
    },
    methods:{
        
        adminlogin(){
            login(this.user).then(res => {
                if (res.data.code === "success") {
                    this.$router.push({path:'/index'});
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(err => {
                // 错误处理
                this.$router.push({path:'/index'});
            })
        }
    },
    updated(){
        console.log(this.user);
    }
}
</script>

<style scoped>
.login{
    width:450px;
    height:auto;
    margin:auto;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 0 25px #cac6c6;
    box-shadow: 0 0 25px #cac6c6;
}
.el-form-item__content >.el-input,.el-form-item__content >.el-button{
    width: 300px;
}
</style>


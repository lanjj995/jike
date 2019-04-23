<template>
    <el-menu>
        <el-submenu v-for="item in menus" :key="item.id" :index="''+item.id">
            <template slot="title">
                <i class=""></i>{{item.title}}
            </template>
            <el-menu-item v-for="(i,index) in item.menus" :key="i.id" :index="item.id+'-'+index+1" @click="addtab(i.component,i.title)">{{i.title}}</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    props:{
        menus:Array
    },
    methods:{
        addtab(router,title){
            this.$emit('addTab',{title,router});
            this.$router.push({name:router});
        }
    }
}
</script>
<style scoped>

</style>

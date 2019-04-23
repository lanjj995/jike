import Axios from "./index";

// 增加
function teacherAdd(teacher){
    let formData = new FormData();
    for (let key in teacher) {
        formData.append(key,teacher[key]);
    }
    return Axios.post('/teacher/add',formData);
}

// 查询所有的banner
function teacherList(page,limit,column,order) {
    return Axios.get('/teacher/list',{
        params:{
            page,
            limit,
            column,
            order
        }
    }
    );
}

// 根据id删除banner
function teacherDelete(id) {
    return Axios.get('/teacher/delete',{
        params:{
            id
        }
    });
}

// 修改老师
function teacherUpdate(teacher) {
    let formData = new FormData();
    for (let key in teacher) {
        formData.append(key,teacher[key]);
    }
    return Axios.post('/teacher/motify',formData);
}

export{
    // 增加老师
    teacherAdd,
    // 查询所有
    teacherList,
    // 删除老师
    teacherDelete,
    // 修改老师
    teacherUpdate
}
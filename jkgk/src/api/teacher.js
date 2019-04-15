import Axios from "./index";

// 查询所有的banner
function teacherList() {
    return Axios.get('/teacher/list');
}

// 根据id删除banner
function teacherDelete(id) {
    return Axios.get('/teacher/delete',{
        params:{
            id
        }
    });
}

export{
    teacherList,
    teacherDelete
}
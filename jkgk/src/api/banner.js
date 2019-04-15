import Axios from "./index";

// 查询所有的banner
function bannerList() {
    return Axios.get('/banner/list');
}

// 根据id删除banner
function bannerDelete(id) {
    return Axios.get('/banner/delete',{
        params:{
            id
        }
    });
}

export{
    bannerList,
    bannerDelete
}
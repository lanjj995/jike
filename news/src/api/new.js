import Axios from "./index";

function new_getnewList(channelname, page, limit) {
    console.log(channelname, page, limit);

    return Axios.get('/news/list', {
        // get方法传递params参数对象
        params: {
          channelname: channelname,
          page: page,
          limit: limit
        }
      })
   
}

function hotNews_list() {
    return Axios.get('/hotNews/list');
}

function details(id) {
    return Axios.get('/news/details', {
        params: {
            id
        }
    });
}
// 评论列表
function comment_list(id, page, limit) {
    return Axios.get('/comment/list', {
        params: {
            id,
            page,
            limit
        }
    })
}

// 评论文章 | 评论评论
function addcomment(articleId, commentId, content, token) {
    return Axios.post('/comment/add', {
        articleId,
        commentId,
        content,
        token
    });
}

// 评论评论
function commentRate(commentId, token, rate) {
    return Axios.post("/comment/rate", {
        commentId,
        token,
        rate
    })
}

// 获取搜索热词
function searchList(keyword, page, limit) {
    //return Axios.post('/news/search', {
    return Axios.get('/news/search', {
        params:{
            keyword, page, limit
    
        }
    })
}

export {
    new_getnewList,
    hotNews_list,
    details,
    comment_list,
    addcomment,
    commentRate,
    searchList
}
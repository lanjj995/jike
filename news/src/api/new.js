import Axios from "./index";

function new_getnewList(channelname, page, limit) {
    let url = '/new_' + channelname+"_" +page+ '.json';
    return Axios.get(url, {
        pramas: {
            channelname,
            page,
            limit
        }
    });
}

function hotNews_list() {
    return Axios.get('/hotnews_list.json');
}

function details(id) {
    return Axios.get('https://dev.apis.ittim.ltd/nWGq7NqEf/news/details', {
        params: {
            id
        }
    });
}
// 评论列表
function comment_list(id, page, limit) {
    return Axios.get('https://dev.apis.ittim.ltd/nWGq7NqEf/comment/list', {
        params: {
            id,
            page,
            limit
        }
    })
}

// 评论文章 | 评论评论
function addcomment(articleId, commentId, content, token) {
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/comment/add', {
        articleId,
        commentId,
        content,
        token
    });
}

// 评论评论
function commentRate(commentId, token, rate) {
    return Axios.post("https://dev.apis.ittim.ltd/nWGq7NqEf/comment/rate", {
        commentId,
        token,
        rate
    })
}

// 获取搜索热词
function searchList(keyword, page, limit) {
    //return Axios.post('/news/search', {
    return Axios.get('/search_list.json', {
        keyword, page, limit
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
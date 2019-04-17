import Axios from "./index";

function new_getnewList(channelname, page, limit) {
    let url = '/new_' + channelname + '.json';
    return Axios.get(url, {
                pramas: {
                    channelname,
                    page,
                    limit
                }
            });
}

function hotNews_list(){
    return Axios.get('/hotnews_list.json');
}

function details(id) {
    return Axios.get('/new_details.json',{
        params:{
            id
        }
    });
}
// 评论列表
function comment_list(id,page,limit) {
    return Axios.get('/comment_list.json',{
        params:{
            id,
            page,
            limit
        }
    })
}

// 评论文章 | 评论评论
function addcomment(articleId,commentId,content,token){
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/comment/add',{
        articleId,
        commentId,
        content,
        token
    });
}

// 评论评论
function commentRate(commentId,token,rate){
    return Axios.post("https://dev.apis.ittim.ltd/nWGq7NqEf/comment/rate",{
        commentId,
        token,
        rate
    })
}

// 获取搜索热词
function searchList() {
    return Axios.post('',{

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
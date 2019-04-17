import Axios from "./index";

// 用户评论的评论
function comments_level (commentId){
    return Axios.get('/comment_comment.json',{
        params:{
            commentId
        }
    })
}
// 用户的评论
function userComments(token,page,limit){
    return Axios.get("/my_comment_list.json",{
        params:{
            token,
            page,
            limit
        }
    })
}
// 用户信息列表
function messageList(token,page,limit){
    return Axios.get("/mymessage_list.json",{
        params:{
            token,
            page,
            limit
        }
    })
}
// 消息已读
function messageCheck(commentId,token){
    return Axios.post("/message/check",{
            commentId,
            token,
    })
}
// 获取消息的总数
function messageCount(token) {
    return Axios.get("/messsage/count",{
        params:{
            token
        }
    });
}
export {
    comments_level,
    userComments,
    messageList,
    messageCheck,
    messageCount
}
import Axios from "./index";

// 用户评论的评论
function comments_level (commentId){
    return Axios.get('https://dev.apis.ittim.ltd/nWGq7NqEf/comments/level',{
        params:{
            commentId
        }
    })
}
// 用户的评论
function userComments(token,page,limit){
    return Axios.get("https://dev.apis.ittim.ltd/nWGq7NqEf/user/comments",{
        params:{
            token,
            page,
            limit
        }
    })
}
// 用户信息列表
function messageList(token,page,limit){
    return Axios.get("https://dev.apis.ittim.ltd/nWGq7NqEf/message/list",{
        params:{
            token,
            page,
            limit
        }
    })
}
// 消息已读
function messageCheck(commentId,token){
    return Axios.post("https://dev.apis.ittim.ltd/nWGq7NqEf/message/check",{
            commentId,
            token,
    })
}
// 获取消息的总数
function messageCount(token) {
    return Axios.get("https://dev.apis.ittim.ltd/nWGq7NqEf/message/count",{
        params:{
            token
        }
    });
}
// 修改用户信息
function updateUserMessage(token,avatar,nickname){
    let form = new FormData();
    form.append('token',token);
    form.append('avatar',avatar);
    form.append('nickname',nickname);
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/account/detail/change',form);
}
export {
    comments_level,
    userComments,
    messageList,
    messageCheck,
    messageCount,
    updateUserMessage
}
import Axios from "./index";

// 获取图片验证码
function getImgCaptcha() {
    return Axios.get('https://dev.apis.ittim.ltd/nWGq7NqEf/img/captcha');
}
// 获取短信验证码
function getSmsCaptcha(phone, type, imgCaptcha) {
    Axios.withCredentials = true;
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/sms/captcha', {
        phone,
        type,
            imgCaptcha
    });
}
// 获取短信验证码
function getSmsCaptchaReceive(phone, type) {
    return Axios.get('https://dev.apis.ittim.ltd/nWGq7NqEf/sms/captcha/receive', {
        params: {
            phone,
            type
        }
    });
}
// 注册
function regist(phone, password, smsCaptcha) {
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/account/register', {

        phone,
        password,
        smsCaptcha
    })
}
// 登陆
function login(phone, password) {
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/account/login', {
        phone,
        password
    });
}
// 找回密码
function findPassword(phone, SMSCaptcha, password) {
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/account/find', {
        phone, SMSCaptcha, password
    })
}
// 修改密码
function updatepsw(phone,smsCaptcha,password){
    return Axios.post('https://dev.apis.ittim.ltd/nWGq7NqEf/account/reset',{
        phone, smsCaptcha, password
    })
}
export {
    getnewList,
    getImgCaptcha,
    getSmsCaptcha,
    getSmsCaptchaReceive,
    regist,
    login,
    findPassword,
    updatepsw
}
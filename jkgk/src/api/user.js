import Axios from "./index";

function login(user){
    return Axios.post('/admin/login',{
        username:user.username,
        password:user.password
    })
}

export{
    login
}
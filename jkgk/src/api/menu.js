import Axios from "./index";

function getmenu() {
    return Axios.get('/menu/list');
}

export{
    getmenu
}
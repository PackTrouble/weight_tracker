import save_handler from "./save_handler";
let user_data;
let user_config;
let initalized = false;
async function initalize(){
     user_data = await save_handler.get_data()
     user_config = await save_handler.get_config()
     initalized = true;
     return initalized;
}

async function user(){
    if(initalized == false || user_data == undefined){
        initalized = await initalize()
        return user_data
    }
    return user_data
}
function config(){
    if(initalized == false || user_config == undefined){
        initalize()
        initalized = true;
        return user_config
    }
    return user_config
}
export default {
    user,config,initalize
}
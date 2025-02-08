const default_settings = {
    primary_color_value:"#ff0000",
    secondary_color_value:"#000000",
    font_color_value:"#000000",
}

async function get_data(){
    let data = JSON.parse(localStorage.getItem("weight_progress_tracker"))

    if(data == undefined){
        return {success:false, message:"Error: No Data - Initalizing default settings"}
    }
    return data;

}
function set_data(data){
    localStorage.setItem("weight_progress_tracker", JSON.stringify(data))
}

async function get_config(){
    let data = JSON.parse(localStorage.getItem("weight_progress_tracker_settings"))
    if(data == undefined){
        localStorage.setItem("weight_progress_tracker_settings", JSON.stringify(default_settings))
        return {success:false, message:"Error: No settings - Initalizing default settings"}
    }
    return data;
}
function set_config(data){
    localStorage.setItem("weight_progress_tracker_settings", JSON.stringify(data))

}

async function initalize_setup_data(data){
    console.log(data)

    let weight_data = [];
    for (let i = 0; i <= data.weight; i++) {
      if (data.weight - i <= data.goal_weight - 1) {
        break;
      }else{
        weight_data.push( {
            "weight": data.weight - i,
            "accepted": false
        })
      }
    }
     localStorage.setItem("weight_progress_tracker", JSON.stringify(weight_data))
    return true


}



export default {
    get_data,
    set_data,
    get_config,
    set_config,
    initalize_setup_data
}
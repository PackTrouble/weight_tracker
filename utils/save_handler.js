const default_settings = {
  primary_color_value: "#ff0000",
  secondary_color_value: "#f66151",
  font_color_value: "#000000",
};

async function get_data() {

  
  let data = localStorage.getItem("weight_progress_tracker");
 
  if (data == "undefined" || data == null) {
    return {
      success: false,
      message: "Error: No Data - Initalizing default settings",
    };
  }else{
    return JSON.parse(data) 
  }
}
function set_data(data) {
  localStorage.setItem("weight_progress_tracker", JSON.stringify(data));
  backup_data()
  
}

async function get_config() {
  let data =  localStorage.getItem("weight_progress_tracker_settings");
  if (data == undefined || data == "undefined" || data == null) {
    localStorage.setItem(
      "weight_progress_tracker_settings",
      JSON.stringify(default_settings)
    );
    return {
      success: false,
      message: "Error: No settings - Initalizing default settings",
    };
  }else{
    return JSON.parse(data)
  }
}
function set_config(data) {
  localStorage.setItem(
    "weight_progress_tracker_settings",
    JSON.stringify(data)
  );
  backup_data()
}

async function initalize_setup_data(data) {
  console.log(data);

  let weight_data = {
    user_data: {
      highest_weight: data.weight,
      age: data.age,
      height: data.height,
      goal_weight: data.goal_weight,
    },
    tracker: [],
  };
  for (let i = 0; i <= data.weight; i++) {
    if (data.weight - i <= data.goal_weight - 1) {
      break;
    } else {
      weight_data.tracker.push({
        weight: data.weight - i,
        accepted: false,
      });
    }
  }
  localStorage.setItem("weight_progress_tracker", JSON.stringify(weight_data));
  backup_data();
  return true;
}

async function backup_data(){
  let bdata = await get_data()
  let bconfig = await get_config()
  const result_backup = await fetch("http://192.168.0.100:3001/backup",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({userdata:bdata,userconfig:bconfig})
  })
  const response_backup = await result_backup.json()
}

export default {
  get_data,
  set_data,
  get_config,
  set_config,
  initalize_setup_data,
  backup_data
};

import "./style/style.css";
import save_handler from "./utils/save_handler";
import weight_tracker from "./pages/weight_tracker";
import settings from "./pages/settings";
import setup from "./pages/setup";
import calculators from "./pages/calculators";
import data_handler from "./utils/data_handler";

window.toggle_weight_complete = toggle_weight_complete;
window.change_menu_state = change_menu_state;

let menu_state = "WEIGHT_TRACKER";
let data, settings_data;




async function app() {

  try{
  const result = await fetch("http://192.168.0.100:3001/")
  const response = await result.json()
    if(JSON.stringify(response.userdata) == '{}'){
      throw new Error("response empty")
    }
  if (response.success != false) {
    data = response.userdata
    settings_data = response.userconfig
    save_handler.set_data(response.userdata)
    save_handler.set_config(response.userconfig)
  }
  

}catch(e){
  
  console.log(e)
  data = await save_handler.get_data()
  settings_data = await save_handler.get_config()
  if (data.success == false  || JSON.stringify(data) == '{}') {
    setup.build_ui()
  } 
  }
 




switch (menu_state) {
  case "WEIGHT_TRACKER":
    weight_tracker.build_ui().then(() => {
      generate_menu_bar();
    });
    break;
  case "CALCULATORS":
    calculators.build_ui();
    generate_menu_bar();
    break;
  case "SETTINGS":
    settings.build_ui().then((res) => {
      generate_menu_bar();
    });
    break;
  default:
    break;
}
}

function generate_menu_bar() {
  let menu = document.createElement("div");
  menu.id = "menu_selector";
  menu.innerHTML = `<h1>apps</h1>
  <div id="menu_selector_apps">
  <div id="apps" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};" onclick="change_menu_state('WEIGHT_TRACKER')">weight</div>
  <div id="apps" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};" onclick="change_menu_state('CALCULATORS')">Calculators</div>
  <div id="apps" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};" onclick="change_menu_state('SETTINGS')">settings</div>
  </div>
  `;
  document.getElementById("app").append(menu);
}

function change_menu_state(changed_menu_state) {
  menu_state = changed_menu_state;
  app();
}

app();


export default {
  app
}
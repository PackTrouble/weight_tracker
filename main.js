import "./style.css";
import save_handler from "./save_handler";
import bmi_calculator from "./pages/bmi_calculator";
import weight_tracker from "./pages/weight_tracker";
import settings from "./pages/settings";

window.toggle_weight_complete = toggle_weight_complete;
window.change_menu_state =  change_menu_state;

let menu_state = "WEIGHT_TRACKER"

async function app(){
  switch(menu_state){
    case "WEIGHT_TRACKER":
      weight_tracker.build_ui().then(()=>{
          generate_menu_bar()

      });
      break;
      case "BMI_CALCULATOR":
        bmi_calculator.build_ui() ; 
          generate_menu_bar();
          case "SETTINGS":
            settings.build_ui();
          generate_menu_bar();
        default:
      break;
  }


}

function generate_menu_bar(){
  let menu = document.createElement("div")
  menu.id = "menu_selector"
  menu.innerHTML = `<h1>apps</h1>
  <div id="menu_selector_apps">
  <div id="apps" onclick="change_menu_state('WEIGHT_TRACKER')">weight</div>
  <div id="apps" onclick="change_menu_state('BMI_CALCULATOR')">bmi</div>
  <div id="apps" onclick="change_menu_state('SETTINGS')">settings</div>
  </div>
  `
  document.getElementById('app').append(menu);
}


function change_menu_state(changed_menu_state){
menu_state = changed_menu_state
app()
}


app();

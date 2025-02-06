import save_handler from "../save_handler";
import bmi_calculator from "./bmi_calculator";
import bmr_calculator from "./bmr_calculator";
window.toggle_weight_complete = toggle_weight_complete;
let data, settings_data;

function generate_weight_list() {
  let html = `<div id="progress_list">`;
  data.map((e, i) => {
    if (e.accepted == true) {
      html += `<div id="weight_progress_button_${i}" onclick="toggle_weight_complete(${i})" style="background:${settings_data.secondary_color_value};color:${settings_data.font_color_value};" class="complete">${e.weight}</div>`;
    } else {
      html += `<div id="weight_progress_button_${i}" onclick="toggle_weight_complete(${i})" style="color:${settings_data.font_color_value};">${e.weight}</div>`;
    }
  });
  html += "</div>";
  return html;
}
function toggle_weight_complete(index) {
  document
    .getElementById(`weight_progress_button_${index}`)
    .classList.toggle("complete");
  data[index].accepted = !data[index].accepted;
  save_handler.set_data(data);
  refresh_ui();
}
function generate_progress_bar() {
  let counter = 0;
  data.map((e, i) => {
    if (e.accepted == true) {
      counter++;
    }
  });

  let html = `<div id="progress_bar">`;
  html += `<div style=" width:${(counter / data.length) * 100}%; background:${
    settings_data.secondary_color_value
  };"><p style="color:${
    settings_data.font_color_value
  }">${counter}🔻: ${Math.floor((counter / data.length) * 100)}%</p></div>`;
  html += "</div>";
  return html;
}
function generate_bmi_report(){
    let current_weight;
    for (let i = 0; i < data.length; i++) {
        let e = data[i].accepted
        if(e == false){
            current_weight=data[i].weight;
            break;
        }
    }
    let html = `<div id="bmi_report" style="background:${settings_data.secondary_color_value};color:${settings_data.font_color_value};"><h1>starting bmi</h1><h2>${bmi_calculator.calculate_BMI(data[0].weight,72,26).toFixed(2)}</h2><h1>bmi</h1><h2>${bmi_calculator.calculate_BMI(current_weight,72,26).toFixed(2)}</h2></div>`
    return html
}
function generate_bmr_report(){
  let current_weight;
  for (let i = 0; i < data.length; i++) {
      let e = data[i].accepted
      if(e == false){
          current_weight=data[i].weight;
          break;
      }
  }
  let html = `<div id="bmi_report" style="background:${settings_data.secondary_color_value};color:${settings_data.font_color_value};"><h1>starting bmr</h1><h2>${bmr_calculator.calculate_BMR(data[0].weight,72,26,"MALE").toFixed(2)}</h2><h1>bmr</h1><h2>${bmr_calculator.calculate_BMR(current_weight,72,26,"MALE").toFixed(2)}</h2></div>`
  return html
}
async function build_ui() {
  await save_handler.get_data().then((res) => {
    if (res.sucess != false) {
      data = res;
    }
    save_handler.get_config().then((res) => {
      if (res.sucess != false) {
        settings_data = res;
        document.querySelector("#app").innerHTML = `
          <div id="ui_wrapper">
            ${generate_progress_bar()}
            ${generate_weight_list()}
            <div id="side-bar">
            ${generate_bmi_report()}
            ${generate_bmr_report()}

            </div>
            </div>
            `;

        document.getElementById("app").style.background =
          settings_data.primary_color_value;

      }

  
    });
  });
}

function refresh_ui(){
 document.getElementById('ui_wrapper').innerHTML = `
       ${generate_progress_bar()}
            ${generate_weight_list()}
            <div id="side-bar">
            ${generate_bmi_report()}
            ${generate_bmr_report()}
            </div>`;
 
}

export default {
  build_ui,
};

import save_handler from "../save_handler";
import bmi_calculator from "./bmi_calculator";
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
  build_ui();
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
function generate_settings() {
  let html = `  <div id="settings_menu" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};">
                    <form id="settings_menu_form" >
                        <h1>settings</h1>
                        <div style="display:none">
                        <h2>color</h2>
                            <div>
                                <p>Primary</p>
                                <input type="color" value="${settings_data.primary_color_value}"/>
                            </div>
                            <div>
                                <p>Secondary</p>
                                <input type="color" value="${settings_data.secondary_color_value}"/>
                                <p>Font</p>
                            <input type="color" value="${settings_data.font_color_value}"/>
                        
                            </div>
                        <button type="submit ">save</button>
                        </div>
                    </form>
                </div>`;
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
async function build_ui() {
  await save_handler.get_data().then((res) => {
    if (res.sucess != false) {
      data = res;
    }
    save_handler.get_config().then((res) => {
      if (res.sucess != false) {
        settings_data = res;
        document.querySelector("#app").innerHTML = `
            ${generate_progress_bar()}
            ${generate_weight_list()}
            <div id="side-bar">
            ${generate_bmi_report()}
            </div>
            `;

        document.getElementById("app").style.background =
          settings_data.primary_color_value;

        document
          .getElementById("settings_menu_form")
          .addEventListener("submit", (ev) => {
            ev.preventDefault();
            settings_data.primary_color_value = ev.target[0].value;
            settings_data.secondary_color_value = ev.target[1].value;
            settings_data.font_color_value = ev.target[2].value;
            save_handler.set_config(settings_data);
            build_ui();
          });
      }

  
    });
  });
}

export default {
  build_ui,
};

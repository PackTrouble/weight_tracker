import save_handler from "../save_handler";
let data, settings_data;
let active_setting = "PROFILE"

window.change_active_setting = change_active_setting


async function build_ui() {
  await save_handler.get_data().then((res) => {
    if (res.sucess != false) {
      data = res;
    }
    save_handler.get_config().then((res) => {
      if (res.sucess != false) {
        settings_data = res;

        document.getElementById("app").innerHTML = `
        ${generate_settings()}
       `;
    document.getElementById(`menu_option_${active_setting}`).classList.add("settings_menu_active_option");
    document.getElementById(`menu_option_${active_setting}`).style.background = settings_data.secondary_color_value;
    document.getElementById(`menu_option_${active_setting}`).style.color = settings_data.font_color_value;



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
            change_active_setting(active_setting);
          });
      }
    });
  });
}

// function refresh_ui() {
//   document.getElementById("ui_wrapper").innerHTML = `
//         <div id="settings_menu" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};">
//                           <form id="settings_menu_form" >
//                               <h1>settings</h1>
//                               <div >
//                               <h2>color</h2>
//                                   <div>
//                                       <p>Primary</p>
//                                       <input type="color" value="${settings_data.primary_color_value}"/>
//                                   </div>
//                                   <div>
//                                       <p>Secondary</p>
//                                       <input type="color" value="${settings_data.secondary_color_value}"/>
//                                       <p>Font</p>
//                                   <input type="color" value="${settings_data.font_color_value}"/>
                              
//                                   </div>
//                               <button type="submit ">save</button>
//                               </div>
//                           </form>
//                       </div>`;
// }

function generate_settings() {
  let html = ` 
            <div id="ui_wrapper">
                  <h1>settings</h1>

              <div id="settings_menu" >
                  <div id="settings_menu_switcher">
                    <ul>
                    <li id="menu_option_PROFILE" onclick="change_active_setting('PROFILE')"><h1>Profile</h1></li>
                    <li id="menu_option_APPEARANCE" onclick="change_active_setting('APPEARANCE')"><h1>Appearance</h1></li>
                    </ul>
                  </div>
                  <form id="settings_menu_form" >
                    ${generate_active_setting_content()}
                      <button type="submit ">save</button>
                  </form>
              </div>
            </div>`;
  return html;
}
function generate_active_setting_content(){
let html = ``
  switch(active_setting){
    case "PROFILE":
      html+= `<h2>weight</h2><h2>age</h2><h2>height</h2>`
      break;
      
    case "APPEARANCE":
      html +=`    <h2>color</h2>
                                  <div>
                                      <p>Primary</p>
                                      <input type="color" value="${settings_data.primary_color_value}"/>
                                  </div>
                                  <div>
                                      <p>Secondary</p>
                                      <input type="color" value="${settings_data.secondary_color_value}"/>
                                      <p>Font</p>
                                  <input type="color" value="${settings_data.font_color_value}"/>
                              
                                  </div>`
      break;
     
      default:
      html+= `<h2>INVALID OPTION</h2>`

        break;
  }

  return html
}

function change_active_setting(category){
    active_setting = category
    document.getElementById('settings_menu_form').innerHTML = `${generate_active_setting_content()}
                      <button type="submit ">save</button>`;
                      document.getElementById('settings_menu_switcher').innerHTML = `  <ul>
                    <li id="menu_option_PROFILE" onclick="change_active_setting('PROFILE')"><h1>Profile</h1></li>
                    <li id="menu_option_APPEARANCE" onclick="change_active_setting('APPEARANCE')"><h1>Appearance</h1></li>
                    </ul>
                  </div>`;
                      
    document.getElementById(`menu_option_${active_setting}`).classList.add("settings_menu_active_option");
    document.getElementById(`menu_option_${active_setting}`).style.background = settings_data.secondary_color_value;
    document.getElementById(`menu_option_${active_setting}`).style.color = settings_data.font_color_value;
    
}

export default {
  build_ui,
};

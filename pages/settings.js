import save_handler from "../save_handler";
let data,settings_data;
async function build_ui() {
  await save_handler.get_data().then((res) => {
    if (res.success != false) {
      data = res;
    }else{
    }
    save_handler.get_config().then((res) => {
      if (res.sucess != false) {
        settings_data = res;

        document.getElementById('app').innerHTML = `
        ${generate_settings()}
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
            refresh_ui();
            
          });
      }

  
    });
  });
}

function refresh_ui(){
    document.getElementById('ui_wrapper').innerHTML = `
        <div id="settings_menu" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};">
                          <form id="settings_menu_form" >
                              <h1>settings</h1>
                              <div >
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
    
}
    

    function generate_settings() {
        let html = ` 
            <div id="ui_wrapper">

        <div id="settings_menu" style="background:${settings_data.secondary_color_value}; color:${settings_data.font_color_value};">
                          <form id="settings_menu_form" >
                              <h1>settings</h1>
                              <div >
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
                      </div>
                      </div>`;
        return html;
      }
    
    export default {
        build_ui
    }
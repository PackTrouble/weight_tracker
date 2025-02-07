import "./../style/setup.css";

let setup_order = 0;
let setup_steps = 3;
let weight,age,height;

let setup_html = `   <div id="setup_wrapper">  
        <form class="setup_user_form">
            <div hidden class="setup_menu_item" id="setup_order_0">
                <h1>setup</h1>
                <input type="text" id="weight_input" placeholder="weight_input" />
            </div>
            <div hidden class="setup_menu_item" id="setup_order_1">
                <h1>setup</h1>

                <input type="text" id="age_input" placeholder="age_input" />
            </div>
            <div hidden class="setup_menu_item" id="setup_order_2">
                <h1>setup</h1>

                <input type="text" id="height_input" placeholder="height_input" />
            </div>
             <div hidden class="setup_menu_item" id="setup_order_3">
                <h1>setup</h1>

                <input type="text" id="goal_input" placeholder="goals_input" />
            </div>
            
            <button type="submit">next</button>
                
        </form>
    </div>`;

function build_ui() {
  document.getElementById("app").innerHTML = setup_html;
  
  document
    .getElementById(`setup_order_${setup_order}`)
    .attributes.removeNamedItem("hidden");
    
  document
    .querySelector(".setup_user_form")
    .addEventListener("submit", (ev) => {
      ev.preventDefault();
      console.log("rand")
      if(setup_order == setup_steps){
  
         weight = ev.target[0].value;
         age = ev.target[1].value;
         height = ev.target[2].value;
        console.log("🚀 ~ document.getElementById ~ weight:", weight)
        console.log("🚀 ~ document.getElementById ~ age:", age)
        console.log("🚀 ~ document.getElementById ~ height:", height)
    }
    });
    setup_order++;
    next_panel();


}

function next_panel() {
  document.getElementById("app").innerHTML = setup_html;
  document
    .getElementById(`setup_order_${setup_order}`)
    .attributes.removeNamedItem("hidden");
  document
    .querySelector(".setup_user_form")
    .addEventListener("submit", (ev) => {
      ev.preventDefault();
       weight = ev.target[0].value;
       age = ev.target[1].value;
       height = ev.target[2].value;
      setup_order++;

      if(setup_order <= setup_steps){
          next_panel();
  
      }else{
  
      }
    });


}
export default {
  build_ui,
};

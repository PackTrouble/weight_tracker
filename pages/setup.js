import "./../style/setup.css";
import main from "./../main";
import save_handler from "../save_handler";
let weight, age, height, goal_weight;
let setup_item = 0;

function build_ui() {
  build_panel();
}

function build_panel() {
  switch (setup_item) {
    case 1:
      document.getElementById("app").innerHTML = `
        <div class="wrapper">
          <input type="text" id="weight_input" placeholder="Weight" value="${weight!=undefined?weight:""}" />
          <div id="button_actions">
            <button id="prev">Back</button>
            <button id="next">Next</button>
          </div>
        </div>
      `;
      document.getElementById("next").addEventListener("click", () => {
        setup_item++;
        weight = document.getElementById("weight_input").value;
        build_panel();
      });
      document.getElementById("prev").addEventListener("click", () => {
        setup_item--;
        build_panel();
      });
      break;
    case 2:
      document.getElementById("app").innerHTML = `
              <div class="wrapper">

          <input type="text" id="age_input" placeholder="Age" value="${age!=undefined?age:""}"/>
          <div id="button_actions">

            <button id="prev">Back</button>
            <button id="next">Next</button>

            </div>
        </div>
        `;
      document.getElementById("next").addEventListener("click", () => {
        setup_item++;
        age = document.getElementById("age_input").value;
        build_panel();
      });
      document.getElementById("prev").addEventListener("click", () => {
        setup_item--;
        build_panel();
      });
      break;

    case 3:
      document.getElementById("app").innerHTML = `
           <div class="wrapper">

            <input type="text" id="height_input" placeholder="Height" value="${height!=undefined?height:""}" />
            <div id="button_actions">
            <button id="prev">Back</button>

            <button id="next">Next</button>
            </div>
            
          </div>
          `;
      document.getElementById("next").addEventListener("click", () => {
        setup_item++;
        height = document.getElementById("height_input").value;
        build_panel();
      });
      document.getElementById("prev").addEventListener("click", () => {
        setup_item--;
        build_panel();
      });
      break;
    case 4:
      document.getElementById("app").innerHTML = `
              <div class="wrapper">

              <input type="text" id="goal_weight_input" placeholder="Goal Weight" value="${goal_weight!=undefined?goal_weight:""}" />
               <div id="button_actions">
            <button id="prev">Back</button>

            <button id="next">Save</button>
            </div>
            </div>
            `;
      document.getElementById("next").addEventListener("click", () => {
        goal_weight = document.getElementById("goal_weight_input").value;
        save_handler.initalize_setup_data({weight:weight,age:age,height:height,goal_weight:goal_weight})
        main.app();
      });
      document.getElementById("prev").addEventListener("click", () => {
        setup_item--;
        build_panel();
      });
      break;
    default:
      setup_item = 0;
      document.getElementById("app").innerHTML = `
          <div class="wrapper">

      <h1> Welcome to the weight tracker. Let us fill out a few questions. So that you can get to what you do best.</h1>
      <button id="next">Next</button>
      </div>
      `;
      document.getElementById("next").addEventListener("click", () => {
        setup_item++;
        build_panel();
      });
      break;
  }
}

export default {
  build_ui,
};

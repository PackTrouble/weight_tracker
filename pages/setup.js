import "./../style/setup.css";
import main from './../main'
import save_handler from "../save_handler";

let setup_order = 1;
let setup_steps = 4;
let weight, age, height,goal_weight;

let setup_html = `   <div id="setup_wrapper">  
        <form class="setup_user_form">
          <div hidden class="setup_menu_item">
                <h1>Weight Loss tracker</h1>
                <p>Welcome to the beginning of a new journey
            </div>
            <div hidden class="setup_menu_item">
                <h1>setup</h1>
                <input type="text" id="weight_input" placeholder="weight_input" />
            </div>
            <div hidden class="setup_menu_item" >
                <h1>setup</h1>

                <input type="text" id="age_input" placeholder="age_input" />
            </div>
            <div hidden class="setup_menu_item" >
                <h1>setup</h1>

                <input type="text" id="height_input" placeholder="height_input" />
            </div>
             <div hidden class="setup_menu_item">
                <h1>setup</h1>

                <input type="text" id="goal_input" placeholder="goals_input" />
            </div>

            <div id="form_action_options">
                <div class="button" id="prev_option_button" hidden>Back</div>
                <button class="button" type="submit" id="setup_form_submit_button">next</button>

            </div>
          
                
        </form>
    </div>`;

function build_ui() {
  document.getElementById("app").innerHTML = setup_html;

  document
    .querySelector(".setup_user_form")
    .querySelector(`div:nth-child(${setup_order})`)
    .attributes.removeNamedItem("hidden");

  document
    .querySelector(".setup_user_form")
    .addEventListener("submit", (ev) => {
      ev.preventDefault();
      next_panel();
    });
  document
    .getElementById("prev_option_button")
    .addEventListener("click", () => {
      prev_panel();
    });
}

function next_panel() {
  setup_order++;

  document.getElementById("app").innerHTML = setup_html;
  document
    .querySelector(".setup_user_form")
    .querySelector(`div:nth-child(${setup_order})`)
    .attributes.removeNamedItem("hidden");

  document
    .querySelector(".setup_user_form")
    .addEventListener("submit", (ev) => {
      ev.preventDefault();
        console.log(ev.target)
        if(ev.target[0].value != ""){
          weight = ev.target[0].value
        }
        if(ev.target[1].value != ""){
          age = ev.target[0].value

        }
        if(ev.target[2].value != ""){
          height = ev.target[0].value

        }
        if(ev.target[3].value != ""){
          goal_weight = ev.target[0].value

        }

      if (setup_order > setup_steps) {
        save_handler.initalize_setup_data({
            weight:weight,
            age:age,
            height:height,
            goal_weight:goal_weight})
        main.app()
      }

      if (setup_order <= setup_steps - 1) {
        next_panel();
      } else {
        next_panel();
        document.getElementById("setup_form_submit_button").innerText = "save";
      }
    });
  if (!setup_order <= 1) {
    document
      .getElementById("prev_option_button")
      .attributes.removeNamedItem("hidden");
    document
      .getElementById("prev_option_button")
      .addEventListener("click", () => {
        if (setup_order > setup_steps) {
          prev_panel();
        } else {
          prev_panel();
          document.getElementById("setup_form_submit_button").innerText =
            "save";
        }

      });
  }
}
function prev_panel() {
  setup_order--;

  document.getElementById("app").innerHTML = setup_html;
  document
    .querySelector(".setup_user_form")
    .querySelector(`div:nth-child(${setup_order})`)
    .attributes.removeNamedItem("hidden");

    if (!setup_order <= 1) {
        document
          .getElementById("prev_option_button")
          .attributes.removeNamedItem("hidden");
        document
          .getElementById("prev_option_button")
          .addEventListener("click", () => {
            if (setup_order > setup_steps) {
              prev_panel();
            } else {
              prev_panel();
              document.getElementById("setup_form_submit_button").innerText =
                "save";
            }
    
          });
      }

  document
    .getElementById("prev_option_button")
    .addEventListener("click", () => {
      if (setup_order > setup_steps) {
        prev_panel();
      } else {
        prev_panel();
        document.getElementById("setup_form_submit_button").innerText = "save";
      }

    });
}
export default {
  build_ui,
};

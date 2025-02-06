let user_unit_preference = "IMPERIAL";
function build_ui() {
  switch (user_unit_preference) {
    case "IMPERIAL":
      document.getElementById("app").innerHTML = `
    <div id="ui_wrapper">
        <h1>BMR Calculator</h1>
        <p>standard<p>
        <form id="bmr_form_submit">
            <input type="number" name="user_weight_in_pounds" placeholder="weight in pounds"/>
            <input type="number" name="user_height_in_inches" placeholder="height in inches"/>
            <input type="number" name="user_age" placeholder="age"/>

            <button type="submit" /> sumbit </button>
        </form>
    </div>
   
   `;

      document
        .getElementById("bmr_form_submit")
        .addEventListener("submit", (ev) => {
          ev.preventDefault();
        });

      break;
    case "METRIC":
      document.getElementById("app").innerHTML = `
     <div id="ui_wrapper">

        <h1>BMR Calculator</h1>
        <p>metric</p>
        <form id="bmr_form_submit">

            <input type="number" name="user_weight_in_kg" placeholder="weight in kg"/>
            <input type="number" name="user_height_in_cm" placeholder="height in cm"/>
            <input type="number" name="user_age" placeholder="age"/>
    
            <button type="submit" /> sumbit </button>
        </form>
    </div>
   
   `;

      document
        .getElementById("bmr_form_submit")
        .addEventListener("submit", (ev) => {
          ev.preventDefault();
        });

      break;
    default:
      break;
  }
}

function calculate_BMR(weight, height, age , gender){
    let bmr = 0;
    if(gender == "MALE"){
    bmr = 66 + (6.23 * weight) + (12.7*height) -(6.8*age)
        
    }else{
    bmr = 665 + (4.35 * weight) + (4.7*height) -(4.7*age)
    }
 
return bmr
}
export default {
  build_ui,
  calculate_BMR
};

let user_unit_preference = "IMPERIAL";
async function build_ui(el,ud,uc) {
  
  switch (user_unit_preference) {
    case "IMPERIAL":
     el.innerHTML = `
    <div id="ui_wrapper">
        <h1>BMR</h1>
        <div style ="display:flex;align-items:center;gap:1em;">   <p style="background:red;border-radius:25px; padding:.75em;">Standard<p><p>Metric<p> </div>
        <form id="bmr_form_submit">
            <input type="number" name="user_weight_in_pounds" placeholder="weight in pounds" value="${ud.highest_weight}"/>
            <input type="number" name="user_height_in_inches" placeholder="height in inches" value="${ud.age}"/>
            <input type="number" name="user_age" placeholder="age" value="${ud.height}"/>
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
      el.innerHTML = `
     <div id="ui_wrapper">

        <h1>BMR Calculator</h1>
        <p>metric</p>
        <form id="bmr_form_submit">

            <input type="number" name="user_weight_in_kg" placeholder="weight in kg" value="${ud.highest_weight}"/>
            <input type="number" name="user_height_in_cm" placeholder="height in cm" value="${ud.height}"/>
            <input type="number" name="user_age" placeholder="age" value="${ud.age}"/>
    
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

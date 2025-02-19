import bmr_calculator from "./bmr_calculator"
import bmi_calculator from "./bmi_calculator"
import save_handler from "../utils/save_handler";
let user_data,user_config;

async function build_ui(){
user_data = await save_handler.get_data()
user_config = await save_handler.get_config()

document.getElementById('app').innerHTML =`
    <div id="bmr_calculator_wrapper"></div>
    <div id="bmi_calculator_wrapper"></div>
`;
bmi_calculator.build_ui(document.getElementById('bmi_calculator_wrapper'),user_data.user_data, user_config)
bmr_calculator.build_ui(document.getElementById('bmr_calculator_wrapper'),user_data.user_data,user_config)
}

export default {
    build_ui
}
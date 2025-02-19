import save_handler from "../utils/save_handler";


function build_ui(el,ud,uc){
el.innerHTML = `<div id="ui_wrapper">
                    <h1>BMI </h1>
                    <form>
                        <input type="text" id="weight" value="${ud.highest_weight}" /> 
                        <input type="text" id="age" value="${ud.age}" />   
                        <input type="text" id="height" value="${ud.height}" />   

                    </form>
                </div>`;

}

function calculate_BMI(weight,height,age){
    return (weight/(height*height))*703
}


export default {
    build_ui,
    calculate_BMI
}
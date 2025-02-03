function build_ui(){
document.getElementById('app').innerHTML = `<div><h1>BMI CALC </h1>

<form>
<label>weight</label>

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
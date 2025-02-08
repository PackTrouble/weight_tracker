const start_weight = 333;
const goal_weight = 180;
const current_calorie_deficit = (2500);
const gender = "MALE";
const age = 27;
const height = 72;
function main(){
// console.log(get_total_calorie(current_weight, 180));
// console.log(get_total_calorie(308, 180));

// console.log(calculate_BMR(goal_weight,height,age,gender))
// console.log(current_calorie_deficit)
// if(current_calorie_deficit > calculate_BMR(goal_weight,height,age,gender)){
//     console.log("Deficit is too high to reach your goal weight.")
// }
calculate_days(start_weight,goal_weight,current_calorie_deficit)

}
main()


function get_total_calorie(weight,goal_weight){
    let max_cal = weight * 3500;
    let goal_cal = goal_weight * 3500;
    let diff_cal = max_cal - goal_cal;
    return diff_cal;
}

function calculate_BMR(weight, height, age , gender){
    let bmr = 0;
    if(gender == "MALE"){
    bmr = 66 + (6.23 * weight) + (12.7*height) -(6.8*age);
    }else{
    bmr = 665 + (4.35 * weight) + (4.7*height) -(4.7*age);
    }
    return bmr
}

function calculate_days(start_weight,end_weight,daily_calorie_deficit){
// intake - (exercise + bmr)
let total = get_total_calorie(start_weight,end_weight)
let day_counter = 0
console.log(total)
while(total >= 0){
    let bmr = calculate_BMR(((start_weight*3500) - total)/3500,height,age,gender)
    console.log("bmr " +bmr)
    
    console.log(total)
    total = total - bmr;

    day_counter++
}
console.log(day_counter)
}
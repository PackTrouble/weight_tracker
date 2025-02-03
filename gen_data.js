import fs from 'fs/promises'
const start_weight = 333 
const end_weight = 179
const diff_weight = start_weight - end_weight

function generate_weight_list(){
    let json = []
  for (let i = 0; i < diff_weight; i++) {
        json.push({weight:start_weight - i, accepted:false})
  }
  return json
}
fs.writeFile("./data.json", JSON.stringify(generate_weight_list()))
console.log(generate_weight_list())
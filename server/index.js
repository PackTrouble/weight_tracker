import express, { response } from "express";
import fs from "fs/promises";
import cors from 'cors'

import { Log } from "./log_handler.js"; 

const app = express();
const PORT = 3001;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/", async (req, res) => {
  let response_data = {};

  try{
    response_data.userdata = await fs.readFile("./userdata.json", { encoding: "utf-8" })
    response_data.userdata = JSON.parse(response_data.userdata)
    response_data.config = await fs.readFile("./userconfig.json", { encoding: "utf-8" })
    response_data.config = JSON.parse(response_data.config)

    if(response_data.userdata == "{}"){
      Log('e','Userdata not initialized.')
    res.json({success:false})
    }else{

      res.json(response_data)

    }


  }catch(err){
    Log("e", err)
    fs.writeFile("./userdata.json","{}",{encoding:"utf-8"})
    fs.writeFile("./userconfig.json","{}",{encoding:"utf-8"})
    Log('i',"New userdata files created.")

    res.json({success:false})

  }
});


app.post("/backup", (req, res) => {
  //backup and remove old backups after predetermined amount of time
  fs.writeFile("./userdata.json", JSON.stringify(req.body.userdata), {
    encoding: "utf-8",
  });
  fs.writeFile("./userconfig.json", JSON.stringify(req.body.userconfig), {
    encoding: "utf-8",
  });
  res.json({success:true})
});


app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

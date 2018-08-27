const fs = require("fs");


const settcgf=JSON.parse(fs.readFileSync("./telebotcfg.json"));

module.exports=settcgf;


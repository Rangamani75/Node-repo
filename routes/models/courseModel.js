
const fs = require("fs")

let getData = ()=>{
    let data = JSON.parse(fs.readFileSync("db.json","utf-8"))
        let courses = data.courses
        return {data,courses}
}
let addOrUpdate = (data)=>{
    fs.writeFileSync("db.json", JSON.stringify(data));
    

}
module.exports = { getData, addOrUpdate }

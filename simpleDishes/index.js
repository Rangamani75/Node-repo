const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/test",(req,res)=>{
	res.status(200).json("App in Test of Dishes");
})

app.get("/getAllDishes",(req,res)=>{
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
	let items = data.dishes;
	res.status(200).json({msg:"Dishes are here",items});
	console.log(items);
})


app.post("/addDish",(req,res)=>{
	let dat = req.body;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
	//console.log(data)
	let items = data.dishes;
	//console.log("ITEMS:",items)
	let idx = data.dishes.length;
	let newDish = {...dat,id:idx+1};
	items.push(newDish);
	//console.log("ITEMS@2:",items)
	//data.dishes = items;
	//console.log("DATA:",data)
	//console.log("****,data",data)
	fs.writeFileSync("./db.json",JSON.stringify(data))
	//console.log(items)
	res.status(200).json({"msg":"NEw Dish Added"});
})

app.get("/dishes/:id",(req,res)=>{
	let id = req.params.id;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
	let items = data.dishes;
	let needed = items.filter(ele=>ele.id==id);
	if(needed.length===0){
		res.status(404).json({"error":"Id is  not Valid"})
	}
	else{
		res.status(200).json({"msg":"Your Dish","Dish":needed})
	}
// 	console.log(needed);
// res.send(needed)

})


app.put("/dishes/:id",(req,res)=>{
	let id = req.params.id;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
	let items = data.dishes;
	let updatedItem = req.body;
	let found = false;
	let updatedDishes = items.map((ele,idx)=>{
		if(ele.id == id){
			found=true;
			return {...ele,...updatedItem}
		}else return ele;
	})
	if(!found) res.status(404).json({"msg":"ID NOT DOUND"})
	data.dishes = updatedDishes;
	fs.writeFileSync("./db.json",JSON.stringify(data));
	res.status(200).json({"msg":"Data Updated","Data":updatedDishes})

})

app.delete("/deleteDish/:id",(req,res)=>{
	let id = req.params.id;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
	let items = data.dishes;
	let found = false;
	let updatedDishes = items.filter((ele)=>{
		if(ele.id==id) found=true;
		return ele.id!=id;
	})
	if(!found) res.status(404).json({"msg":"ID NOT DOUND"})
	data.dishes = updatedDishes;
	fs.writeFileSync("./db.json",JSON.stringify(data));
	res.status(200).json({"msg":"Data Updated","Data":updatedDishes})

})

// app.get("/dishSearch",(req,res)=>{
// 	console.log(req.query)
// 	//res.send(req.que)
// 	let name = req.query.name;
// 	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
// 	let items = data.dishes;
// 	let searched = items.map(ele=>ele.name.toLowerCase().includes(name));
// 	if(searched.length==0) res.status(404).json({"Error:":"Itemvnot found "});
// 	res.status(200).json({"msg:":"Searched Dishes....","DISHES":searched})
// })


app.get("*",(req,res)=>{
	res.status(404).json({"error:":"404 NOT FOUND"});

})




app.listen(7002,()=>{
	console.log("App is working on 7002")
})
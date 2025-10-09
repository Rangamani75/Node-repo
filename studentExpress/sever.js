const express = require("express");
const fs =require("fs");
const app = express();
app.use(express.json());






const getData =()=>{
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
	return data;
}

app.get("/test",(req,res)=>{
	res.status(200).json({"msg":"Test Route is working!!"});
})

app.get("/getAllStudents",(req,res)=>{

	let data = getData();
	res.status(200).json({"msg":"Students data is here..","Data":data});

})

app.post("/addStudent",(req,res)=>{
	let bookbody = req.body;
	let data = getData();
	let books = data.students;
	let idx = books.length;
	let newStudent = {...bookbody,id:idx+1};
	books.push(newStudent);
	fs.writeFileSync("./db.json",JSON.stringify(data));
	res.status(200).json({"msg":"Book is added","BOOKS:":books});

})

app.get("/students/:id",(req,res)=>{
	let id = req.params.id;
	let data = getData();
	let books = data.students;
	let found = false;
	let mybook = books.filter(ele=>{
		if(ele.id==id) found=true;
		return ele.id==id;
	})
	if(!found) res.status(404).json({"Error":"Not found"});
	res.status(200).json({"Msg":"here is your book",mybook});

})

app.put("/students/:id",(req,res)=>{
	let id = req.params.id;
	let data = getData();
	let books = data.students;
	let bookBody=req.body;
	let found=false;
	let updatedBooks = books.map(ele=>{
		if(ele.id==id){
			found=true;
			return {...ele,...bookBody}
		}else return ele;
	})
	books = updatedBooks;
	
	fs.writeFileSync("./db.json",JSON.stringify(data))

if(!found) res.status(404).json({"Eroor":"ID IS NOT FOUND"});
res.status(200).json({"Message":"Data is upadted in books",updatedBooks})

})


app.delete("/students/:id",(req,res)=>{
	let id = req.params.id;
	let data = getData();
	let books = data.students;
	let found = false;
	let updatedBooks = books.filter(ele=>{
		if(ele.id==id) found=true;
		return ele.id!=id;
	})
	books = updatedBooks;
	fs.writeFileSync("./db.json",JSON.stringify(data));
	if(!found) res.status(404).json({"Eroor":"ID IS NOT FOUND"});
res.status(200).json({"Message":"Data is upadted in books",updatedBooks})
})

app.get("/studentsearch",(req,res)=>{
	 const {course} = req.query;
	 if(!course) {
		res.status(404).json({"message":"Course is not givem"});
	 }

	 let data =  getData();
	 let books = data.students;
	 let matchedBooks = books.filter((ele,idx)=>{
		return ele.course.toLowerCase().includes(course.toLowerCase());
	 })
	 if(matchedBooks.length==0) res.status(404).json({"Error":"Course is not found"});
	 res.status(200).json({"Here your Results:":matchedBooks})

})






app.listen(7000,()=>{
	console.log("APP IS WORKING ON THE PORT 7000");
})
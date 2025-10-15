const mongoose = require("mongoose");
const bookModel = require("../models/bookModel");
const addBook = async(req,res)=>{
	try{
           let book = await bookModel.create(req.body);
		   res.status(201).json({message:"Book is added",book});
	}
	catch(err){
		res.status(404).json({Error:"Error in adding a book"});
	}
}

const getAllBooks = async(req,res)=>{
	try{
        let books = await bookModel.find();
		res.status(200).json({message:"Here is books!",books})
	}
	catch(err){
	res.status(404).json({error:"Error in getting all books",err})
	}
}
const bookRentals = async(req,res)=>{
	const {bookId} = req.params
	try{
		
     let book = await bookModel.findById(bookId).populate("rentedBy");;
	 if(!book){
		return res.status(404).json({Error:"book is not valid"});
	 }

	 res.status(200).json({message:"Rented uerss for the book",book});
     
	 


	}
	catch(err){
		res.status(404).json({message:"Error in getting rental books of a user",err})
	}

}


const updateBook = async(req,res)=>{
	try{
        
		const {bookId} = req.params;
        
		let book =  await bookModel.findById(bookId);
		if(!book){
			return res.status(404).json({Error:"Book is not valid"});
		}

		book = await bookModel.findByIdAndUpdate(bookId,req.body,{new:true});
		res.status(200).json({message:"Book updated successfully",book});


	}
	catch(err){
		res.status(404).json({Error:"error in updating the book"})
	}
}


const deleteBook = async(req,res)=>{
	try{
        
		const {bookId} = req.params;
        
		let book =  await bookModel.findById(bookId);
		if(!book){
			return res.status(404).json({Error:"Book is not valid"});
		}

		book = await bookModel.findByIdAndDelete(bookId);
		res.status(200).json({message:"Book deleted successfully",book});


	}
	catch(err){
		res.status(404).json({Error:"error in updating the book"})
	}
}








module.exports = {
	addBook,getAllBooks,bookRentals,updateBook,deleteBook,
}
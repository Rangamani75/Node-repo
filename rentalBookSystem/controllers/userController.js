
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");
const addUser = async(req,res)=>{
	try{
           let user = await userModel.create(req.body);
		   res.status(201).json({message:"USer is added",user});
	}
	catch(err){
		res.status(404).json({Error:"Error in adding a user"});
	}
}

const getAllUsers = async(req,res)=>{
	try{
        let users = await userModel.find();
		res.status(200).json({message:"Here are useres!s!",users})
	}
	catch(err){
	res.status(404).json({error:"Error in getting all userss",err})
	}
}

const rentBook = async(req,res)=>{

	const {userId} = req.params;
	try{

		let user = await userModel.findById(userId);
		if(!user){
			return res.status(404).json({error:"user is not valid"})
		}
		const {bookId} = req.body;
		let book = await bookModel.findById(bookId);
		if(!book){
			return res.status(404).json({Error:"Book is not available"})

		}
        
		user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);

    await user.save();
    await book.save();

		res.status(200).json({message:"Book was rented to user",book,user})

		
	}
	catch(err){
		res.status(404).json({Error:"Errpor occured in renting a book",err});

	}
}



const returnBook = async(req,res)=>{

	const {userId} = req.params;
	try{

		let user = await userModel.findById(userId);
		if(!user){
			return res.status(404).json({error:"user is not valid"})
		}
		const {bookId} = req.body;
		let book = await bookModel.findById(bookId);
		if(!book){
			return res.status(404).json({Error:"Book is not available"})

		}
        
		user.rentedBooks.pull(bookId); // or use filter()

    // Remove user from book's rentedBy
    book.rentedBy.pull(userId); // or use filter()

    await user.save();
    await book.save();

		res.status(200).json({message:"Book was returned by the user",book,user})

		
	}
	catch(err){
		res.status(404).json({Error:"Errpor occured in renting a book",err});

	}
}



const userRentals = async(req,res)=>{
	const {userId} = req.params
	try{
		
     let user = await userModel.findById(userId).populate("rentedBooks");;
	 if(!user){
		return res.status(404).json({Error:"User is not valid"});
	 }

	 res.status(200).json({message:"Rented books for the user",user});
     
	 


	}
	catch(err){
		res.status(404).json({message:"Error in getting rental books of a user",err})
	}

}


module.exports = {
	addUser,getAllUsers,rentBook,returnBook,userRentals
}
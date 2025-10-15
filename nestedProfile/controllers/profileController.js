const mongoose = require("mongoose");
const profileModel = require("../models/profileModel");
const validator = require("validator")
const addUser = async(req,res)=>{
	try{
      
		let user = await profileModel.create(req.body);
		res.status(201).json({message:"USer added Succesfully",user});
	}
	catch(err){
		res.status(404).json({Error:"Failed to add user"})
	}
}



const getUsers = async(req,res)=>{
	try{
         const {profile} = req.query;
		 if(profile){
         const validProfileNames = ["fb", "twitter", "github", "instagram"];
    if (!validProfileNames.includes(profile)) {
      return res.status(400).json({ message: "Invalid profile name" });
    }

			let users = await profileModel.find({"profiles.profileName":profile});
			return res.status(200).json({message:`users having profileName ${profile}`,users})
		 }
		 else{

		let users = await profileModel.find();
		if(users.length==0){
			return res.status(404).json({message:"No users available"})
		}else{
			res.status(200).json({message:"Here is the users list",users});
		}
	}

	}
	catch(err){
		res.status(404).json({Error:"Error in getting users",err})
	}
}

const addProfilebyUserId = async (req, res) => {
  try {
    const { userId } = req.params; // corrected from UserId to userId
    const { profileName, url } = req.body;

    const user = await profileModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate profileName (enum) and url (URL)
    const validProfileNames = ["fb", "twitter", "github", "instagram"];
    if (!validProfileNames.includes(profileName)) {
      return res.status(400).json({ message: "Invalid profile name" });
    }
    const isUrlValid = require("validator").isURL(url);
    if (!isUrlValid) {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    // Push profile and save
    user.profiles.push({ profileName, url });
    await user.save();

    res.status(201).json({ message: "Profile added", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding profile", error: err.message });
  }
};


const searchUserandProfile = async (req, res) => {
  try {
    const { name, profile } = req.query;

    if (!name || !profile) {
      return res.status(400).json({ message: "Please provide name and profile in query" });
    }

    const validProfileNames = ["fb", "twitter", "github", "instagram"];
    if (!validProfileNames.includes(profile)) {
      return res.status(400).json({ message: "Invalid profile name" });
    }

    // 1️⃣ Find user by name
    const user = await profileModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Find if profile exists
    const matchedProfile = user.profiles.find(p => p.profileName === profile);

    if (matchedProfile) {
      return res.status(200).json({
        message: `User with name ${name} and profile ${profile} found`,
        user: {
          name: user.name,
          email: user.email,
          profile: matchedProfile,
        },
      });
    } else {
      return res.status(200).json({
        message: "User found, but profile not found",
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error in searching for user and profile",
      error: err.message,
    });
  }
};



const updateProfileNameByUserId = async (req, res) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const validProfileNames = ["fb", "twitter", "github", "instagram"];
    if (!validProfileNames.includes(profileName)) {
      return res.status(400).json({ message: "Invalid profile name" });
    }

    if (!url || !validator.isURL(url)) {
      return res.status(400).json({ message: "Invalid or missing URL" });
    }

    const user = await profileModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profileToUpdate = user.profiles.find(
      (p) => p.profileName === profileName
    );

    if (!profileToUpdate) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profileToUpdate.url = url;
    await user.save();

    res.status(200).json({
      message: `Profile '${profileName}' updated successfully`,
      updatedProfile: profileToUpdate,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while updating profile",
      error: err.message,
    });
  }
};

const deleteProfilenameByUserId = async (req, res) => {
  try {
    const { userId, profileName } = req.params;

    // Validate profileName
    const validProfileNames = ["fb", "twitter", "github", "instagram"];
    if (!validProfileNames.includes(profileName)) {
      return res.status(400).json({ message: "Invalid profile name" });
    }

    // Find user by ID
    const user = await profileModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if profile exists
    const profileIndex = user.profiles.findIndex(
      (p) => p.profileName === profileName
    );

    if (profileIndex === -1) {
      return res.status(404).json({
        message: `Profile '${profileName}' not found for this user`,
      });
    }

    // Remove profile and save
    user.profiles.splice(profileIndex, 1);
    await user.save();

    res.status(200).json({
      message: `Profile '${profileName}' deleted successfully`,
      user,
    });
	
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while deleting profile",
      error: err.message,
    });
  }
};



module.exports = {
	updateProfileNameByUserId,deleteProfilenameByUserId,
	addUser,getUsers,addProfilebyUserId,searchUserandProfile
}
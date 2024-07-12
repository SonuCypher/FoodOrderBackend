import { Request, Response } from "express";
import { User } from "../models/user";

export const getUser = async (req: Request, res: Response) => {
try {
  const currentUser = await User.findOne({_id:req.userId})
  if(!currentUser){
    return res.status(404).json({ message: "User not found"})
  }

  res.status(200).json(currentUser)
  
} catch (error) {
 console.error(error); 
 return res.status(500).json({ message: "Something went wrong"})
}
}


export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("hitting create user")
    const { authId } = req.body;
    const existingUser = await User.findOne({ authId });

    if (existingUser) {
      return res.status(200).json();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log("hitting update user")
    const { name, address1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      console.log("User not found")
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.address1 = address1;
    user.city = city;
    user.country = country;

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

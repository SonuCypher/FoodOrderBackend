import { Request, Response } from "express";
import { User } from "../models/user";

export const createUser = async (req: Request , res:Response) =>{
    try {
        const { authId } = req.body
        const existingUser = await User.findOne({ authId})

        if(existingUser){
            return res.status(200).json()
        }

        const newUser = new User(req.body)
        await newUser.save()
        
        res.status(200).json(newUser.toObject())
    } catch (error) {
        console.log(error);
        res.status(500).json({ message :"Error creating user"})
    }

}


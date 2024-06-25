import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    authId:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    address1:{
        type: String,
    },
    city:{
        type: String,
    },
    country:{
        type: String,
    }
})

export const User = mongoose.model("User",userSchema)
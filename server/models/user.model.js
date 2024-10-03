import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullname:{
        type :String,
        required:true, 
    },
    email:{
        type :String,
        required:true, 
    },
    password:{
        type :String,
        required:true, 
    },
    phoneNumber:{
        type :Number,
        required:true,
    },  
    role:{
        type :String,
        enum:['student','recruiter'],
        required:true,
    },
    profile :{
        bio:{
            type :String,
            default:"Hello there"
        },
        skills:{
            type :[String],
            
        },
        resume:{
            type :String,
            
        },
        resumeOriginalName:{
            type :String,
            
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,ref:'Company'
        },
        profilePicture:{
            type :String,
            default:""

        },


    }
},{timestamps:true});

export default mongoose.model('User',userSchema);
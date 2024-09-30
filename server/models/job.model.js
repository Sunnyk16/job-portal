import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,ref:"Company",
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Internship"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    position:{
        type:String,
        required:true,
    },
    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        },
    ],
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);

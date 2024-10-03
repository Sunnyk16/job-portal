import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        // required: true,
    },
    logo: {
        type: String,
        
    },
    website: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    description: {
        type: String,
        // required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    jobType: [
        {
            type: String,
            // required: true,
        },
    ],
}, { timestamps: true });

export default mongoose.model("Company", companySchema);

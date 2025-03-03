import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: "user" 
    },
    google_auth: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model("user", userSchema);
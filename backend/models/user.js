const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        maxLength: [25, "First Name cannot exceed 25 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        maxLength: [25, "Last Name cannot exceed 25 characters"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [12, "The minimum age limit is 12"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: [true, "Gender is required"]
    },
    location: {
        type: String,
        maxLength: [50, "Location cannot exceed 50 characters"],
        default: "Bangalore"
    },
    occupation: {
        type: String,
        maxLength: [50, "Location cannot exceed 50 characters"],
        required: [true, "Occupation is required"]
    },
    bio: {
        type: String,
        maxLength: [300,"Biography should not be more than 300 words"],
    },
    email: {
        type: String,
        unique: true,
        maxLength: [50, "Email cannot exceed 50 characters"],
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be more than 8 characters"],
    },
    profilePicPath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    viewedProfile: {
        type: Number
    },
    impressions: {
        type: Number
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("User", UserSchema);
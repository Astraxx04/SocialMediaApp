const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            age,
            gender,
            location,
            occupation,
            bio,
            email,
            password,
            profilePicPath,
            friends
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            age,
            gender,
            location,
            occupation,
            bio,
            email,
            password: passwordHash,
            profilePicPath,
            friends,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await User.create(newUser);
        res.status(201).json({ savedUser });
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({ msg: "User does not exist!!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password!!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        delete user.password;
        res.status(200).json({ token, user });
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    register,
    login
};
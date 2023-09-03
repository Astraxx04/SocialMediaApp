const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');

const connectDB = require("./database/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
require("express-async-errors");

// Configurations-Middlewares

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


// Idk
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// FileStorage

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage });

// Database Setup

const port = process.env.PORT || 3000;

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Database connection successful..");
        app.listen(port, console.log(`Server started on port ${port}`));
    }
    catch (err) {
        console.log(err);
    }
}

startServer();
const express = require("express");
const { login, register } = require("../controllers/auth");
const router = express.Router();
const multer = require('multer');

// FileStorage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.route("/login").post(login);
router.route("/register").post(upload.single("picture"), register);

module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { getUser, getUserFriends, addRemoveFriends } = require("../controllers/users");

router.route("/:id").get(authMiddleware, getUser);
router.route("/:id/friends").get(authMiddleware, getUserFriends);
router.route("/:id/:friendId").patch(authMiddleware, addRemoveFriends);

module.exports = router;
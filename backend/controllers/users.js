const User = require("../models/user");

const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json({ err: err.message });
    }
};

const getUserFriends = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriendsList = friends.map(({ _id, firstName, lastName, occupation, location, profilePicPath }) => { 
            return { _id, firstName, lastName, occupation, location, profilePicPath };
        });

        res.status(200).json(formattedFriendsList); 
    } catch(err) {
        res.status(404).json({ err: err.message });
    }
};

const addRemoveFriends = async(req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriendsList = friends.map(({ _id, firstName, lastName, occupation, location, profilePicPath }) => { 
            return { _id, firstName, lastName, occupation, location, profilePicPath };
        });
        res.status(200).json(formattedFriendsList); 
    } catch(err) {
        res.status(404).json({ err: err.message });
    }
};

module.exports = {
    getUser,
    getUserFriends,
    addRemoveFriends
};
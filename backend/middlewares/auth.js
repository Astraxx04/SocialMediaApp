const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async(req, res, next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Token not provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        throw new UnauthenticatedError("Not authorised to access this route");
    }
};

module.exports = authMiddleware;
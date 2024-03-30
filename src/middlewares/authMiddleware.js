/** @format */
const jwt = require("jsonwebtoken");
const database = require("../utils/database");

const authMiddleware = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await database.user.findFirst({
            where: { username: decoded.username },
        });
        return next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid token",
        });
    }
};

module.exports = authMiddleware;

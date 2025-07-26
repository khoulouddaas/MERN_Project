const jwt = require("jsonwebtoken");

module.exports.authenticateDev = (req, res, next) => {
    try {
        const token = req.cookies.devtoken;
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.jwtpayload = payload;
        next();
    } catch (err) {
        console.log("JWT verification failed:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};

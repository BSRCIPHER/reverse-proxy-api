const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const generateToken = (user) => {   
    return jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        "process.env.JWT_SECRET",
    );
}

const verifyToken = (token) => {
    return jwt.verify(token, "process.env.JWT_SECRET");
}

module.exports = {
    generateToken,
    verifyToken
};  
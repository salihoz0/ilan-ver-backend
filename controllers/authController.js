/** @format */
const user = { email: "ychag@example.com", password: "123456789" };
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "Please provide an email and password",
        });
    }
    const token = jwt.sign(
        { kullanıcıAdi: "Mahmut", role: "user" },
        "mustafavebeytullah",
        { expiresIn: "1h" }
    );
    if (email === user.email && password === user.password) {
        return res.status(200).json({
            token: token,
        });
    } else {
        return res.status(401).json({
            error: "Invalid credentials",
        });
    }
};

const changePassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "Please provide an email and password",
        });
    }
    user.password = password;
    return res.status(200).json({
        email: "ychag@example.com",
        newPassword: password,
    });
};

module.exports = { login, changePassword };

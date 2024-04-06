/** @format */
const jwt = require("jsonwebtoken");
const database = require("../utils/database");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { email, username, password, adress, phone } = req.body;

        if (!email || !password || !username || !adress || !phone) {
            return res.status(400).json({
                message:
                    "Please provide an email, password, username, adress and phone",
            });
        }
        const cryptedPassword = await bcrypt.hash(password, 10);

        try {
            await database.user.create({
                data: {
                    email,
                    password: cryptedPassword,
                    username,
                    adress: adress,
                    phone: phone,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                console.log(error);
                return res.status(400).json({
                    message: `${error.meta.target} is already taken`,
                });
            }
            return res.status(500).json({
                message: "Internal server error",
            });
        }
        return res.status(201).json({
            message: "Kayıt işlemi başarılı",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide an email and password",
            });
        }

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await database.user.findFirst({ where: { email: email } });
        if (user && bcrypt.compareSync(cryptedPassword, user.password)) {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                "mustafavebeytullah",
                { expiresIn: "1h" }
            );
            return res.status(200).json({
                token: token,
                username: user.username,
            });
        } else {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
            });
        }
        const cryptedPassword = await bcrypt.hash(password, 10);

        await database.user.update({
            where: { email: req.user.email },
            data: { password: cryptedPassword },
        });

        return res.status(200).json({
            message: "Password changed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { login, changePassword, register };

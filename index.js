/** @format */

const express = require("express");
const routes = require("./src/routes");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "100mb" }));

app.use("/", routes);

app.use("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(process.env.PORT, () => {
    console.log(
        `Server http://localhost:${process.env.PORT} üzerinde çalışıyor`
    );
});

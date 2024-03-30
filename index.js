/** @format */

const express = require("express");
const routes = require("./src/routes");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/", routes);

app.use("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
    console.log(`Server http://localhost:${3000} üzerinde çalışıyor`);
});

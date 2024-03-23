/** @format */

const express = require("express");
const routes = require("./routes");
const app = express();
app.use(express.json());

app.use("/", routes);

app.use("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
    console.log(`Server http://localhost:${3000} üzerinde çalışıyor`);
});

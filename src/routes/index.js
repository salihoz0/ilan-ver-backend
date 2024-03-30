/** @format */

const express = require("express");

const routes = express.Router();
const authRoutes = require("./authRoutes");
const advertRoutes = require("./advertRoutes");

routes.use("/auth", authRoutes);
routes.use("/advert", advertRoutes);

module.exports = routes;

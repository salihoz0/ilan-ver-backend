/** @format */

const express = require("express");
const router = express.Router();
const advertController = require("../controllers/advertController");
router.get("/advertList", advertController.getAdvertList);

module.exports = router;

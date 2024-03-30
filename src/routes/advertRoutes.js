/** @format */

const express = require("express");
const router = express.Router();
const advertController = require("../controllers/advertController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/advert-list", advertController.getAdvertList);
router.get(
    "/my-adverts",
    authMiddleware,
    advertController.getAdvertListForUser
);
router.get("/get-advert-detail", advertController.getAdvert);
router.post("/add-advert", authMiddleware, advertController.addAdvert);
router.put("/update-advert", authMiddleware, advertController.updateAdvert);
router.delete("/delete-advert", authMiddleware, advertController.deleteAdvert);

module.exports = router;

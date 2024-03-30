/** @format */

const database = require("../utils/database");

const addAdvert = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            location,
            photos,
            advertStatus,
            subDetails,
            technicalProperties,
        } = req.body;
        if (
            !title ||
            !description ||
            !price ||
            !location ||
            !photos ||
            !subDetails ||
            !technicalProperties
        ) {
            return res.status(400).json({
                message:
                    "Please provide a title, description, price, location, photos, subDetails, technicalProperties, userId",
            });
        }
        await database.advert.create({
            data: {
                title,
                description,
                price,
                location,
                photos,
                advertStatus,
                subDetails,
                technicalProperties,
                userId: req.user.id,
            },
        });
        return res.send({
            message:
                "İlanınız başarıyla oluşturuldu. İlanlarım sayfasında görebiliriniz",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
const deleteAdvert = async (req, res) => {
    try {
        const { id } = req.query;

        const existingAdvert = await database.advert.findFirst({
            where: { id: Number(id) },
        });
        if (!existingAdvert) {
            return res.status(404).json({ message: "İlan bulunamadı" });
        }
        if (existingAdvert?.userId !== req.user.id) {
            return res.status(403).json({ message: "Yetkisiz erişim" });
        }
        await database.advert.delete({ where: { id: Number(id) } });
        return res.send({
            message: "İlanınız başarıyla silindi",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
const updateAdvert = async (req, res) => {
    try {
        const {
            id,
            title,
            description,
            price,
            location,
            photos,
            advertStatus,
            subDetails,
            technicalProperties,
        } = req.body;

        const existingAdvert = await database.advert.findFirst({
            where: { id },
        });
        if (!existingAdvert) {
            return res.status(404).json({ message: "İlan bulunamadı" });
        }
        if (existingAdvert?.userId !== req.user.id) {
            return res.status(403).json({ message: "Yetkisiz erişim" });
        }
        await database.advert.update({
            where: { id },
            data: {
                title,
                description,
                price,
                location,
                photos,
                advertStatus,
                subDetails,
                technicalProperties,
            },
        });
        return res.send({
            message: "İlanınız başarıyla güncellendi",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getAdvertList = async (req, res) => {
    try {
        const { price, filterType } = req.query;
        const adverts = await database.advert.findMany({
            where: {
                price: filterType
                    ? filterType === "lt"
                        ? { lt: price }
                        : { gt: price }
                    : undefined,
            },
        });
        console.log(adverts);
        return res.send(adverts);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getAdvert = async (req, res) => {
    try {
        const { id } = req.query;
        const advert = await database.advert.findMany({
            where: { id: Number(id) },
        });
        return res.send(advert);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
const getAdvertListForUser = async (req, res) => {
    try {
        const user = req.user;
        const adverts = await database.advert.findMany({
            where: { userId: user.id },
        });
        return res.send(adverts);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = {
    getAdvertList,
    addAdvert,
    getAdvertListForUser,
    updateAdvert,
    deleteAdvert,
    getAdvert,
};

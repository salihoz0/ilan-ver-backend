/** @format */

const ilanList = [
    {
        url: "https://www.google.com",
        title: "title",
        description: "description",
    },
    {
        url: "https://www.google.com",
        title: "title",
        description: "description",
    },
    {
        url: "https://www.google.com",
        title: "title",
        description: "description",
    },
    {
        url: "https://www.google.com",
        title: "title",
        description: "description",
    },
];

const getAdvertList = async (req, res) => {
    console.log(ilanList);
    return res.send(ilanList);
};

module.exports = {
    getAdvertList,
};

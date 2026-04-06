const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetCity } = require("../../../controller/tour/countryController");

const CityRouter = express.Router();

CityRouter.get("/", verifyToken, GetCity);

module.exports = CityRouter;

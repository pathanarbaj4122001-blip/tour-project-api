const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetCityByCountry,  GetCountry } = require("../../../controller/tour/countryController");



const CountryRouter = express.Router();

CountryRouter.get("/:country_code", verifyToken, GetCityByCountry);
CountryRouter.get("/", verifyToken, GetCountry);



module.exports = CountryRouter;

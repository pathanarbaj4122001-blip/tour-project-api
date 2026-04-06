const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetItinerary, CreateItinerary, UpdateItinerary, DeleteItinerary } = require("../../../controller/tour/itineraryController");




const ItineraryRouter = express.Router();

ItineraryRouter.get("/:id", verifyToken, GetItinerary);
ItineraryRouter.post("/:id", verifyToken, CreateItinerary);
ItineraryRouter.put("/:id", verifyToken, UpdateItinerary);
ItineraryRouter.delete("/:id", verifyToken, DeleteItinerary);

module.exports = ItineraryRouter;

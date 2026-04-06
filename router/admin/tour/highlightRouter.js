const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetHighlights, CreateHighlights, UpdateHighlights, DeleteHighlights } = require("../../../controller/tour/highlightsController");


const HighlightRouter = express.Router();

HighlightRouter.get("/:id", verifyToken, GetHighlights);
HighlightRouter.post("/:id", verifyToken, CreateHighlights);
HighlightRouter.put("/:id", verifyToken, UpdateHighlights);
HighlightRouter.delete("/:id", verifyToken, DeleteHighlights);

module.exports = HighlightRouter;

const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetExclude, CreateExclude, UpdateExclude, DeleteExclude } = require("../../../controller/tour/excludeController.js");




const ExcludeRouter = express.Router();

ExcludeRouter.get("/:id", verifyToken, GetExclude);
ExcludeRouter.post("/:id", verifyToken, CreateExclude);
ExcludeRouter.put("/:id", verifyToken, UpdateExclude);
ExcludeRouter.delete("/:id", verifyToken, DeleteExclude);

module.exports = ExcludeRouter;

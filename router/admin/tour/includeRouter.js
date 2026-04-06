const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetInclude, CreateInclude, UpdateInclude, DeleteInclude } = require("../../../controller/tour/includeController.js");




const IncludeRouter = express.Router();

IncludeRouter.get("/:id", verifyToken, GetInclude);
IncludeRouter.post("/:id", verifyToken, CreateInclude);
IncludeRouter.put("/:id", verifyToken, UpdateInclude);
IncludeRouter.delete("/:id", verifyToken, DeleteInclude);

module.exports = IncludeRouter;

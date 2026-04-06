const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetProviders, SingleProvider, CreateProvider, UpdateProvider, DeleteProvider } = require("../../../controller/api provider/apiProviderController");



const ApiProviderRouter = express.Router();

ApiProviderRouter.get("/", verifyToken, GetProviders);
ApiProviderRouter.get("/:id", verifyToken, SingleProvider);

ApiProviderRouter.post("/", verifyToken,  CreateProvider);
ApiProviderRouter.put("/:id", verifyToken,  UpdateProvider);
ApiProviderRouter.delete("/:id", verifyToken, DeleteProvider);



module.exports = ApiProviderRouter;

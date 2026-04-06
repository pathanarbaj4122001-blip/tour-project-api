const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetApiFields, SingleApiFields, CreateApiFields, UpdateApiField, DeleteApiField } = require("../../../controller/api provider/apiFieldController");




const ApiFieldRouter = express.Router();

ApiFieldRouter.get("/", verifyToken, GetApiFields);
ApiFieldRouter.get("/:id", verifyToken, SingleApiFields);

ApiFieldRouter.post("/", verifyToken,  CreateApiFields);
ApiFieldRouter.put("/:id", verifyToken,  UpdateApiField);
ApiFieldRouter.delete("/:id", verifyToken, DeleteApiField);



module.exports = ApiFieldRouter;

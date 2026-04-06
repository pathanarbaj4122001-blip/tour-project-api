const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const {
  GetTermCondition,
  CreateTermCondition,
  UpdateTermCondition,
  DeleteTermCondition
} = require("../../../controller/tour/termConditionController");


const TermConditionRouter = express.Router();

TermConditionRouter.get("/:id", verifyToken, GetTermCondition);
TermConditionRouter.post("/:id", verifyToken, CreateTermCondition);
TermConditionRouter.put("/:id", verifyToken, UpdateTermCondition);
TermConditionRouter.delete("/:id", verifyToken, DeleteTermCondition);

module.exports = TermConditionRouter;

const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetPlans, SinglePlan, CreatePlan, UpdatePlan, DeletePlan } = require("../../../controller/plans/plansController");





const PlansRouter = express.Router();

PlansRouter.get("/", verifyToken, GetPlans);
PlansRouter.get("/:id", verifyToken, SinglePlan);

PlansRouter.post("/", verifyToken,  CreatePlan);
PlansRouter.put("/:id", verifyToken,  UpdatePlan);
PlansRouter.delete("/:id", verifyToken, DeletePlan);



module.exports = PlansRouter;

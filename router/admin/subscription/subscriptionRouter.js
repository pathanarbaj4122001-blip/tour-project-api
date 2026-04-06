const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetSubscriptions, SingleSubscription, CreateSubscription, UpdateSubscription, DeleteSubscription } = require("../../../controller/subscription/subscriptionController");




const SubscriptionRouter = express.Router();

SubscriptionRouter.get("/", verifyToken, GetSubscriptions);
SubscriptionRouter.get("/:id", verifyToken, SingleSubscription);

SubscriptionRouter.post("/", verifyToken,  CreateSubscription);
SubscriptionRouter.put("/:id", verifyToken,  UpdateSubscription);
SubscriptionRouter.delete("/:id", verifyToken, DeleteSubscription);



module.exports = SubscriptionRouter;

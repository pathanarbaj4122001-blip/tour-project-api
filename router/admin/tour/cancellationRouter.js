const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const {
  GetCancellation,
  CreateCancellation,
  UpdateCancellation,
  DeleteCancellation,
} = require("../../../controller/tour/cancellationController");

const CancellationRouter = express.Router();

CancellationRouter.get("/:id", verifyToken, GetCancellation);
CancellationRouter.post("/:id", verifyToken, CreateCancellation);
CancellationRouter.put("/:id", verifyToken, UpdateCancellation);
CancellationRouter.delete("/:id", verifyToken, DeleteCancellation);

module.exports = CancellationRouter;

const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { CreateTag, SingleTag, GetTag, UpdateTag, DeleteTag } = require("../../../controller/tag/tagController");






const TagRouter = express.Router();

TagRouter.get("/", verifyToken, GetTag);
TagRouter.get("/:id", verifyToken, SingleTag);

TagRouter.post("/", verifyToken, CreateTag);
TagRouter.put("/:id", verifyToken, UpdateTag);
TagRouter.delete("/:id", verifyToken, DeleteTag);

module.exports = TagRouter;

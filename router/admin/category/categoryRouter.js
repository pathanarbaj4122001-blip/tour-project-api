const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const {GetCategory, CreateCategory, UpdateCategory, DeleteCategory, SingleCategory} = require("../../../controller/category/categoryController")





const CategoryRouter = express.Router();

CategoryRouter.get("/", verifyToken, GetCategory);
CategoryRouter.get("/:id", verifyToken, SingleCategory);

CategoryRouter.post("/", verifyToken, CreateCategory);
CategoryRouter.put("/:id", verifyToken, UpdateCategory);
CategoryRouter.delete("/:id", verifyToken, DeleteCategory);

module.exports = CategoryRouter;

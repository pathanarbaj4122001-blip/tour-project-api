const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const {
    GetAllBlogs,
    SingleBlog,
    CreateBlog,
    UpdateBlog,
    DeleteBlog,
} = require("../../../controller/blog/blogController");
const blogUpload = require("../../../middleware/upload/BlogImage");

const BlogRouter = express.Router();

BlogRouter.get("/", verifyToken, GetAllBlogs);
BlogRouter.get("/:id", verifyToken, SingleBlog);

BlogRouter.post("/", verifyToken, blogUpload.single("image"), CreateBlog);
BlogRouter.put("/:id", verifyToken, blogUpload.single("image"), UpdateBlog);
BlogRouter.delete("/:id", verifyToken, DeleteBlog);



module.exports = BlogRouter;

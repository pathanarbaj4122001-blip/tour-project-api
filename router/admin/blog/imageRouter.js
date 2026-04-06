const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { CreateGallery, GetGallery, DeleteGallery } = require("../../../controller/blog/imageController");
const blogUpload = require("../../../middleware/upload/BlogImage");



const BlogGalleryRouter = express.Router();

BlogGalleryRouter.get("/:id",  verifyToken, GetGallery);
BlogGalleryRouter.post("/:id", blogUpload.single('image'), verifyToken, CreateGallery);
// GalleryRouter.put("/:id", verifyToken, UpdateHighlights);
BlogGalleryRouter.delete("/:id", verifyToken, DeleteGallery);

module.exports = BlogGalleryRouter;

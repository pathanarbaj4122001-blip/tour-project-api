const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { CreateGallery, GetGallery, DeleteGallery } = require("../../../controller/tour/imageController");
const upload = require("../../../middleware/upload/TourImage");



const GalleryRouter = express.Router();

GalleryRouter.get("/:id",  verifyToken, GetGallery);
GalleryRouter.post("/:id", upload.single('image'), verifyToken, CreateGallery);
// GalleryRouter.put("/:id", verifyToken, UpdateHighlights);
GalleryRouter.delete("/:id", verifyToken, DeleteGallery);

module.exports = GalleryRouter;

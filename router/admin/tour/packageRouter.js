const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const {
  GetTourPackage,
  SingleTourPackage,
  CreateTourPackage,
  UpdateTourPackage,
  DeleteTourPackage,
} = require("../../../controller/Tour/PackageController");

const TourPackageRouter = express.Router();

TourPackageRouter.get("/", verifyToken, GetTourPackage);
TourPackageRouter.get("/:id", verifyToken, SingleTourPackage);
TourPackageRouter.post("/", verifyToken, CreateTourPackage);
TourPackageRouter.put("/:id", verifyToken, UpdateTourPackage);
TourPackageRouter.delete("/:id", verifyToken, DeleteTourPackage);

module.exports = TourPackageRouter;

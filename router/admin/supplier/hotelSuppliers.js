const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetHotelSuppliers, SingleHoteltSupplier, GetActiveHotelSuppliers, CreateHotelSupplier, UpdateHotelSupplier, DeleteHotelSupplier } = require("../../../controller/supplier/hotelSupplier");

const HotelSupplierRouter = express.Router();

HotelSupplierRouter.get("/active", verifyToken,  GetActiveHotelSuppliers);
HotelSupplierRouter.get("/", verifyToken, GetHotelSuppliers);
HotelSupplierRouter.get("/:id", verifyToken, SingleHoteltSupplier);
HotelSupplierRouter.post("/", verifyToken,  CreateHotelSupplier);
HotelSupplierRouter.put("/:id", verifyToken,  UpdateHotelSupplier);
HotelSupplierRouter.delete("/:id", verifyToken, DeleteHotelSupplier);



module.exports = HotelSupplierRouter;

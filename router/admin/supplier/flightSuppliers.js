const express = require("express");
const { verifyToken } = require("../../../middleware/jwt");
const { GetFlightSuppliers, SingleFlightSupplier, CreateFlightSupplier, UpdateFlightSupplier, DeleteFlightSupplier, GetActiveFlightSuppliers } = require("../../../controller/supplier/flightSupplier");


const FlightSupplierRouter = express.Router();

FlightSupplierRouter.get("/active", verifyToken,  GetActiveFlightSuppliers);
FlightSupplierRouter.get("/", verifyToken, GetFlightSuppliers);
FlightSupplierRouter.get("/:id", verifyToken, SingleFlightSupplier);
FlightSupplierRouter.post("/", verifyToken,  CreateFlightSupplier);
FlightSupplierRouter.put("/:id", verifyToken,  UpdateFlightSupplier);
FlightSupplierRouter.delete("/:id", verifyToken, DeleteFlightSupplier);



module.exports = FlightSupplierRouter;

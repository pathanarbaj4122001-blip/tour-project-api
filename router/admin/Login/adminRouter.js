const express = require("express")
const { Postlogin, CheckAuth } = require("../../../controller/login/adminController")
const {verifyToken} = require("../../../middleware/jwt")


const AdminRouter = express.Router()

AdminRouter.post("/", Postlogin)
AdminRouter.get("/check_auth",verifyToken, CheckAuth)
module.exports = AdminRouter

const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser");

require("dotenv/config")
const pool = require("./config/db")
const admin = require("./router/admin/admin")
const app = express()

app.use("/upload", express.static("upload")) 


app.use(express.json())
app.use(express.urlencoded({extended : false}))

// cookies
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://your-frontend-url.vercel.app" // Apne live frontend ka URL yahan dalein
    : "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser());
// cookies

app.use("/api/v1/admin", admin)

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
  console.log(`server started = ${process.env.PORT}` );
})
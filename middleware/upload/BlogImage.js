const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/blogImage"); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.floor(Math.random() * 1000);
    cb( null, uniqueName + path.extname(file.originalname));
  },
});


const blogUpload = multer({
  storage: storage,
});

module.exports = blogUpload;

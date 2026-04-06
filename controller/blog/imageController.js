const path = require("path");
const pool = require("../../config/db");
const fs = require("fs");

// GET GALLERY
exports.GetGallery = async (req, res) => {
  try {
    const BlogId = req.params.id;

    const query =
      "SELECT * FROM tbl_blog_gallery WHERE blog_id = $1 ORDER BY id DESC";

    const result = await pool.query(query, [BlogId]);

    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE GALLERY
exports.CreateGallery = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const imagename = req.file ? req.file.filename : null;

    if (!imagename) {
      return res.status(400).json({ message: "Image is required" });
    }

    const sql =
      "INSERT INTO tbl_blog_gallery (blog_id, image) VALUES ($1, $2) RETURNING id";

    const result = await pool.query(sql, [BlogId, imagename]);

    res.status(201).json({
      message: "Image Added 👌",
      id: result.rows[0].id,
      image: imagename,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE GALLERY
exports.DeleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const selectQuery =
      "SELECT image FROM tbl_blog_gallery WHERE id = $1";

    const result = await pool.query(selectQuery, [id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Image record not found in database" });
    }

    const imageName = result.rows[0].image;

    const filePath = path.join(
      __dirname,
      "../../upload/blogImage",
      imageName
    );

    const deleteQuery =
      "DELETE FROM tbl_blog_gallery WHERE id = $1";

    await pool.query(deleteQuery, [id]);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      message: "Gallery image and file deleted successfully! 🗑️",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const path = require("path");
const fs = require("fs");
const pool = require("../../config/db");


// GET Gallery
exports.GetGallery = async (req, res) => {
  try {
    const packageId = req.params.id;

    const query = `
      SELECT * 
      FROM tbl_tour_gallery 
      WHERE package_id = $1
      ORDER BY id DESC
    `;

    const { rows } = await pool.query(query, [packageId]);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// CREATE Gallery
exports.CreateGallery = async (req, res) => {
  try {
    const packageId = req.params.id;
    const imageName = req.file ? req.file.filename : null;

    if (!imageName) {
      return res.status(400).json({ message: "Image is required" });
    }

    const query = `
      INSERT INTO tbl_tour_gallery (package_id, image)
      VALUES ($1, $2)
      RETURNING id
    `;

    const { rows } = await pool.query(query, [packageId, imageName]);

    res.status(201).json({
      message: "Gallery image added successfully",
      id: rows[0].id,
      image: imageName,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE Gallery
exports.DeleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const selectQuery = `SELECT image FROM tbl_tour_gallery WHERE id = $1`;
    const { rows } = await pool.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Image record not found" });
    }

    const imageName = rows[0].image;

    const filePath = path.join(
      __dirname,
      "../../upload/tourImage",
      imageName
    );

    const deleteQuery = `DELETE FROM tbl_tour_gallery WHERE id = $1`;
    await pool.query(deleteQuery, [id]);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("File delete error:", err);
      }
    });

    res.status(200).json({
      message: "Gallery image and file deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const pool = require("../../config/db");

// GET ALL CATEGORY
exports.GetCategory = async (req, res) => {
  try {
    const query = "SELECT * FROM tbl_category ORDER BY id DESC";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SINGLE CATEGORY
exports.SingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Category id is required",
      });
    }

    const query = "SELECT * FROM tbl_category WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE CATEGORY
exports.CreateCategory = async (req, res) => {
  try {
    let { category_name, slug, description, status } = req.body || {};

    if (!category_name || !slug || !description) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const CategoryName = category_name.trim();
    const Slug = slug.trim();
    const Description = description.trim();

    const checkQuery =
      "SELECT id FROM tbl_category WHERE category_name = $1 OR slug = $2";

    const checkResult = await pool.query(checkQuery, [CategoryName, Slug]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    const insertQuery = `
      INSERT INTO tbl_category (category_name, slug, description, status)
      VALUES ($1,$2,$3,$4)
      RETURNING id
    `;

    const insertResult = await pool.query(insertQuery, [
      CategoryName,
      Slug,
      Description,
      status,
    ]);

    return res.status(201).json({
      message: "Created successfully",
      insertId: insertResult.rows[0].id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CATEGORY
exports.UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let { category_name, slug, description, status } = req.body || {};

    if (!id) {
      return res.status(400).json({
        message: "Category id is required",
      });
    }

    if (!category_name || !slug || !description) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const CategoryName = category_name.trim();
    const Slug = slug.trim();
    const Description = description.trim();

    const checkQuery = `
      SELECT id FROM tbl_category
      WHERE (category_name = $1 OR slug = $2) AND id != $3
    `;

    const checkResult = await pool.query(checkQuery, [
      CategoryName,
      Slug,
      id,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({
        message: "Category name or slug already exists",
      });
    }

    const updateQuery = `
      UPDATE tbl_category
      SET category_name=$1, slug=$2, description=$3, status=$4
      WHERE id=$5
    `;

    await pool.query(updateQuery, [
      CategoryName,
      Slug,
      Description,
      status,
      id,
    ]);

    return res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CATEGORY
exports.DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuery = "DELETE FROM tbl_category WHERE id = $1";

    await pool.query(deleteQuery, [id]);

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
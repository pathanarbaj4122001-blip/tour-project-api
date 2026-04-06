const pool = require("../../config/db");

// GET ALL TAGS
exports.GetTag = async (req, res) => {
  try {
    const query = "SELECT * FROM tbl_tag ORDER BY id DESC";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TAG
exports.SingleTag = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Tag id is required" });
    }

    const query = "SELECT * FROM tbl_tag WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE TAG
exports.CreateTag = async (req, res) => {
  try {
    let { tag_name, slug, description, status } = req.body || {};

    if (!tag_name || !slug || !description) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const TagName = tag_name.trim();
    const Slug = slug.trim();
    const Description = description.trim();

    // Check duplicate
    const checkQuery = "SELECT id FROM tbl_tag WHERE tag_name = $1 OR slug = $2";
    const checkResult = await pool.query(checkQuery, [TagName, Slug]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: "Tag already exists" });
    }

    const insertQuery = `
      INSERT INTO tbl_tag (tag_name, slug, description, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const insertResult = await pool.query(insertQuery, [
      TagName,
      Slug,
      Description,
      status,
    ]);

    res.status(201).json({
      message: "Created successfully",
      insertId: insertResult.rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TAG
exports.UpdateTag = async (req, res) => {
  try {
    const { id } = req.params;
    let { tag_name, slug, description, status } = req.body || {};

    if (!id) {
      return res.status(400).json({ message: "Tag id is required" });
    }
    if (!tag_name || !slug || !description) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const TagName = tag_name.trim();
    const Slug = slug.trim();
    const Description = description.trim();

    // Check duplicate excluding current id
    const checkQuery = `
      SELECT id FROM tbl_tag WHERE (tag_name = $1 OR slug = $2) AND id != $3
    `;
    const checkResult = await pool.query(checkQuery, [TagName, Slug, id]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: "Tag name or slug already exists" });
    }

    const updateQuery = `
      UPDATE tbl_tag
      SET tag_name = $1, slug = $2, description = $3, status = $4
      WHERE id = $5
    `;
    await pool.query(updateQuery, [TagName, Slug, Description, status, id]);

    res.status(200).json({ message: "Tag updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TAG
exports.DeleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM tbl_tag WHERE id = $1";
    await pool.query(deleteQuery, [id]);

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
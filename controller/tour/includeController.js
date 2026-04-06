const pool = require("../../config/db"); // PostgreSQL pool

// GET all includes for a package
exports.GetInclude = async (req, res) => {
  try {
    const packageId = req.params.id;
    const query = `
      SELECT * 
      FROM tbl_tour_include 
      WHERE package_id = $1
      ORDER BY id DESC
    `;
    const { rows } = await pool.query(query, [packageId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.CreateInclude = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { include_name } = req.body;

    if (!include_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      INSERT INTO tbl_tour_include (package_id, include_name)
      VALUES ($1, $2)
      RETURNING id
    `;
    const { rows } = await pool.query(query, [packageId, include_name]);
    res.status(201).json({
      message: "Include created successfully",
      insertId: rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an include
exports.UpdateInclude = async (req, res) => {
  try {
    const id = req.params.id;
    const { include_name } = req.body;

    if (!include_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      UPDATE tbl_tour_include
      SET include_name = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id
    `;
    const { rows } = await pool.query(query, [include_name, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Include not found" });
    }

    res.status(200).json({ message: "Include updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE an include
exports.DeleteInclude = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM tbl_tour_include WHERE id = $1 RETURNING id`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Include not found" });
    }

    res.status(200).json({ message: "Include deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
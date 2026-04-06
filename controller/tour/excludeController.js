const pool = require("../../config/db"); 

// GET all exclusions for a package
exports.GetExclude = async (req, res) => {
  try {
    const packageId = req.params.id;
    const query = `
      SELECT * 
      FROM tbl_tour_exclude 
      WHERE package_id = $1
      ORDER BY id DESC
    `;
    const { rows } = await pool.query(query, [packageId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new exclusion
exports.CreateExclude = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { exclude_name } = req.body;

    if (!exclude_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      INSERT INTO tbl_tour_exclude (package_id, exclude_name)
      VALUES ($1, $2)
      RETURNING id
    `;
    const { rows } = await pool.query(query, [packageId, exclude_name]);
    res.status(201).json({
      message: "Exclusion created successfully",
      insertId: rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an exclusion
exports.UpdateExclude = async (req, res) => {
  try {
    const id = req.params.id;
    const { exclude_name } = req.body;

    if (!exclude_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      UPDATE tbl_tour_exclude
      SET exclude_name = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id
    `;
    const { rows } = await pool.query(query, [exclude_name, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Exclusion not found" });
    }

    res.status(200).json({ message: "Exclusion updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE an exclusion
exports.DeleteExclude = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM tbl_tour_exclude WHERE id = $1 RETURNING id`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Exclusion not found" });
    }

    res.status(200).json({ message: "Exclusion deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const pool = require("../../config/db"); // PostgreSQL pool

// GET all term & conditions for a package
exports.GetTermCondition = async (req, res) => {
  try {
    const packageId = req.params.id;
    const query = `
      SELECT * 
      FROM tbl_tour_term_condition 
      WHERE package_id = $1
      ORDER BY id DESC
    `;
    const { rows } = await pool.query(query, [packageId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new term & condition
exports.CreateTermCondition = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { term_condition } = req.body;

    if (!term_condition) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      INSERT INTO tbl_tour_term_condition (package_id, term_condition)
      VALUES ($1, $2)
      RETURNING id
    `;
    const { rows } = await pool.query(query, [packageId, term_condition]);
    res.status(201).json({
      message: "Created successfully",
      insertId: rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a term & condition
exports.UpdateTermCondition = async (req, res) => {
  try {
    const id = req.params.id;
    const { term_condition } = req.body;

    if (!term_condition) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      UPDATE tbl_tour_term_condition
      SET term_condition = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id
    `;
    const { rows } = await pool.query(query, [term_condition, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Term & condition not found" });
    }

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a term & condition
exports.DeleteTermCondition = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM tbl_tour_term_condition WHERE id = $1 RETURNING id`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Term & condition not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
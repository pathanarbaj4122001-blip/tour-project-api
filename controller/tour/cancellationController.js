const pool = require("../../config/db");

// GET: Package ID ke basis par saare cancellation policies lana
exports.GetCancellation = async (req, res) => {
  try {
    const packageId = req.params.id;
    const query = `SELECT * FROM tbl_tour_cancellation WHERE package_id = $1 ORDER BY id DESC`;
    
    const { rows } = await pool.query(query, [packageId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST: Nayi cancellation policy create karna
exports.CreateCancellation = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { cancellation_name } = req.body;

    if (!cancellation_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      INSERT INTO tbl_tour_cancellation (package_id, cancellation_name)
      VALUES ($1, $2)
      RETURNING id
    `;

    const { rows } = await pool.query(query, [packageId, cancellation_name]);
    res.status(201).json({
      message: "Created successfully",
      insertId: rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT: Specific ID (policy ID) ke basis par update karna
exports.UpdateCancellation = async (req, res) => {
  try {
    const id = req.params.id;
    const { cancellation_name } = req.body;

    if (!cancellation_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      UPDATE tbl_tour_cancellation
      SET cancellation_name = $1
      WHERE id = $2
      RETURNING id
    `;

    const { rows } = await pool.query(query, [cancellation_name, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Cancellation policy not found" });
    }

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Specific ID ke basis par delete karna
exports.DeleteCancellation = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM tbl_tour_cancellation WHERE id = $1 RETURNING id`;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const pool = require("../../config/db"); // PostgreSQL pool

// GET all highlights for a package
exports.GetHighlights = async (req, res) => {
  try {
    const packageId = req.params.id;
    const query = `
      SELECT * 
      FROM tbl_tour_highlights 
      WHERE package_id = $1 
      ORDER BY id DESC
    `;
    const { rows } = await pool.query(query, [packageId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a highlight
exports.CreateHighlights = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { highlights } = req.body;

    if (!highlights) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      INSERT INTO tbl_tour_highlights (package_id, highlights)
      VALUES ($1, $2)
      RETURNING id
    `;

    const { rows } = await pool.query(query, [packageId, highlights]);
    res.status(201).json({
      message: "Highlight created successfully",
      insertId: rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a highlight
exports.UpdateHighlights = async (req, res) => {
  try {
    const id = req.params.id;
    const { highlights } = req.body;

    if (!highlights) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      UPDATE tbl_tour_highlights
      SET highlights = $1
      WHERE id = $2
      RETURNING id
    `;

    const { rows } = await pool.query(query, [highlights, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Highlight not found" });
    }

    res.status(200).json({ message: "Highlight updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a highlight
exports.DeleteHighlights = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM tbl_tour_highlights WHERE id = $1 RETURNING id`;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Highlight not found" });
    }

    res.status(200).json({ message: "Highlight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
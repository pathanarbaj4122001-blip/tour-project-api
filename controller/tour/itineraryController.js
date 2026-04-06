const pool = require("../../config/db"); // PostgreSQL pool

// GET all itineraries for a package
exports.GetItinerary = async (req, res) => {
  try {
    const packageId = req.params.id;
    const query = `
      SELECT * 
      FROM tbl_tour_itinerary 
      WHERE package_id = $1
      ORDER BY id DESC
    `;
    const { rows } = await pool.query(query, [packageId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new itinerary
exports.CreateItinerary = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { itinerary_name } = req.body;

    if (!itinerary_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      INSERT INTO tbl_tour_itinerary (package_id, itinerary_name)
      VALUES ($1, $2)
      RETURNING id
    `;
    const { rows } = await pool.query(query, [packageId, itinerary_name]);
    res.status(201).json({
      message: "Itinerary created successfully",
      insertId: rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an itinerary
exports.UpdateItinerary = async (req, res) => {
  try {
    const id = req.params.id;
    const { itinerary_name } = req.body;

    if (!itinerary_name) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const query = `
      UPDATE tbl_tour_itinerary
      SET itinerary_name = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id
    `;
    const { rows } = await pool.query(query, [itinerary_name, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json({ message: "Itinerary updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE an itinerary
exports.DeleteItinerary = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM tbl_tour_itinerary WHERE id = $1 RETURNING id`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const pool = require("../../config/db"); // PostgreSQL pool

// GET all tour packages
exports.GetTourPackage = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tbl_tour_package ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single tour package
exports.SingleTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM tbl_tour_package WHERE id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Tour package not found" });
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE tour package
exports.CreateTourPackage = async (req, res) => {
  try {
    const {
      tour_code, tour_name, tour_type, country, city, supplier,
      language, rating, availability_from_date, availability_end_date, duration,
      min_child_age, max_child_age, min_youth_age, max_youth_age, min_senior_age, max_senior_age,
      discount_percentage, description, currency, per_adult_price, per_child_price, per_senior_price,
      per_youth_price, meta_title, meta_keyword, meta_description, status, recomended
    } = req.body;

    if (!tour_code || !tour_name || !tour_type || !country || !city || !duration || !supplier)
      return res.status(400).json({ message: "Required fields are missing" });

    // check if tour_code exists
    const existing = await pool.query("SELECT * FROM tbl_tour_package WHERE tour_code = $1", [tour_code]);
    if (existing.rows.length > 0)
      return res.status(409).json({ message: "Tour already exists" });

    const insertQuery = `
  INSERT INTO tbl_tour_package (
  tour_code, tour_name, tour_type, country, city, supplier,
  language, rating, availability_from_date, availability_end_date, duration,
  min_child_age, max_child_age, min_youth_age, max_youth_age, min_senior_age, max_senior_age,
  discount_percentage, description, currency, per_adult_price, per_child_price, per_senior_price,
  per_youth_price, meta_title, meta_keyword, meta_description, status, recomended
) VALUES (
  $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29
)
RETURNING id
  `;

    const values = [
      tour_code, tour_name, tour_type, country, city, supplier,
      language || null, Number(rating) || null,
      availability_from_date || null, availability_end_date || null, duration || null,
      Number(min_child_age) || null, Number(max_child_age) || null,
      Number(min_youth_age) || null, Number(max_youth_age) || null,
      Number(min_senior_age) || null, Number(max_senior_age) || null,
      Number(discount_percentage) || null,
      description || null, currency || null,
      Number(per_adult_price) || null, Number(per_child_price) || null, Number(per_senior_price) || null,
      Number(per_youth_price) || null, meta_title || null, meta_keyword || null, meta_description || null,
      status || null, recomended || null
    ];

    const { rows } = await pool.query(insertQuery, values);
    res.status(201).json({ message: "Package created successfully", insertId: rows[0].id });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE tour package
exports.UpdateTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tour_code, tour_name, tour_type, country, city, supplier,
      language, rating, availability_from_date, availability_end_date, duration,
      min_child_age, max_child_age, min_youth_age, max_youth_age, min_senior_age, max_senior_age,
      discount_percentage, description, currency, per_adult_price, per_child_price, per_senior_price,
      per_youth_price, meta_title, meta_keyword, meta_description, status, recomended
    } = req.body;

    if (!id) return res.status(400).json({ message: "Tour package ID is required" });

    const existing = await pool.query("SELECT 1 FROM tbl_tour_package WHERE id = $1", [id]);
    if (existing.rows.length === 0) return res.status(404).json({ message: "Package not found" });

    const duplicate = await pool.query("SELECT 1 FROM tbl_tour_package WHERE tour_code = $1 AND id != $2", [tour_code, id]);
    if (duplicate.rows.length > 0) return res.status(400).json({ message: "Package code already exists" });

    const updateQuery = `
      UPDATE tbl_tour_package SET
        tour_code=$1, tour_name=$2, tour_type=$3, country=$4, city=$5, supplier=$6,
        language=$7, rating=$8, availability_from_date=$9, availability_end_date=$10, duration=$11,
        min_child_age=$12, max_child_age=$13, min_youth_age=$14, max_youth_age=$15, min_senior_age=$16, max_senior_age=$17,
        discount_percentage=$18, description=$19, currency=$20, per_adult_price=$21, per_child_price=$22, per_senior_price=$23,
        per_youth_price=$24, meta_title=$25, meta_keyword=$26, meta_description=$27, status=$28, recomended=$29
      WHERE id=$30
    `;

    const values = [
      tour_code, tour_name, tour_type, country, city, supplier,
      language, rating, availability_from_date, availability_end_date, duration,
      min_child_age, max_child_age, min_youth_age, max_youth_age, min_senior_age, max_senior_age,
      discount_percentage, description, currency, per_adult_price, per_child_price, per_senior_price,
      per_youth_price, meta_title, meta_keyword, meta_description, status, recomended,
      id
    ];

    await pool.query(updateQuery, values);
    res.status(200).json({ message: "Package updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE tour package
exports.DeleteTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM tbl_tour_package WHERE id = $1", [id]);
    if (rowCount === 0) return res.status(404).json({ message: "Package not found" });

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
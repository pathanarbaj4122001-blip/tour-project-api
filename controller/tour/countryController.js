const pool = require("../../config/db"); 

// Get cities by country code
exports.GetCityByCountry = async (req, res) => {
  const countryCode = req.params.country_code;

  try {
    const sql = "SELECT * FROM tbl_tbo_city WHERE country_code = $1";
    const { rows } = await pool.query(sql, [countryCode]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all cities
exports.GetCity = async (req, res) => {
  try {
    const sql = "SELECT * FROM tbl_tbo_city";
    const { rows } = await pool.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all countries
exports.GetCountry = async (req, res) => {
  try {
    const sql = "SELECT * FROM tbl_tbo_country";
    const { rows } = await pool.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
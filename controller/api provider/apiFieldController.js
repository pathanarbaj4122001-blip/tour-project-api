const pool = require("../../config/db");


// GET ALL FIELDS
exports.GetApiFields = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM api_fields ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.SingleApiFields = async (req, res) => {
  const id = req.params.id;
  
  const data = await pool.query("SELECT * FROM api_fields WHERE id=$1", [
    id,
  ]);

  res.json(data.rows[0]);
};


// CREATE FIELD
exports.CreateApiFields = async (req, res) => {
  try {
    const { provider_id, field_label, field_name, field_type, is_required } =
      req.body;

    const result = await pool.query(
      `INSERT INTO api_fields 
      (provider_id, field_label, field_name, field_type, is_required)
      VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [provider_id, field_label, field_name, field_type, is_required]
    );

    res.status(201).json({
      message: "Field created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE FIELD
exports.UpdateApiField = async (req, res) => {
  try {
    const { id } = req.params;

    const { provider_id, field_label, field_name, field_type, is_required } =
      req.body;

    const result = await pool.query(
      `UPDATE api_fields
       SET provider_id=$1,
           field_label=$2,
           field_name=$3,
           field_type=$4,
           is_required=$5
       WHERE id=$6
       RETURNING *`,
      [provider_id, field_label, field_name, field_type, is_required, id]
    );

    res.json({
      message: "Field updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE FIELD
exports.DeleteApiField = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM api_fields WHERE id=$1", [id]);

    res.json({
      message: "Field deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
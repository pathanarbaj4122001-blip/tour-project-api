const pool = require("../../config/db");

exports.GetProviders = async (req, res) => {
  const data = await pool.query("SELECT * FROM api_providers ORDER BY id DESC");
  res.json(data.rows);
};

// GET Single
exports.SingleProvider = async (req, res) => {
  const id = req.params.id;

  const data = await pool.query("SELECT * FROM api_providers WHERE id=$1", [
    id,
  ]);

  res.json(data.rows[0]);
};

// CREATE
exports.CreateProvider = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(404).json({ message: "Required name empty" });
  }

  const Name = name.trim();

  const existing = await pool.query(
    "SELECT * FROM api_providers WHERE name = $1",
    [Name]
  );
  if (existing.rows.length > 0) {
    return res.status(400).json({ message: "Provider name already exists" });
  }
  const data = await pool.query(
    "INSERT INTO api_providers (name,status) VALUES ($1,$2) RETURNING *",
    [Name, true]
  );

  res.json({
    message: "Created successfully",
    data: data.rows[0],
  });
};

// UPDATE
exports.UpdateProvider = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(404).json({ message: "Required name empty" });
  }

  const Name = name.trim();

  const existing = await pool.query(
    "SELECT * FROM api_providers WHERE name = $1 AND id != $2",
    [Name, id]
  );
  if (existing.rows.length > 0) {
    return res.status(400).json({ message: "Provider name already exists" });
  }

  await pool.query("UPDATE api_providers SET name=$1,status=$2 WHERE id=$3", [
    Name,
    true,
    id,
  ]);

  res.json({
    message: "Updated successfully",
  });
};

// DELETE
exports.DeleteProvider = async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM api_providers WHERE id=$1", [id]);

  res.json({
    message: "Deleted successfully",
  });
};

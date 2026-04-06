const pool = require("../../config/db");

exports.GetHotelSuppliers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tbl_hotel_suppliers ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.SingleHoteltSupplier = async (req, res) => {
  const id = req.params.id;

  const data = await pool.query(
    "SELECT * FROM tbl_hotel_suppliers WHERE id=$1",
    [id]
  );

  res.json(data.rows[0]);
};

exports.GetActiveHotelSuppliers = async (req, res) => {
    try {
      const data = await pool.query(
        "SELECT * FROM tbl_hotel_suppliers WHERE status = 'Active'"
      );
  
      res.json(data.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };


exports.CreateHotelSupplier = async (req, res) => {
  try {
    const { name, code, status } = req.body;
    if (!name || !code || !status) {
        return res.status(404).json({ message: "Required field empty" });
      }
  
      const Name = name.trim();
      const Code = code.trim();
  
      const existing = await pool.query(
        "SELECT * FROM tbl_hotel_suppliers WHERE name=$1",
        [Name]
      );
      if (existing.rows.length > 0) {
        return res.status(400).json({ message: "Subscription already exists" });
      }

    const result = await pool.query(
      `INSERT INTO tbl_hotel_suppliers
      (name, code, status)
      VALUES ($1,$2,$3) RETURNING *`,
      [Name, Code, status]
    );

    res.status(201).json({
      message: "Flight supplier created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.UpdateHotelSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, code, status } = req.body;
    if (!name || !code || !status) {
        return res.status(404).json({ message: "Required field empty" });
      }
  
      const Name = name.trim();
      const Code = code.trim();
  
      const existing = await pool.query(
        "SELECT * FROM tbl_hotel_suppliers WHERE name=$1 AND id != $2",
        [Name,id]
      );
      if (existing.rows.length > 0) {
        return res.status(400).json({ message: "Subscription already exists" });
      }

    const result = await pool.query(
      `UPDATE tbl_hotel_suppliers
       SET name=$1,
           code=$2,
           status=$3
           WHERE id=$4
       RETURNING *`,
      [Name, Code, status, id]
    );

    res.json({
      message: "Flight supplier updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeleteHotelSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tbl_hotel_suppliers WHERE id=$1", [id]);

    res.json({
      message: "Flight supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

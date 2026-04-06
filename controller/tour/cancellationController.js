const db = require("../../config/db");

exports.GetCancellation = (req, res) => {
  const packageId = req.params.id;
  const Alldata =
    "SELECT * FROM tbl_tour_cancellation WHERE package_id = ? ORDER BY id DESC";

  db.query(Alldata, [packageId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });

    if (data.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(data);
  });
};

exports.CreateCancellation = (req, res) => {
  try {
    const packageId = req.params.id;
    let { cancellation_name	} = req.body || {};

    if (!cancellation_name		) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const insertQuery = `INSERT INTO tbl_tour_cancellation (
        package_id, cancellation_name
      ) VALUES (
        ?, ?
      )`;

    db.query(insertQuery, [packageId, cancellation_name], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(201).json({
        message: "Created successfully",
        insertId: result.insertId,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.UpdateCancellation = (req, res) => {
  try {
    const id = req.params.id;
    let { cancellation_name } = req.body || {};

    const updateQuery = `
        UPDATE tbl_tour_cancellation SET           
         cancellation_name = ?     
        WHERE id = ?
      `;

    db.query(updateQuery, [cancellation_name, id], (err3, result3) => {
      if (err3) return res.status(500).json({ message: err3.message });

      return res.status(200).json({
        message: "Updated successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.DeleteCancellation = (req, res) => {
  const { id } = req.params;
  const getQuery = "DELETE FROM tbl_tour_cancellation WHERE id = ?";

  db.query(getQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({
      message: "Deleted successfully",
    });
  });
};

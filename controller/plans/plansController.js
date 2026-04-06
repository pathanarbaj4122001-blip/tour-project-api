const pool = require("../../config/db");

// GET ALL Plans
exports.GetPlans = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM plans ORDER BY id DESC");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// GET Single Plan
exports.SinglePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM plans WHERE id=$1", [id]);
    if (data.rows.length === 0)
      return res.status(404).json({ message: "Plan not found" });
    res.json(data.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plan" });
  }
};

// CREATE Plan
// CREATE Plan
exports.CreatePlan = async (req, res) => {
  try {
    let {
      plan_name,
      price_per_month,
      max_hotels,
      api_calls,
      max_suppliers,
      support_level,
      start_date,
      expiry_date,
      plan_description,
    } = req.body;

    if (!plan_name) {
      return res
        .status(404)
        .json({ message: "Required field plan_name empty" });
    }

    plan_name = plan_name.trim() || "Default Plan";
    price_per_month = price_per_month.trim() || "0";
    max_hotels = max_hotels.trim() || "0";
    api_calls = api_calls.trim() || "0";
    max_suppliers = max_suppliers.trim() || "0";
    support_level = support_level || "Basic";
    plan_description = plan_description.trim() || "";

    const existing = await pool.query(
      "SELECT * FROM plans WHERE plan_name=$1",
      [plan_name]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Plan already exists" });
    }

    start_date = start_date || new Date().toISOString().split("T")[0];
    expiry_date =
      expiry_date ||
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0];

    const data = await pool.query(
      `INSERT INTO plans 
        (plan_name, price_per_month, max_hotels, api_calls, max_suppliers, support_level, start_date, expiry_date, plan_description)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        plan_name,
        price_per_month,
        max_hotels,
        api_calls,
        max_suppliers,
        support_level,
        start_date,
        expiry_date,
        plan_description,
      ]
    );

    res.json({
      message: "Plan created successfully",
      data: data.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create plan" });
  }
};
// UPDATE Plan
exports.UpdatePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      plan_name,
      price_per_month,
      max_hotels,
      api_calls,
      max_suppliers,
      support_level,
      start_date,
      expiry_date,
      plan_description,
    } = req.body;

    if (!plan_name) {
      return res
        .status(404)
        .json({ message: "Required field plan_name empty" });
    }

    const existing = await pool.query(
      "SELECT * FROM plans WHERE plan_name=$1 AND id != $2",
      [plan_name,id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Plan already exists" });
    }

    await pool.query(
      `UPDATE plans SET 
        plan_name=$1,
        price_per_month=$2,
        max_hotels=$3,
        api_calls=$4,
        max_suppliers=$5,
        support_level=$6,
        start_date=$7,
        expiry_date=$8,
        plan_description=$9
      WHERE id=$10`,
      [
        plan_name,
        price_per_month,
        max_hotels,
        api_calls,
        max_suppliers,
        support_level,
        start_date,
        expiry_date,
        plan_description,
        id,
      ]
    );

    res.json({ message: "Plan updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

// DELETE Plan
exports.DeletePlan = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM plans WHERE id=$1", [id]);
    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete plan" });
  }
};

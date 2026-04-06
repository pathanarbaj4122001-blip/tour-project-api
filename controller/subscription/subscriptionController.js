const pool = require("../../config/db");

exports.GetSubscriptions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subscriptions ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.SingleSubscription = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM subscriptions WHERE id=$1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.CreateSubscription = async (req, res) => {
  try {
    const {
      client_name,
      client_email,
      phone,
      plan,
      billing_cycle,
      start_date,
      expiry_date,
      flight_suppliers,
      hotel_suppliers,
    } = req.body;

    if (
      !client_name ||
      !client_email ||
      !phone ||
      !plan ||
      !billing_cycle ||
      !start_date ||
      !expiry_date
    ) {
      return res.status(404).json({ message: "Required  field empty" });
    }

    const Client_name = client_name.trim();
    const Client_email = client_email.trim();
    const Phone = phone.trim();

    const existing = await pool.query(
      "SELECT * FROM subscriptions WHERE client_email=$1 AND phone=$2",
      [Client_email, Phone]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Subscription already exists" });
    }

    const result = await pool.query(
      `INSERT INTO subscriptions
      (client_name, client_email, phone, plan, billing_cycle, start_date, expiry_date, flight_suppliers, hotel_suppliers)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        Client_name,
        Client_email,
        Phone,
        plan,
        billing_cycle,
        start_date,
        expiry_date,
        flight_suppliers,
        hotel_suppliers,
      ]
    );

    res.status(201).json({
      message: "Subscription created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE SUBSCRIPTION
exports.UpdateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      client_name,
      client_email,
      phone,
      plan,
      billing_cycle,
      start_date,
      expiry_date,
      flight_suppliers,
      hotel_suppliers,
    } = req.body;

    if (
      !client_name ||
      !client_email ||
      !phone ||
      !plan ||
      !billing_cycle ||
      !start_date ||
      !expiry_date
    ) {
      return res.status(404).json({ message: "Required  field empty" });
    }

    const Client_name = client_name.trim();
    const Client_email = client_email.trim();
    const Phone = phone.trim();

    const existing = await pool.query(
      "SELECT * FROM subscriptions WHERE (client_email=$1 AND phone=$2) AND id != $3",
      [Client_email, Phone, id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Subscription already exists" });
    }

    const result = await pool.query(
      `UPDATE subscriptions
       SET client_name=$1,
           client_email=$2,
           phone=$3,
           plan=$4,
           billing_cycle=$5,
           start_date=$6,
           expiry_date=$7,
           flight_suppliers=$8,
           hotel_suppliers=$9
       WHERE id=$10
       RETURNING *`,
      [
        Client_name,
        Client_email,
        Phone,
        plan,
        billing_cycle,
        start_date,
        expiry_date,
        flight_suppliers,
        hotel_suppliers,
        id,
      ]
    );

    res.json({
      message: "Subscription updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SUBSCRIPTION
exports.DeleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM subscriptions WHERE id=$1", [id]);
    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

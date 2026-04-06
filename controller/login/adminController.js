const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
require("dotenv/config");

exports.Postlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill data" });
    }

    const Username = username.trim();
    const Password = password.trim();

    const query =
      "SELECT * FROM superadmin WHERE username = $1 AND password = $2";

    const result = await pool.query(query, [Username, Password]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Wrong Your Username & Password" });
    }

    const admin = result.rows[0];

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      process.env.MY_SECRECT_KEY,
      { expiresIn: process.env.TOKEN_EXPIREIN }
    );

    // TOKEN COOKIE ME SAVE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin Successfully Login",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.CheckAuth = async (req, res) => {
  res.status(200).json({
    authenticated: true,
    admin: req.admin,
  });
};
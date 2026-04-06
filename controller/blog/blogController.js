const pool = require("../../config/db");
const fs = require("fs");
const path = require("path");

// CREATE BLOG
exports.CreateBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      content,
      meta_title,
      meta_description,
      meta_keyword,
      status,
      category,
      tag,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    let categoryData = null;
    if (Array.isArray(category)) {
      categoryData = category.join(",");
    } else if (category) {
      categoryData = category;
    }

    if (!title || !slug || !description || !content) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const insertQuery = `
      INSERT INTO tbl_blog (
        title, slug, description, content,
        meta_title, meta_description, meta_keyword,
        status, category, tag, image
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id
    `;

    const values = [
      title?.trim(),
      slug?.trim(),
      description?.trim(),
      content?.trim(),
      meta_title || null,
      meta_description || null,
      meta_keyword || null,
      status || "Draft",
      categoryData,
      tag || null,
      image,
    ];

    const result = await pool.query(insertQuery, values);

    return res.status(201).json({
      message: "Blog created successfully",
      insertId: result.rows[0].id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL BLOGS
exports.GetAllBlogs = async (req, res) => {
  try {
    const query = `SELECT * FROM tbl_blog ORDER BY id DESC`;

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SINGLE BLOG
exports.SingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM tbl_blog WHERE id = $1`;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BLOG
exports.UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      description,
      content,
      meta_title,
      meta_description,
      meta_keyword,
      status,
      category,
      tag,
    } = req.body;

    let categoryString = "";
    if (Array.isArray(category)) {
      categoryString = category.join(",");
    } else {
      categoryString = category || "";
    }

    const blogData = await pool.query(
      `SELECT image FROM tbl_blog WHERE id=$1`,
      [id]
    );

    if (blogData.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const oldImage = blogData.rows[0].image;
    const image = req.file ? req.file.filename : oldImage;

    const updateQuery = `
      UPDATE tbl_blog SET
        title=$1,
        slug=$2,
        description=$3,
        content=$4,
        meta_title=$5,
        meta_description=$6,
        meta_keyword=$7,
        status=$8,
        category=$9,
        tag=$10,
        image=$11
      WHERE id=$12
    `;

    await pool.query(updateQuery, [
      title,
      slug,
      description,
      content,
      meta_title,
      meta_description,
      meta_keyword,
      status,
      categoryString,
      tag,
      image,
      id,
    ]);

    if (req.file && oldImage) {
      const imagePath = path.join(
        __dirname,
        "../../upload/blogImage",
        oldImage
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({
      message: "Blog updated successfully 🎉",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BLOG
exports.DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blogData = await pool.query(
      `SELECT image FROM tbl_blog WHERE id=$1`,
      [id]
    );

    if (blogData.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const imageNames = blogData.rows[0].image;

    await pool.query(`DELETE FROM tbl_blog WHERE id=$1`, [id]);

    if (imageNames) {
      const imagesArray = imageNames.split(",");

      imagesArray.forEach((imgName) => {
        const imagePath = path.join(
          __dirname,
          "../../upload/blogImage",
          imgName.trim()
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    return res.status(200).json({
      message: "Blog and associated images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
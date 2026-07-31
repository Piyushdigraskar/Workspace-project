const pool = require("../config/db");
const path = require("path");

const allowedExtensions = {
  ".js": "javascript",
  ".jsx": "javascript",
  ".ts": "typescript",
  ".tsx": "typescript",
  ".java": "java",
  ".py": "python",
  ".cpp": "cpp",
  ".c": "c",
  ".cs": "csharp",
  ".php": "php",
  ".html": "html",
  ".css": "css",
  ".json": "json",
  ".xml": "xml",
  ".sql": "sql",
  ".md": "markdown",
  ".txt": "text",
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const extension = path.extname(req.file.originalname).toLowerCase();

    const language = allowedExtensions[extension];

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type.",
      });
    }

    const filename = req.file.originalname;
    const content = req.file.buffer.toString("utf8");

    const query = `
      INSERT INTO files (filename, language, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [filename, language, content];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      file: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const query = `
            SELECT id,
                   filename,
                   language,
                   created_at
            FROM files
            ORDER BY created_at DESC;
        `;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      files: result.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch files.",
    });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
};

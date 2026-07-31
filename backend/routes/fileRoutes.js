const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { uploadFile } = require("../controllers/fileController");

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;

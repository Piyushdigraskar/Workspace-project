const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const { uploadFile, getAllFiles } = require("../controllers/fileController");

router.get("/", getAllFiles);

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;

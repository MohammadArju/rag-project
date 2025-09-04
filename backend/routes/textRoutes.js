import express from "express";
import {
  handleFile,
  handleText,
  handleWebsite,
  handleYoutube,

} from "../controllers/textController.js";
import multer from "multer";
import path from "path";

// Disk storage so PDFLoader can read from file path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure uploads/ folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const router = express.Router();

router.post("/store/file", upload.single("file"), handleFile);
router.post("/store/text", upload.none(), handleText);
router.post("/store/website", upload.none(), handleWebsite);
router.post("/store/youtube", upload.none(), handleYoutube);


export default router;

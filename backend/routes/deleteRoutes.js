import express from "express";
import { handleDelete } from "../controllers/deleteController.js";

const router = express.Router();

// ":" param indicate करता है
router.delete("/delete/:sourceId", handleDelete);


export default router;
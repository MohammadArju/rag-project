import express from "express";
import { handleChats } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chats", handleChats);

export default router;


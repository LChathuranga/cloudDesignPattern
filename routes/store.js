import express from "express";
import { addStore, deleteAll, getStore } from "../controllers/store.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/", protect, getStore);
router.post("/", protect, addStore);
router.delete("/all", protect, deleteAll);

export default router;

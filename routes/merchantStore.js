import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createMerchantStore } from "../controllers/merchantStore.js";
const router = express.Router();

router.post("/merchantStore", createMerchantStore);

export default router;

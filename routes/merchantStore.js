import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createMerchantStore, getAllMerchants, getMerchantStoreInfo } from "../controllers/merchantStore.js";
const router = express.Router();

router.post("/merchantStore", createMerchantStore);
router.get("/merchantStore/:merchantStoreId", getMerchantStoreInfo);
router.get("/merchantStore", authMiddleware, getAllMerchants);

export default router;

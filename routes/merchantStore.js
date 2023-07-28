import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createMerchantStore,
  getMerchantStoreInfo,
} from "../controllers/merchantStore.js";
const router = express.Router();

router.post("/merchantStore", createMerchantStore);
router.get("/merchantStore/:merchantStoreId", getMerchantStoreInfo);

export default router;

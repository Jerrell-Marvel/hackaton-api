import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createWeb, getWebData } from "../controllers/web.js";
import { fileUpload } from "../middleware/fileUpload.js";

const router = express.Router();

router.post(
  "/web/:merchantStoreId",
  authMiddleware,

  fileUpload("./public/web-img").fields([
    {
      name: "main-banner-img",
      maxCount: 1,
    },
    {
      name: "product-img",
      maxCount: 4,
    },
  ]),
  createWeb
);

router.get("/web/:merchantStoreName", getWebData);

export default router;

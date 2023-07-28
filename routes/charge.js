import express from "express";
import { charge } from "../controllers/charge.js";

const router = express.Router();

router.post("/charge/:merchantStoreId", charge);

export default router;

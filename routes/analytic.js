import express from "express";
import { getAnalyticNumberByYear } from "../controllers/analytic.js";

const router = express.Router();

router.get("/merchantStore/:name/analytic", getAnalyticNumberByYear);

export default router;

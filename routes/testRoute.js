import express from 'express';
import {addResult, getResult, getAllResult} from '../controllers/testController.js';
const router = express.Router();

router.post("/result", addResult );

router.get("/profile", getResult);

router.get("/leaderboard", getAllResult);

export default router;
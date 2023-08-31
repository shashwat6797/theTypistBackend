import express from 'express';
const router = express.Router();
import { createUser , loginUser, userHome, registerUser, logoutUser, userInfo} from '../controllers/userController.js';

router.post("/signUp", createUser);

router.post("/login", loginUser);

router.get("/home", userHome);

router.get("/register", registerUser);

router.get("/logout", logoutUser);

router.get("/info", userInfo);

export default router;
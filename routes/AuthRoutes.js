import express from "express";
import { Login } from "../controllers/AuthController.js";

const router = express.Router();

// Kemudian disini kita dapat deklarasi router auth
router.post(`/login`,  Login);

export default router;
import express from "express";
import { 
    getNews,
    getNewsBySlug,
    createNews,
    updateNews,
    deleteNews
} from "../controllers/NewsController.js";
import verifyUser from "../middleware/AuthUser.js";

const router = express.Router();

// Deklarasi Routes untuk news 
router.get("/news", getNews);
router.get("/news/:slug", getNewsBySlug);
router.post("/news", verifyUser, createNews);
router.patch("/news/:slug", verifyUser, updateNews);
router.delete("/news/:slug", verifyUser, deleteNews);

export default router;
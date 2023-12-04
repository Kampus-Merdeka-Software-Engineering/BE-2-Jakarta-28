import express from "express";
import { 
    getNews,
    getNewsBySlug,
    createNews,
    updateNews,
    deleteNews
} from "../controllers/NewsController.js";

const router = express.Router();

// Deklarasi Routes untuk news 
router.get("/news", getNews);
router.get("/news/:slug", getNewsBySlug);
router.post("/news", createNews);
router.patch("/news/:slug", updateNews);
router.delete("/news/:slug", deleteNews);

export default router;
import express from "express";
import { 
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
} from "../controllers/BlogController.js";
import verifyUser from "../middleware/AuthUser.js";

const router = express.Router();

// Deklarasi Routes untuk blogs di front end ketika mau diambil
router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getBlogBySlug);

// ini untuk dashboard
router.get("/dashboardBlogs", verifyUser, getBlogs);
router.get("/dashboardBlogs/:slug", verifyUser,getBlogBySlug);
router.post("/dashboardBlogs", verifyUser, createBlog);
router.patch("/dashboardBlogs/:slug", verifyUser, updateBlog);
router.delete("/dashboardBlogs/:slug", verifyUser, deleteBlog);


export default router;
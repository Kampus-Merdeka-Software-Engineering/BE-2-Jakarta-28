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

// Deklarasi Routes untuk blogs 
router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getBlogBySlug);
router.post("/blogs", verifyUser, createBlog);
router.patch("/blogs/:slug", verifyUser, updateBlog);
router.delete("/blogs/:slug", verifyUser, deleteBlog);

export default router;
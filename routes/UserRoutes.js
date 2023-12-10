import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import verifyUser from "../middleware/AuthUser.js";

const router = express.Router();

// Lalu disini kita dapat deklarasikan routesnya dan kita dapat menggunakan middleware verify user
// Jadi apabila mau CRUD, maka kita harus login dulu
router.get('/users', verifyUser, getUsers);
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', verifyUser, createUser);
// router.post('/users', createUser);
router.patch('/users/:id', verifyUser, updateUser);
router.delete('/users/:id', verifyUser, deleteUser);

export default router;
import { Router } from "express";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { deleteUser, getUser, updateUser, getAllUsers, userStats } from "../controllers/user.controller.js";

const router = Router();

// USER UPDATE
router.put("/:id/update", verifyTokenAndAuthorization, updateUser);

// USER DELETE
router.delete("/:id/delete", verifyTokenAndAuthorization, deleteUser);

// GET USER
router.get("/:id/profile", verifyTokenAndAdmin, getUser);

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, getAllUsers);

// GET USERS'S STATS
router.get("/stats", verifyTokenAndAdmin, userStats);

export default router;
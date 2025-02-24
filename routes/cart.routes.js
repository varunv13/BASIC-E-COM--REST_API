import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import { createCart, updateCart, deleteCart, getCart, getAllCarts } from "../controllers/cart.controller.js"

const router = Router();

// Cart CREATE
router.post("/", verifyToken, createCart);

// Cart UPDATE
router.put("/:id/update", verifyTokenAndAuthorization, updateCart);

// Cart DELETE
router.delete("/:id/delete", verifyTokenAndAuthorization, deleteCart);

// GET Cart
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);

// GET ALL CartS
router.get("/", verifyTokenAndAdmin, getAllCarts);

export default router;
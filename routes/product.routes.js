import { Router } from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } from "../controllers/product.controller.js"

const router = Router();

// PRODUCT CREATE
router.post("/", verifyTokenAndAdmin, createProduct);

// PRODUCT UPDATE
router.put("/:id/update", verifyTokenAndAdmin, updateProduct);

// PRODUCT DELETE
router.delete("/:id/delete", verifyTokenAndAdmin, deleteProduct);

// GET PRODUCT
router.get("/:id/product", getProduct);

// GET ALL PRODUCTS
router.get("/", getAllProducts);

export default router;
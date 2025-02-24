import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders, incomeStats } from "../controllers/order.controller.js";

const router = Router();

// Orders CREATE
router.post("/", verifyToken, createOrder);

// Orders UPDATE
router.put("/:id/update", verifyTokenAndAdmin, updateOrder);

// Orders DELETE
router.delete("/:id/delete", verifyTokenAndAdmin, deleteOrder);

// GET Orders
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);

// GET ALL OrdersS
router.get("/", verifyTokenAndAdmin, getAllOrders);

// GET STATS-Income
router.get("/income", verifyTokenAndAdmin, incomeStats);


export default router;
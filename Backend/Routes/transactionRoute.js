import express from "express";
import { getTransactions, createTransaction, deleteTransaction, updateTransaction, getSummary } from "../Controllers/transactionController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", authMiddleware, getSummary);

router.get("/", authMiddleware, getTransactions);

router.post("/", authMiddleware, createTransaction);


router.delete("/:id", authMiddleware, deleteTransaction);

router.put("/:id", authMiddleware, updateTransaction);



export default router;
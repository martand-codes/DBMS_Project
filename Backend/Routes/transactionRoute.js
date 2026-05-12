import express from "express";

import { getTransactions, createTransaction, deleteTransaction, updateTransaction, getSummary } from "../Controllers/transactionController.js";

const router = express.Router();

router.get("/summary", getSummary);

router.get("/", getTransactions);

router.post("/", createTransaction);


router.delete("/:id", deleteTransaction);

router.put("/:id", updateTransaction);



export default router;
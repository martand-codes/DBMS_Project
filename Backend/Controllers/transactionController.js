import connection from "../Database/db.js";
import wrapAsync from "../Middleware/wrapasync.js";

export const getTransactions = wrapAsync(async (req, res) => {

    const user_id = req.user.id;
    
    const query = `
        SELECT
            t.id,
            t.category_id,
            t.title,
            t.amount,
            t.type,
            c.name AS category,
            t.transaction_date
            FROM transactions t
            JOIN categories c
            ON t.category_id = c.id
            WHERE t.user_id = ?
            ORDER BY t.transaction_date DESC
        `;

    const [results] = await connection.query(query, [user_id]);

    res.status(200).json(results);

});

// Creating Transaction

export const createTransaction = wrapAsync(async (req, res) => {

    const user_id = req.user.id;

    const {
        title,
        amount,
        type,
        category_id,
        transaction_date
    } = req.body;

    if (
        !title ||
        !amount ||
        !type ||
        !category_id ||
        !transaction_date
    )
    {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}

    const query = `
        INSERT INTO transactions
        (title, amount, type, category_id, transaction_date, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
    title,
    amount,
    type,
    category_id,
    transaction_date,
    user_id
];

    const [result] = await connection.query(query, values);

    res.status(201).json({
        success: true,
        message: "Transaction Created Successfully",
        insertedId: result.insertId
    });

});

// For deleting Transaction

export const deleteTransaction = wrapAsync(async (req, res) => {

    const { id } = req.params;

    const user_id = req.user.id;

    const query = `
        DELETE FROM transactions
        WHERE id = ? AND user_id = ?
    `;

    const [result] = await connection.query(
        query,
        [id, user_id]
    );

    if (result.affectedRows === 0) {

        return res.status(404).json({
            success: false,
            message: "Transaction Not Found"
        });

    }

    res.status(200).json({
        success: true,
        message: "Transaction Deleted Successfully"
    });

});

// For Updating Transaction

export const updateTransaction = wrapAsync(async (req, res) => {

    const { id } = req.params;

    const user_id = req.user.id;

    const {
        title,
        amount,
        type,
        category_id,
        transaction_date
    } = req.body;

    // Validation
    if (
        !title ||
        !amount ||
        !type ||
        !category_id ||
        !transaction_date
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    const query = `
        UPDATE transactions
        SET
            title = ?,
            amount = ?,
            type = ?,
            category_id = ?,
            transaction_date = ?
        WHERE id = ? AND user_id = ?
    `;

    const values = [
        title,
        amount,
        type,
        category_id,
        transaction_date,
        id,
        user_id
    ];

    const [result] = await connection.query(query, values);

    if (result.affectedRows === 0) {

        return res.status(404).json({
            success: false,
            message: "Transaction Not Found"
        });

    }

    res.status(200).json({
        success: true,
        message: "Transaction Updated Successfully"
    });

});

// For Getting Summary

export const getSummary = wrapAsync(async (req, res) => {

    const user_id = req.user.id;

    const query = `
        SELECT
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,

            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense

        FROM transactions

        WHERE user_id = ?
    `;

    const [results] = await connection.query(
        query,
        [user_id]
    );

    const summary = results[0];

    const balance =
        Number(summary.totalIncome) -
        Number(summary.totalExpense);

    res.status(200).json({
        totalIncome: Number(summary.totalIncome),
        totalExpense: Number(summary.totalExpense),
        balance: Number(balance)
    });

});
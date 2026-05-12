import connection from "../Database/db.js";
import wrapAsync from "../Middleware/wrapasync.js";

export const getCategories = wrapAsync(async (req, res) => {

    const query = `
        SELECT * FROM categories
    `;

    const [results] = await connection.query(query);

    res.status(200).json(results);

});
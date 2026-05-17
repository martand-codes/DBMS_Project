import connection from "../Database/db.js";
import wrapAsync from "../Middleware/wrapasync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = wrapAsync(async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    // Validation
    if (
        !username ||
        !email ||
        !password
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    // Check existing user
    const checkQuery = `
        SELECT * FROM users
        WHERE email = ?
    `;

    const [existingUsers] =
        await connection.query(checkQuery, [email]);

    if (existingUsers.length > 0) {

        return res.status(400).json({
            success: false,
            message: "User already exists"
        });

    }

    // Hash password
    const hashedPassword =
        await bcrypt.hash(password, 10);

    // Insert user
    const insertQuery = `
        INSERT INTO users
        (username, email, password)
        VALUES (?, ?, ?)
    `;

    const values = [
        username,
        email,
        hashedPassword
    ];

    const [result] =
        await connection.query(insertQuery, values);

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        userId: result.insertId
    });

});

// For Login

export const loginUser = wrapAsync(async (req, res) => {

    const {
        email,
        password
    } = req.body;

    // Validation
    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    // Find user
    const query = `
        SELECT * FROM users
        WHERE email = ?
    `;

    const [users] =
        await connection.query(query, [email]);

    if (users.length === 0) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    }

    const user = users[0];

    // Compare password
    const isMatch =
        await bcrypt.compare(password, user.password);

    if (!isMatch) {

        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });

    }

    // Generate token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });

});
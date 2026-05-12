import express from 'express';
import cors from "cors";
import 'dotenv/config';

import './Database/db.js';

import transactionRoutes from './Routes/transactionRoute.js';
import errorMiddleware from './Middleware/errorMiddleware.js';
import categoryRoutes from './Routes/categoryRoute.js';

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/transactions', transactionRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Server is Healthy!");
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server Listening to ${port}`);
});
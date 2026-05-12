import mysql from "mysql2/promise";

let connection;

try {

    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log("MySQL Connected Successfully!");

} catch (err) {

    console.log("Database Connection Failed");
    console.log(err.message);

}

export default connection;
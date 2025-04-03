const { DataSource } = require("typeorm");
const path = require("path");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1234q",
    database: process.env.DB_NAME || "lab2db",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, "..", "data-access", "entities", "*.js")],
});

module.exports = { AppDataSource };
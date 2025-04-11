const { DataSource } = require("typeorm");
const path = require("path");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, "..", "data-access", "entities", "*.js")],
});

module.exports = { AppDataSource };

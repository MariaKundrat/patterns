const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [
        require("./src/entity/course"),
        require("./src/entity/user"),
        require("./src/entity/instructor"),
        require("./src/entity/review")
    ],
});

module.exports = { AppDataSource };
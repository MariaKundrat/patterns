const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "1234q",
    database: process.env.DB_NAME || "lab2db",
    dropSchema: false,
    synchronize: true,
    logging: process.env.DB_LOGGING === "true",
    entities: [
        require("./src/data-access/entities/course"),
        require("./src/data-access/entities/user"),
        require("./src/data-access/entities/instructor"),
        require("./src/data-access/entities/review"),
        require("./src/data-access/entities/specialization"),
        require("./src/entity/subscription"),
        require("./src/data-access/entities/free_subscription"),
        require("./src/data-access/entities/paid_subscription"),
        require("./src/data-access/entities/task"),
        require("./src/data-access/entities/week"),
        require("./src/data-access/entities/deadline"),
    ],
});

module.exports = { AppDataSource };
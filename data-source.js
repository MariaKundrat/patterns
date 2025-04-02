const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "coursera_db",
    dropSchema: false,
    synchronize: false,
    logging: process.env.DB_LOGGING === "true",
    entities: [
        require("./src/entity/course"),
        require("./src/entity/user"),
        require("./src/entity/instructor"),
        require("./src/entity/review"),
        require("./src/entity/specialization"),
        require("./src/entity/subscription"),
        require("./src/entity/free_subscription"),
        require("./src/entity/paid_subscription"),
        require("./src/entity/task"),
        require("./src/entity/week"),
        require("./src/entity/deadline"),
    ],
});

module.exports = { AppDataSource };
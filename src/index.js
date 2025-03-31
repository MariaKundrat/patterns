const express = require("express");
const dotenv = require("dotenv");
require("reflect-metadata");
const { AppDataSource } = require("../data-source");
const { courseController } = require("./config/container");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/courses", courseController.getRouter());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

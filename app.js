const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { AppDataSource } = require("./src/config/data-source");
const CourseRepository = require("./src/data-access/repositories/CourseRepository");
const CourseService = require("./src/bussines_logic/services/courseService");
const courseRoutes = require("./src/public/routes");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "src/public")));

AppDataSource.initialize().then(() => {
    console.log("✅ Database initialized");

    const courseRepository = new CourseRepository(AppDataSource);
    const courseService = new CourseService(courseRepository);

    app.use("/courses", courseRoutes(courseService));

    app.listen(3000, () => {
        console.log("🚀 The server is running on http://localhost:3000");
    });
}).catch((err) => {
    console.error("❌ Database initialization error:", err);
});
const express = require("express");
const router = express.Router();

module.exports = (courseService) => {
    router.get("/", async (req, res) => {
        try {
            const courses = await courseService.getAllCourses();
            res.json(courses);
        } catch (error) {
            console.error("Failed to get courses:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    router.get("/specialization/:id", async (req, res) => {
        try {
            const courses = await courseService.getCoursesBySpecialization(parseInt(req.params.id));
            res.json(courses);
        } catch (error) {
            console.error("Failed to get specialization courses:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const course = await courseService.createCourse(req.body);
            res.status(201).json(course);
        } catch (error) {
            console.error("Failed to create course:", error);
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};
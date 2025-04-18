const express = require("express");
const router = express.Router();

module.exports = (courseService) => {
    router.get("/", async (req, res) => {
        try {
            const courses = await courseService.getAllCourses();
            return res.json(courses);
        } catch (error) {
            console.error("Failed to get courses:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    router.get("/specialization/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const courses = await courseService.getCoursesBySpecialization(id);
            return res.json(courses);
        } catch (error) {
            console.error("Failed to get specialization courses:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const course = await courseService.createCourse(req.body);
            return res.status(201).json(course);
        } catch (error) {
            console.error("Failed to create course:", error);
            return res.status(400).json({ error: error.message });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedCourse = await courseService.updateCourse(id, req.body);
            return res.status(200).json(updatedCourse);
        } catch (error) {
            console.error("Failed to update course:", error);
            return res.status(400).json({ error: error.message });
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            await courseService.deleteCourse(id);
            return res.status(204).send();
        } catch (error) {
            console.error("Failed to delete course:", error);
            return res.status(400).json({ error: error.message });
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const course = await courseService.getCourseById(id);
            if (!course) return res.status(404).json({ error: "Course not found" });
            return res.json(course);
        } catch (error) {
            console.error("Failed to get course:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    return router;
};

const express = require("express");
const router = express.Router();

module.exports = (courseService) => {
    router.get("/", async (req, res) => {
        const courses = await courseService.getAllCourses();
        console.log(`[GET /courses] знайдено `, courses.length, `курсів`);
        return res.json(courses);
    });

    router.post("/", async (req, res) => {
        try {
            const newCourse = await courseService.createCourse(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
            res.json(updatedCourse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const courseId = parseInt(req.params.id, 10);
            const course = await courseService.getCourseById(courseId);
            if (!course) {
                return res.status(404).json({ error: "Course not found" });
            }
            return res.json(course);
        } catch (error) {
            console.error("Failed to get course:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const courseId = parseInt(req.params.id, 10);
            console.log("Delete request for course id:", courseId);
            await courseService.deleteCourse(courseId);
            return res.status(204).send();
        } catch (error) {
            console.error("Failed to delete course:", error);
            return res.status(400).json({ error: error.message });
        }
    });

    return router;
};
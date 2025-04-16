const express = require("express");
const router = express.Router();
const CourseService = require("../../business_logic/services/courseService");

const courseService = new CourseService();

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

router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error("Failed to update course:", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Failed to delete course:", error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const course = await courseService.getCourseById(parseInt(req.params.id));
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ error: "Course not found" });
        }
    } catch (error) {
        console.error("Failed to get course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

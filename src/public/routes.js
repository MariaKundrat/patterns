const express = require("express");
const router = express.Router();

module.exports = (courseService) => {
    router.get("/", async (req, res) => {
        const courses = await courseService.getAllCourses();
        res.json(courses);
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

    return router;
};
const express = require("express");
const router = express.Router();

module.exports = (courseService) => {
    router.get("/", async (req, res) => {
        const courses = await courseService.getAllCourses();
        res.json(courses);
    });

    return router;
};
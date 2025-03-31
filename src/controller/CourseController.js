const express = require("express");
const router = express.Router();

class CourseController {
    constructor(courseService) {
        this.courseService = courseService;

        router.get("/", this.getAll.bind(this));
        router.post("/", this.create.bind(this));
    }

    async getAll(req, res) {
        const courses = await this.courseService.getAllCourses();
        res.json(courses);
    }

    async create(req, res) {
        const newCourse = await this.courseService.createCourse(req.body);
        res.status(201).json(newCourse);
    }

    getRouter() {
        return router;
    }
}

module.exports = CourseController;

const express = require("express");
const router = express.Router();

class CourseController {
    constructor(courseService) {
        this.courseService = courseService;

        router.get("/", this.getAll.bind(this));
        router.post("/", this.create.bind(this));
    }

    /**
   * Get all courses
   * @param {Object} req
   * @param {Object} res
   */
    async getAll(req, res) {
        try {
            const courses = await this.courseService.getAllCourses();
            res.json(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
            res.status(500).json({ error: "Failed to fetch courses" });
        }
    }

    /**
    * Create a new course
    * @param {Object} req
    * @param {Object} res
    */
    async create(req, res) {
        try {
            const newCourse = await this.courseService.createCourse(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            console.error("Error creating course:", error);
            res.status(400).json({ error: "Failed to create course" });
        }
    }

    /**
    * Get the router for this controller
    * @returns {Object}
    */
    getRouter() {
        return router;
    }
}

module.exports = CourseController;

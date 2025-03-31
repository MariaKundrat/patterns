const CourseRepository = require("../repository/courseRepository");
const CourseService = require("../service/courseService");
const CourseController = require("../controller/courseController");

const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService);

module.exports = {
    courseController,
};
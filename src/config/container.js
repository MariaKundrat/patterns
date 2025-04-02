const CourseRepository = require("../repository/courseRepository");
const CourseService = require("../business_logic/services/courseService");
const CourseController = require("../controller/courseController");
const UserRepository = require("../repository/userRepository");
const UserService = require("../business_logic/services/userService");
const UserController = require("../controller/userController");

const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService);
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

module.exports = {
    courseController,
    userController,
};
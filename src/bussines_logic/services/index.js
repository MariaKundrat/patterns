const {
    userRepository,
    subscriptionRepository,
    instructorRepository,
    courseRepository,
    specializationRepository,
    reviewRepository,
    weekRepository,
    taskRepository,
    deadlineRepository,
    csvDataLoader
} = require('../../data-access/repositories');

const UserService = require('./userService');
const CourseService = require('./courseService');
const DataImportService = require('./DataImportService');

// Dependency Injection
const userService = new UserService(userRepository, courseRepository);
const courseService = new CourseService(courseRepository, instructorRepository);
const dataImportService = new DataImportService(
    csvDataLoader,
    userRepository,
    subscriptionRepository,
    instructorRepository,
    courseRepository,
    specializationRepository,
    reviewRepository,
    weekRepository,
    taskRepository,
    deadlineRepository
);

module.exports = {
    userService,
    courseService,
    dataImportService
};
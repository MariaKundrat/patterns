const ICourseService = require("../interfaces/ICourseService");

class CourseService extends ICourseService {
    constructor(courseRepository) {
        super();
        this.courseRepository = courseRepository;
    }
    async getAllCourses() {
        return this.courseRepository.findAll();
    }

    async getCoursesBySpecialization(specializationId) {
        return this.courseRepository.findBySpecialization(specializationId);
    }

    async createCourse(courseData) {
        return this.courseRepository.save(courseData);
    }
}

module.exports = CourseService;
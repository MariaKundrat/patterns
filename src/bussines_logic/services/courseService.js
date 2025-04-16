const ICourseService = require("../interfaces/ICourseService");

class CourseService extends ICourseService {
    constructor(courseRepository) {
        super();
        this.courseRepository = courseRepository;
    }
    async getAllCourses() {
        return this.courseRepository.findAll();
    }

    async getCourseById(courseId) {
        return this.courseRepository.findById(courseId);
    }

    async getCoursesBySpecialization(specializationId) {
        return this.courseRepository.findBySpecialization(specializationId);
    }

    async createCourse(courseData) {
        return this.courseRepository.save(courseData);
    }

    async updateCourse(courseId, courseData) {
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        return this.courseRepository.update(courseId, courseData);
    }

    async deleteCourse(courseId) {
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        return this.courseRepository.delete(courseId);
    }
}

module.exports = CourseService;
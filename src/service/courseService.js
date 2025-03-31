class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async getAllCourses() {
        return await this.courseRepository.getAll();
    }

    async createCourse(data) {
        return await this.courseRepository.create(data);
    }
}

module.exports = CourseService;
const { AppDataSource } = require("../../data-source");

class CourseRepository {
    constructor() {
        this.repo = AppDataSource.getRepository("Course");
    }

    async getAll() {
        return this.repo.find();
    }

    async create(data) {
        const course = this.repo.create(data);
        return this.repo.save(course);
    }
}

module.exports = CourseRepository;
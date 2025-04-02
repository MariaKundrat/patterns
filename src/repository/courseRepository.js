const { AppDataSource } = require("../../data-source");

class CourseRepository {
    constructor() {
        this.repo = AppDataSource.getRepository("Course");
    }

    /**
     * Get all courses
     * @returns {Promise<Array>}
     */
    async getAll() {
        return this.repo.find();
    }

    /**
     * Get a course by ID
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    async getById(id) {
        return this.repo.findOne({ where: { id } });
    }

    /**
     * Create a new course
     * @param {Object} data
     * @returns {Promise<Object>}
     */
    async create(data) {
        const course = this.repo.create(data);
        return this.repo.save(course);
    }

    /**
     * Delete a course by ID
     * @param {number} id
     * @returns {Promise<void>}
     */
    async deleteById(id) {
        await this.repo.delete(id);
    }

    /**
     * Get courses sorted by rating
     * @returns {Promise<Array>}
     */
    async getCoursesByRating() {
        return this.repo.find({ order: { rating: "DESC" } });
    }
}

module.exports = CourseRepository;
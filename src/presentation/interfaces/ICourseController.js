class ICourseController {
    /**
     * Get all courses
     * @param {Object} req
     * @param {Object} res
     */
    async getCourses(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Get a course by its ID
     * @param {Object} req
     * @param {Object} res
     */
    async getCourseById(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Create a new course
     * @param {Object} req
     * @param {Object} res
     */
    async createCourse(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Get courses sorted by rating
     * @param {Object} req
     * @param {Object} res
     */
    async getCoursesByRating(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Get courses taught by a specific instructor
     * @param {Object} req
     * @param {Object} res
     */

    async getCoursesByInstructor(req, res) {
        throw new Error('Method not implemented');
    }
}

module.exports = ICourseController;
class ICourseService {
    /**
     * Get all courses
     * @returns {Promise<Array>}
     */
    async getAllCourses() {
        throw new Error('Method not implemented');
    }

    /**
     * Get a course by its ID
     * @param {number} id
     * @returns {Promise<Object>}
     */
    async getCourseById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * Create a new course
     * @param {Object} courseData
     * @returns {Promise<Object>}
     */
    async createCourse(courseData) {
        throw new Error('Method not implemented');
    }

    /**
     * Get courses sorted by rating in descending order
     * @returns {Promise<Array>}
     */
    async getCoursesByRating() {
        throw new Error('Method not implemented');
    }

    /**
     * Get courses taught by a specific instructor
     * @param {number} instructorId
     * @returns {Promise<Array>}
     */
    async getCoursesByInstructor(instructorId) {
        throw new Error('Method not implemented');
    }
}

module.exports = ICourseService;
class ICourseService {
    /**
     * Get all courses
     * @returns {Promise<Array>}
     */
    async getAllCourses() { }

    /**
     * Get a course by its ID
     * @param {number} specializationId
     * @returns {Promise<Array>}
     */
    async getCoursesBySpecialization(specializationId) { }

    /**
     * Create a new course
     * @param {Object} courseData
     * @returns {Promise<Object>}
     */
    async createCourse(courseData) { }
}

module.exports = ICourseService;
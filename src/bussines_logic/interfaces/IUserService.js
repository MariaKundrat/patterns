class IUserService {
    /**
     * Get all users
     * @returns {Promise<Array>}
     */
    async getAllUsers() {
        throw new Error('Method not implemented');
    }

    /**
     * Get a user by ID
     * @param {number} id
     * @returns {Promise<Object>}
     */
    async getUserById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * Create a new user
     * @param {Object} userData
     * @returns {Promise<Object>}
     */
    async createUser(userData) {
        throw new Error('Method not implemented');
    }

    /**
     * Get courses associated with a user
     * @param {number} userId
     * @returns {Promise<Array>}
     */
    async getUserCourses(userId) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserService;
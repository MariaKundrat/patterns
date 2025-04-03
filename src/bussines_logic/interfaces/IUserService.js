class IUserService {
    /**
     * Get all users
     * @returns {Promise<Array>}
     */
    async getAllUsers() { }

    /**
     * Create a new user
     * @param {Object} userData
     * @returns {Promise<Object>}
     */
    async createUser(userData) { }
}

module.exports = IUserService;
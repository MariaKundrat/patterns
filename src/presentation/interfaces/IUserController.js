class IUserController {
    /**
     * Get all users
     * @param {Object} req
     * @param {Object} res
     */
    async getUsers(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Get a user by ID
     * @param {Object} req
     * @param {Object} res
     */
    async getUserById(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Create a new user
     * @param {Object} req
     * @param {Object} res
     */
    async createUser(req, res) {
        throw new Error('Method not implemented');
    }

    /**
     * Get courses associated with a user
     * @param {Object} req
     * @param {Object} res
     */
    async getUserCourses(req, res) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserController;
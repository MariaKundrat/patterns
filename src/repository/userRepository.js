const { AppDataSource } = require("../../data-source");

class UserRepository {
    constructor() {
        this.repo = AppDataSource.getRepository("User");
    }


    /**
     * Get all users
     * @returns {Promise<Array>}
     */
    async getAll() {
        return this.repo.find();
    }

    /**
     * Get a user by ID
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    async getById(id) {
        return this.repo.findOne({ where: { id } });
    }

    /**
     * Create a new user
     * @param {Object} data
     * @returns {Promise<Object>}
     */
    async create(data) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    /**
     * Delete a user by ID
     * @param {number} id
     * @returns {Promise<void>}
     */
    async deleteById(id) {
        await this.repo.delete(id);
    }

    /**
     * Get all courses associated with a user
     * @param {number} userId
     * @returns {Promise<Array>}
     */
    async getUserCourses(userId) {
        const user = await this.repo.findOne({
            where: { id: userId },
            relations: ["courses"],
        });
        return user ? user.courses : [];
    }
}

module.exports = UserRepository;
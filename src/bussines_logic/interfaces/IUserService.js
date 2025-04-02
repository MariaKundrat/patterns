class IUserService {
    async getAllUsers() {
        throw new Error('Method not implemented');
    }

    async getUserById(id) {
        throw new Error('Method not implemented');
    }

    async createUser(userData) {
        throw new Error('Method not implemented');
    }

    async getUserCourses(userId) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserService;
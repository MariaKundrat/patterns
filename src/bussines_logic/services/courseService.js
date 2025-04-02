const IUserService = require('../interfaces/IUserService');

class UserService extends IUserService {
    constructor(userRepository, courseRepository) {
        super();
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id) {
        return await this.userRepository.findById(id);
    }

    async createUser(userData) {
        return await this.userRepository.create(userData);
    }

    async getUserCourses(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return await user.getCourses();
    }
}

module.exports = UserService;
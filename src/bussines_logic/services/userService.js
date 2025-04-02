const IUserService = require('../interfaces/IUserService');

class UserService extends IUserService {
    constructor(userRepository, courseRepository) {
        super();
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    /**
     * Get all users
     * @returns {Promise<Array>}
     */
    async getAllUsers() {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Failed to fetch users');
        }
    }

    /**
     * Get a user by ID
     * @param {number} id
     * @returns {Promise<Object>}
     */
    async getUserById(id) {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw new Error('Failed to fetch user');
        }
    }

    /**
     * Create a new user
     * @param {Object} userData
     * @returns {Promise<Object>}
     */
    async createUser(userData) {
        try {
            return await this.userRepository.create(userData);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    /**
     * Get courses associated with a user
     * @param {number} userId
     * @returns {Promise<Array>}
     */async getUserCourses(userId) {
        try {
            const user = await this.userRepository.findById(userId, {
                include: ['courses'],
            });
            if (!user) {
                throw new Error('User not found');
            } return user.courses;
        } catch (error) {
            console.error(`Error fetching courses for user with ID ${userId}:`, error);
            throw new Error('Failed to fetch user courses');
        }
    }
}

module.exports = UserService;
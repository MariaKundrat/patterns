const IUserService = require("../interfaces/IUserService");

class UserService extends IUserService {
    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async createUser(userData) {
        return this.userRepository.save(userData);
    }
}

module.exports = UserService;
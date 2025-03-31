class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        return this.userRepository.getAll();
    }

    async createUser(data) {
        return this.userRepository.create(data);
    }
}

module.exports = UserService;
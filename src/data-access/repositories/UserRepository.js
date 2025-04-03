const IUserRepository = require("../interfaces/IUserRepository");

class UserRepository extends IUserRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("User");
    }

    async save(user) {
        return this.repository.save(user);
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async findAll() {
        return this.repository.find();
    }

    async deleteById(id) {
        return this.repository.delete(id);
    }
}

module.exports = UserRepository;
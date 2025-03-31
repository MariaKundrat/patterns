const { AppDataSource } = require("../../data-source");

AppDataSource.initialize()
    .then(() => {
        console.log("DataSource ініціалізовано");
    })
    .catch((error) => {
        console.error("Помилка при ініціалізації DataSource", error);
    });

class UserRepository {
    constructor() {
        this.repo = AppDataSource.getRepository("User");
    }

    async getAll() {
        return this.repo.find();
    }

    async create(data) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }
}

module.exports = UserRepository;
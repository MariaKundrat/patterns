const IInstructorRepository = require("../interfaces/IInstructorRepository");

class InstructorRepository extends IInstructorRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Instructor");
    }

    async save(instructor) {
        return this.repository.save(instructor);
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async findAll() {
        return this.repository.find();
    }
}

module.exports = InstructorRepository;
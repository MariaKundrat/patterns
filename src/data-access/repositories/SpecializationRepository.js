const ISpecializationRepository = require("../interfaces/ISpecializationRepository");

class SpecializationRepository extends ISpecializationRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Specialization");
    }

    async save(specialization) {
        return this.repository.save(specialization);
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async findAll() {
        return this.repository.find();
    }
}

module.exports = SpecializationRepository;
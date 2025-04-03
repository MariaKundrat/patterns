const IDeadlineRepository = require("../interfaces/IDeadlineRepository");

class DeadlineRepository extends IDeadlineRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Deadline");
    }

    async save(deadline) {
        return this.repository.save(deadline);
    }

    async findByCourseId(courseId) {
        return this.repository.find({ where: { course: { id: courseId } } });
    }
}

module.exports = DeadlineRepository;
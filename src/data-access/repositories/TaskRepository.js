const ITaskRepository = require("../interfaces/ITaskRepository");

class TaskRepository extends ITaskRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Task");
    }

    async save(task) {
        return this.repository.save(task);
    }

    async findByWeekId(weekId) {
        return this.repository.find({ where: { week: { id: weekId } } });
    }
}

module.exports = TaskRepository;
class ITaskRepository {
    async save(task) { }
    async findByWeekId(weekId) { }
}

module.exports = ITaskRepository;
const IWeekRepository = require("../interfaces/IWeekRepository");

class WeekRepository extends IWeekRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Week");
    }

    async save(week) {
        return this.repository.save(week);
    }

    async findByCourseId(courseId) {
        return this.repository.find({ where: { course: { id: courseId } } });
    }
}

module.exports = WeekRepository;
const ICourseRepository = require("../interfaces/ICourseRepository");

class CourseRepository extends ICourseRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Course");
    }

    async save(course) {
        return this.repository.save(course);
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async findAll() {
        return this.repository.find();
    }

    async findBySpecialization(specializationId) {
        return this.repository.find({ where: { specialization: { id: specializationId } } });
    }

    async deleteById(id) {
        return this.repository.delete(id);
    }

    async update(id, updatedCourseData) {
        const course = await this.repository.findOneBy({ id });
        if (!course) {
            throw new Error(`Course with id ${id} not found`);
        }
        Object.assign(course, updatedCourseData);
        return this.repository.save(course);
    }
}

module.exports = CourseRepository;
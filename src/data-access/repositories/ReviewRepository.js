const IReviewRepository = require("../interfaces/IReviewRepository");

class ReviewRepository extends IReviewRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Review");
    }

    async save(review) {
        return this.repository.save(review);
    }

    async findByCourseId(courseId) {
        return this.repository.find({ where: { course: { id: courseId } } });
    }

    async findByUserId(userId) {
        return this.repository.find({ where: { user: { id: userId } } });
    }
}

module.exports = ReviewRepository;
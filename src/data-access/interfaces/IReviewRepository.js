class IReviewRepository {
    async save(review) { }
    async findByCourseId(courseId) { }
    async findByUserId(userId) { }
}

module.exports = IReviewRepository;
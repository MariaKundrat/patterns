const ISubscriptionRepository = require("../interfaces/ISubscriptionRepository");

class SubscriptionRepository extends ISubscriptionRepository {
    constructor(dataSource) {
        super();
        this.repository = dataSource.getRepository("Subscription");
    }

    async save(subscription) {
        return this.repository.save(subscription);
    }

    async findByUserId(userId) {
        return this.repository.findOne({ where: { user: { id: userId } } });
    }
}

module.exports = SubscriptionRepository;
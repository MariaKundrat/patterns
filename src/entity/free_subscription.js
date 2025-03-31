const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "FreeSubscription",
    tableName: "subscriptions",
    extends: "Subscription",
    discriminatorValue: "free",
});
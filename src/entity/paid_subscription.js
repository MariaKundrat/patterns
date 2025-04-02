const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "PaidSubscription",
    tableName: "subscriptions",
    extends: "Subscription",
    columns: {},
    discriminatorValue: "paid",
});
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "PaidSubscription",
    tableName: "paid_subscriptions",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
    },
});
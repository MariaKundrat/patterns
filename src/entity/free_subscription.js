const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "FreeSubscription",
    tableName: "free_subscriptions",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
    },
});
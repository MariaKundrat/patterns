const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Subscription",
    tableName: "subscriptions",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        type: {
            type: "varchar",
            nullable: false,
        },
    },
    discriminatorColumn: {
        name: "type",
        type: "varchar",
    },
    discriminatorValue: "base",
});
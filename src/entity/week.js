const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Week",
    tableName: "weeks",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        topic: {
            type: "varchar",
        },
    },
    relations: {
        tasks: {
            type: "one-to-many",
            target: "Task",
            inverseSide: "week",
            cascade: true,
        },
    },
});
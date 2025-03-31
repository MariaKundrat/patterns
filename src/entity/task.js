const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Task",
    tableName: "tasks",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
        },
        description: {
            type: "text",
        },
        isCompleted: {
            type: "boolean",
            default: false,
        },
    },
    relations: {
        week: {
            type: "many-to-one",
            target: "Week",
            inverseSide: "tasks",
        },
        deadline: {
            type: "many-to-one",
            target: "Deadline",
            inverseSide: "tasks",
        },
    },
});
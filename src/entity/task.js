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
            nullable: false,
        },
        description: {
            type: "text",
            nullable: true,
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
            nullable: false,
            onDelete: "CASCADE",
        },
        deadline: {
            type: "many-to-one",
            target: "Deadline",
            inverseSide: "tasks",
            nullable: true,
            onDelete: "SET NULL",
        },
    },
});
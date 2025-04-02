const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Deadline",
    tableName: "deadlines",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        dueDate: {
            type: "date",
            nullable: false,
        },
    },
    relations: {
        tasks: {
            type: "one-to-many",
            target: "Task",
            inverseSide: "deadline",
            cascade: true,
        },
        course: {
            type: "many-to-one",
            target: "Course",
            inverseSide: "deadlines",
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});
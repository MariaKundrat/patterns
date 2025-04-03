const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Week",
    tableName: "weeks",
    columns: {
        id: { primary: true, type: "int", generated: true },
        topic: { type: "varchar", nullable: false },
        tasks: { type: "text", nullable: true }
    },
    relations: {
        course: {
            type: "many-to-one",
            target: "Course",
            inverseSide: "weeks",
            onDelete: "CASCADE"
        }
    }
});
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Task",
    tableName: "tasks",
    columns: {
        id: { primary: true, type: "int", generated: true },
        title: { type: "varchar", nullable: false },
        description: { type: "text", nullable: true },
        isCompleted: { type: "boolean", default: false }
    },
});
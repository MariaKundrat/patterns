const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Deadline",
    tableName: "deadlines",
    columns: {
        id: { primary: true, type: "int", generated: true },
        dueDate: { type: "timestamp", nullable: false }
    },
});
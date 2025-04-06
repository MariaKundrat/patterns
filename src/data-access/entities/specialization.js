const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Specialization",
    tableName: "specializations",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", nullable: false },
        description: { type: "text", nullable: true }
    },
});
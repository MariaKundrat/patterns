const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Course",
    tableName: "courses",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", nullable: false },
        description: { type: "text", nullable: true },
        time: { type: "float", nullable: false },
        rating: { type: "float", nullable: false, default: 0 }
    },
});
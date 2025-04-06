const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Instructor",
    tableName: "instructors",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", nullable: false },
        bio: { type: "text", nullable: true },
        rating: { type: "float", nullable: false, default: 0 }
    },
});
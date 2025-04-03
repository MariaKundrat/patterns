const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Review",
    tableName: "reviews",
    columns: {
        id: { primary: true, type: "int", generated: true },
        rating: { type: "int", nullable: false },
        date: { type: "timestamp", nullable: false },
        text: { type: "text", nullable: false }
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "reviews",
            onDelete: "CASCADE"
        },
        course: {
            type: "many-to-one",
            target: "Course",
            inverseSide: "reviews",
            onDelete: "CASCADE"
        }
    }
});
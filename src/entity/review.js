const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Review",
    tableName: "reviews",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        rating: {
            type: "int",
            nullable: false,
        },
        date: {
            type: "date",
            nullable: false,
        },
        text: {
            type: "text",
            nullable: true,
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "reviews",
            nullable: false,
            onDelete: "CASCADE",
        },
        course: {
            type: "many-to-one",
            target: "Course",
            inverseSide: "reviews",
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});
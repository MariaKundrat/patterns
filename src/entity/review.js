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
        },
        date: {
            type: "date",
        },
        text: {
            type: "text",
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "reviews",
        },
        course: {
            type: "many-to-one",
            target: "Course",
            inverseSide: "reviews",
        },
    },
});
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Instructor",
    tableName: "instructors",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        bio: {
            type: "text",
        },
        rating: {
            type: "float",
        },
    },
    relations: {
        listOfCourses: {
            type: "many-to-many",
            target: "Course",
            inverseSide: "instructors",
        },
    },
});
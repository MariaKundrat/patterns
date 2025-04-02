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
            nullable: false,
        },
        bio: {
            type: "text",
            nullable: true,
        },
        rating: {
            type: "float",
            nullable: false,
            default: 0,
        },
    },
    relations: {
        listOfCourses: {
            type: "many-to-many",
            target: "Course",
            inverseSide: "instructors",
            joinTable: {
                name: "instructor_courses",
            },
            cascade: true,
        },
    },
});
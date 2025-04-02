const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Course",
    tableName: "courses",
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
        description: {
            type: "text",
            nullable: true,
        },
        time: {
            type: "float",
            nullable: false,
        },
        rating: {
            type: "float",
            nullable: false,
            default: 0,
        },
    },
    relations: {
        instructors: {
            type: "many-to-many",
            target: "Instructor",
            inverseSide: "listOfCourses",
            joinTable: true,
            cascade: true,
        },
        deadlines: {
            type: "one-to-many",
            target: "Deadline",
            inverseSide: "course",
            cascade: true,
        },
        reviews: {
            type: "one-to-many",
            target: "Review",
            inverseSide: "course",
            cascade: true,
        },
        users: {
            type: "many-to-many",
            target: "User",
            inverseSide: "courses",
            joinTable: {
                name: "user_courses",
            },
        },
        specialization: {
            type: "many-to-one",
            target: "Specialization",
            inverseSide: "courses",
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});
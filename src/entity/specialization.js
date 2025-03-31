const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Specialization",
    tableName: "specializations",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        description: {
            type: "text",
        },
    },
    relations: {
        courses: {
            type: "one-to-many",
            target: "Course",
            inverseSide: "specialization",
        },
    },
});
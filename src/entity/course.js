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
        },
        description: {
            type: "text",
        },
        time: {
            type: "float",
        },
        rating: {
            type: "float",
        },
    },
});
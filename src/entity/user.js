const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
        },
    },
    relations: {
        subscription: {
            type: "one-to-one",
            target: "Subscription",
            joinColumn: true,
            cascade: true,
        },
        courses: {
            type: "many-to-many",
            target: "Course",
            joinTable: true,
            cascade: true,
        },
        reviews: {
            type: "one-to-many",
            target: "Review",
            inverseSide: "user",
            cascade: true,
        },
    },
});
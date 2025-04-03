const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", nullable: false },
        email: { type: "varchar", nullable: false }
    },
    relations: {
        courses: {
            type: "many-to-many",
            target: "Course",
            inverseSide: "users",
            joinTable: {
                name: "user_courses"
            }
        },
        reviews: {
            type: "one-to-many",
            target: "Review",
            inverseSide: "user",
            cascade: true,
        },
        subscription: {
            type: "one-to-one",
            target: "Subscription",
            joinColumn: true,
            cascade: true
        }
    },
});
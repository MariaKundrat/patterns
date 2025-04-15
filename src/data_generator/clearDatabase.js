const { AppDataSource } = require("./src/data-access/data-source");
const entities = [
    "Course",
    "User",
    "Instructor",
    "Specialization",
    "Subscription",
    "Review",
    "Week",
    "Task",
    "Deadline"
];

async function clearDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Database initialized...");

        for (const entity of entities) {
            const repository = AppDataSource.getRepository(entity);
            await repository.clear();
            console.log(`Cleared table: ${entity}`);
        }

        console.log("✅ All tables are empty.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Database cleanup error:", error);
        process.exit(1);
    }
}

clearDatabase();
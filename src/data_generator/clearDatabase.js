require("reflect-metadata");
const { AppDataSource } = require("../config/data-source");

async function clearDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("✅ Database initialized.");

        const tableNames = AppDataSource.entityMetadatas.map((meta) => `"${meta.tableName}"`).join(", ");

        await AppDataSource.query(`TRUNCATE ${tableNames} CASCADE`);
        console.log(`🧹 Cleared all tables: ${tableNames}`);

        await AppDataSource.destroy();
        console.log("🔒 Database connection closed");
        process.exit(0);
    } catch (error) {
        console.error("❌ Database cleanup error:", error);
        process.exit(1);
    }
}

clearDatabase();

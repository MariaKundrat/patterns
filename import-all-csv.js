require("reflect-metadata");
const fs = require("fs");
const path = require("path");
const { AppDataSource } = require("./src/config/data-source");
const CsvDataLoader = require("./src/data-access/csv/csvDataLoader");

const directoryPath = path.join(__dirname, "src", "data_generator", "data");
const filesToImport = ["courseraData.csv"];

async function importAllCsvFiles() {
    try {
        if (!AppDataSource.isInitialized) {
            console.log("🔄 Initializing database connection...");
            await AppDataSource.initialize();
        }
        console.log("✅ Database connection initialized");

        const loader = new CsvDataLoader();

        for (const file of filesToImport) {
            const filePath = path.join(directoryPath, file);

            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️  File not found: ${file}`);
                continue;
            }

            try {
                console.log(`📥 Importing file: ${file}`);
                const data = await loader.loadData(filePath);
                console.log(`✅ Successfully imported: ${file}, ${data.length} rows`);
            } catch (error) {
                console.error(`❌ Error importing ${file}:`, error.message);
            }
        }
    } catch (error) {
        console.error("❌ Error initializing database:", error.message);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("🔒 Database connection closed");
        }
    }
}

importAllCsvFiles()
    .then(() => {
        console.log("🎉 All CSV imports completed");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Import process failed:", error);
        process.exit(1);
    });

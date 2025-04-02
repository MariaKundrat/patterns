const path = require('path');
const { initializeDatabase } = require('./utils/database-init');
const { dataImportService } = require('./business_logic/services');

const main = async () => {
    try {
        console.log('Initializing database...');
        const dbInitialized = await initializeDatabase();
        if (!dbInitialized) {
            console.error('Failed to initialize database. Exiting...');
            process.exit(1);
        }

        console.log('Importing data from CSV...');
        const csvFilePath = path.join(__dirname, '../data/courseraData.csv');
        if (!csvFilePath) {
            console.error('CSV file path is invalid. Exiting...');
            process.exit(1);
        }

        await dataImportService.importDataFromCsv(csvFilePath);

        console.log('Application initialization completed successfully.');
    } catch (error) {
        console.error('Error during application initialization:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    main().catch((error) => {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}

module.exports = { main };

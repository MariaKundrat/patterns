const { AppDataSource } = require('./data-source');
const { dataImportService } = require('./src/business_logic/services');
const { generateCsvData } = require('./src/data_generator/generator');
const path = require('path');

const main = async () => {
    try {
        console.log('Initializing database...');
        await AppDataSource.initialize();
        console.log('Database initialized successfully.');

        console.log('Generating CSV data...');
        const csvFilePath = path.join(__dirname, './data/courseraData.csv');
        const csvGenerated = await generateCsvData();
        if (!csvGenerated) {
            console.error('Failed to generate CSV data. Exiting...');
            process.exit(1);
        }

        console.log('Importing data from CSV...');
        await dataImportService.importDataFromCsv(csvFilePath);

        console.log('Application initialization completed successfully.');
    } catch (error) {
        console.error('Error during application initialization:', error);
        process.exit(1);
    }
};

main();
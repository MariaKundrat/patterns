const fs = require('fs');
const path = require('path');
const { AppDataSource } = require('./data-source');
const loadCSV = require('./src/utils/csvLoader');

const directoryPath = path.join(__dirname, './data');
const filesToImport = ['data.csv', 'users.csv'];

async function importAllFiles() {
    try {
        if (!AppDataSource.isInitialized) {
            console.log('Initializing database connection...');
            await AppDataSource.initialize();
        }
        console.log('Database connection initialized');

        for (const file of filesToImport) {
            const filePath = path.join(directoryPath, file);
            try {
                if (fs.existsSync(filePath)) {
                    console.log(`Імпортується файл: ${file}`);
                    await loadCSV(filePath);
                    console.log(`Successfully imported: ${file}`);
                } else {
                    console.log(`Файл не знайдений: ${file}`);
                }
            } catch (error) {
                console.error(`Error importing ${file}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error initializing database:', error.message);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('Database connection closed');
        }
    }
}

importAllFiles().then(() => {
    console.log('All imports completed');
    process.exit(0);
}).catch(error => {
    console.error('Import failed:', error);
    process.exit(1);
});
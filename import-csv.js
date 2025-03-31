require("reflect-metadata");
const { AppDataSource } = require("./data-source");
const loadCSV = require("./src/utils/csvLoader");

function importCsv(filePath) {
    return AppDataSource.initialize().then(() => {
        return loadCSV(filePath).then(() => {
            console.log(`Successfully imported: ${filePath}`);
        });
    });
}

module.exports = importCsv;
require("reflect-metadata");
const { AppDataSource } = require("./data-source");
const loadCSV = require("./src/utils/csvLoader");

AppDataSource.initialize().then(() => {
    loadCSV("data/data.csv").then(() => process.exit(0));
});
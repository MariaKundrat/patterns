const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

class CsvDataLoader {
    async loadData(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];

            fs.createReadStream(path.resolve(filePath))
                .pipe(csv())
                .on("data", (data) => results.push(data))
                .on("end", () => resolve(results))
                .on("error", (err) => reject(err));
        });
    }
}

module.exports = CsvDataLoader;
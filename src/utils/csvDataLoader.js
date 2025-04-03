const fs = require('fs');
const csvParser = require('csv-parser');

module.exports = {
    /**
     * Download data from the csv file.
     * @param {string} filePath
     * @returns {Promise<Array<Object>>}
     */
    loadData: async (filePath) => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    },
};
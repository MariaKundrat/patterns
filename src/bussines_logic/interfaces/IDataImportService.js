class IDataImportService {
    /**
     * Import data from a CSV file
     * @param {string} filePath
     * @returns {Promise<void>}
     */
    async importDataFromCsv(filePath) {
        throw new Error('Method not implemented');
    }
}

module.exports = IDataImportService;
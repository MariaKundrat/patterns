const path = require('path');
const { generateCsvData } = require('./data_generator/generator');
const { main } = require('./index');

const runSetup = async () => {
    try {
        console.log('Starting setup process...');

        console.log('Step 1: Generating CSV data...');
        const csvGenerated = await generateCsvData();
        if (!csvGenerated) {
            console.error('Failed to generate CSV data. Exiting...');
            process.exit(1);
        }

        console.log('Step 2: Initializing database and importing data...');
        await main();

        console.log('Setup completed successfully!');
    } catch (error) {
        console.error('Error during setup:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    runSetup().catch((error) => {
        console.error('Unhandled error during setup:', error);
        process.exit(1);
    });
}

module.exports = { runSetup };
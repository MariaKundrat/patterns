const { AppDataSource } = require('../../data-source');

const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database initialized successfully.');
        return true;
    } catch (error) {
        console.error('Error initializing database:', error);
        return false;
    }
};

module.exports = { initializeDatabase };
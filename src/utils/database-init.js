const sequelize = require('../config/database');
const models = require('../data-access/models');

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully.');

        return true;
    } catch (error) {
        console.error('Unable to initialize database:', error);
        return false;
    }
};

module.exports = { initializeDatabase };
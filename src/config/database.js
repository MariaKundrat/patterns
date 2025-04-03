const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234q',
    database: 'lab2db',
    entities: [
        require('../entity/user'),
        require('../entity/instructor'),
        require('../entity/specialization'),
        require('../entity/course'),
        require('../entity/subscription'),
        require('../entity/review'),
        require('../entity/week'),
        require('../entity/task'),
        require('../entity/deadline'),
    ],
    synchronize: true,
    logging: false,
});

module.exports = dataSource;
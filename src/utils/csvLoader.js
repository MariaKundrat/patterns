const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const CourseService = require('../business_logic/services/courseService');
const UserService = require('../business_logic/services/userService');

async function loadCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        const fileName = path.basename(filePath);

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    const courseService = new CourseService();
                    const userService = new UserService();

                    if (fileName.includes('users')) {
                        console.log('Імпортуємо користувачів...');
                        for (const row of results) {
                            await userService.createUser({
                                name: row.name,
                                description: row.description,
                                time: row.time,
                                rating: row.rating,
                            });
                        }
                        console.log(`Імпортовано ${results.length} користувачів`);
                    } else {
                        console.log('Імпортуємо курси...');
                        for (const row of results) {
                            await courseService.createCourse({
                                name: row.name,
                                description: row.description || 'Опис відсутній',
                                time: parseFloat(row.time) || 0,
                                rating: parseFloat(row.rating) || 0
                            });
                        }
                        console.log(`Імпортовано ${results.length} курсів`);
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = loadCSV;
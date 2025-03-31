const fs = require("fs");
const csv = require("csv-parser");
const courseService = require("../service/courseService");

const loadCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => {
                results.push({
                    name: data.name,
                    description: data.description,
                    time: parseFloat(data.time),
                    rating: parseFloat(data.rating),
                });
            })
            .on("end", async () => {
                for (const course of results) {
                    await courseService.createCourse(course);
                }
                console.log(`Imported ${results.length} courses`);
                resolve();
            })
            .on("error", reject);
    });
};

module.exports = loadCSV;
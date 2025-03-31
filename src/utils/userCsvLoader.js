const fs = require("fs");
const csv = require("csv-parser");

const loadUsersFromCSV = async (filePath, userService) => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => {
                results.push({
                    name: data.name,
                    email: data.email,
                });
            })
            .on("end", async () => {
                for (const user of results) {
                    await userService.createUser(user);
                }
                console.log(`Imported ${results.length} users`);
                resolve();
            })
            .on("error", reject);
    });
};

module.exports = loadUsersFromCSV;
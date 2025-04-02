const fs = require('fs');
const path = require('path');

function generateDeadlines(count) {
    let csv = "# Table: Deadline\n";
    csv += "id,dueDate\n";
    for (let i = 1; i <= count; i++) {
        let date = new Date(2025, 0, 1 + i);
        const dueDate = date.toISOString().split("T")[0];
        csv += `${i},${dueDate}\n`;
    }
    csv += "\n";
    return csv;
}

function generateTasks(count) {
    let csv = "# Table: Task\n";
    csv += "id,description\n";
    for (let i = 1; i <= count; i++) {
        csv += `${i},"Task description ${i}"\n`;
    }
    csv += "\n";
    return csv;
}

function generateWeeks(count) {
    let csv = "# Table: Week\n";
    csv += "id,description,topic,tasks\n";
    for (let i = 1; i <= count; i++) {
        csv += `${i},"Week ${i} description","Topic ${i}","Task list ${i}"\n`;
    }
    csv += "\n";
    return csv;
}

function generateCourses(count) {
    let csv = "# Table: Course\n";
    csv += "id,name,deadlineIds,instructorIds\n";
    for (let i = 1; i <= count; i++) {
        let deadlineIds = `${(i % 150) + 1}`;
        let instructorIds = `${(i % 100) + 1}`;
        csv += `${i},"Course ${i}",${deadlineIds},${instructorIds}\n`;
    }
    csv += "\n";
    return csv;
}

function generateReviews(count) {
    let csv = "# Table: Review\n";
    csv += "id,name,description,userId,rating,time,date\n";
    for (let i = 1; i <= count; i++) {
        let userId = (i % 150) + 1;
        let rating = Math.floor(Math.random() * 5) + 1;
        let time = (Math.random() * (5 - 0.5) + 0.5).toFixed(1);
        let date = new Date(2025, 5, (i % 28) + 1).toISOString().split("T")[0];
        csv += `${i},"Review ${i}","Review description ${i}",${userId},${rating},${time},${date}\n`;
    }
    csv += "\n";
    return csv;
}

function generateSpecializations(count) {
    let csv = "# Table: Specialization\n";
    csv += "id,name,type,description\n";
    const types = ["Science", "Arts", "Business", "Technology", "Mathematics"];
    for (let i = 1; i <= count; i++) {
        const type = types[i % types.length];
        csv += `${i},"Specialization ${i}",${type},"Description for specialization ${i}"\n`;
    }
    csv += "\n";
    return csv;
}

function generateSubscriptions(count) {
    let csv = "# Table: Subscription\n";
    csv += "id,name,type,description,charge\n";
    for (let i = 1; i <= count; i++) {
        const type = (i % 2 === 0) ? "Paid" : "Free";
        const charge = type === "Free" ? 0 : (Math.random() * 100 + 1).toFixed(2);
        csv += `${i},"Subscription ${i}",${type},"Description for subscription ${i}",${charge}\n`;
    }
    csv += "\n";
    return csv;
}

function generateUsers(count) {
    let csv = "# Table: User\n";
    csv += "id,name,email\n";
    for (let i = 1; i <= count; i++) {
        csv += `${i},"User ${i}","user${i}@example.com"\n`;
    }
    csv += "\n";
    return csv;
}

function generateInstructors(count) {
    let csv = "# Table: Instructor\n";
    csv += "id,name,bio,rating\n";
    for (let i = 1; i <= count; i++) {
        const rating = (Math.random() * 5).toFixed(2);
        csv += `${i},"Instructor ${i}","Bio for instructor ${i}",${rating}\n`;
    }
    csv += "\n";
    return csv;
}

function generateCSVFile() {
    let csvContent = "";
    csvContent += generateDeadlines(150);
    csvContent += generateTasks(150);
    csvContent += generateWeeks(150);
    csvContent += generateCourses(150);
    csvContent += generateReviews(150);
    csvContent += generateSpecializations(100);
    csvContent += generateSubscriptions(100);
    csvContent += generateUsers(150);
    csvContent += generateInstructors(100);

    const filePath = path.join(__dirname, "all_data.csv");
    fs.writeFileSync(filePath, csvContent, "utf8");
    console.log(`CSV файл згенеровано: ${filePath}`);
}

if (require.main === module) {
    generateCSVFile();
}

module.exports = { generateCSVFile };
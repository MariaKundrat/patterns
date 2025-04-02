const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const generateRandomUsers = (count) => {
    const users = [];
    for (let i = 1; i <= count; i++) {
        users.push({
            recordType: 'user',
            name: `User ${i}`,
            email: `user${i}@example.com`
        });
    }
    return users;
};

const generateRandomInstructors = (count) => {
    const instructors = [];
    for (let i = 1; i <= count; i++) {
        instructors.push({
            recordType: 'instructor',
            name: `Instructor ${i}`,
            bio: `This is the bio for instructor ${i}`,
            rating: (Math.random() * 5).toFixed(1)
        });
    }
    return instructors;
};

const generateRandomSpecializations = (count) => {
    const specializations = [];
    for (let i = 1; i <= count; i++) {
        specializations.push({
            recordType: 'specialization',
            name: `Specialization ${i}`,
            description: `Description for specialization ${i}`
        });
    }
    return specializations;
};

const generateRandomCourses = (count, specializationCount) => {
    const courses = [];
    for (let i = 1; i <= count; i++) {
        courses.push({
            recordType: 'course',
            name: `Course ${i}`,
            description: `Description for course ${i}`,
            time: (Math.random() * 40 + 10).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            specializationId: Math.floor(Math.random() * specializationCount) + 1
        });
    }
    return courses;
};

const generateRandomSubscriptions = (userCount) => {
    const subscriptions = [];
    for (let i = 1; i <= userCount; i++) {
        subscriptions.push({
            recordType: 'subscription',
            type: Math.random() > 0.5 ? 'free' : 'paid',
            userId: i
        });
    }
    return subscriptions;
};

const generateRandomReviews = (count, userCount, courseCount) => {
    const reviews = [];
    for (let i = 1; i <= count; i++) {
        reviews.push({
            recordType: 'review',
            rating: Math.floor(Math.random() * 5) + 1,
            text: `Review text ${i}`,
            date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            userId: Math.floor(Math.random() * userCount) + 1,
            courseId: Math.floor(Math.random() * courseCount) + 1
        });
    }
    return reviews;
};

const generateRandomWeeks = (count, courseCount) => {
    const weeks = [];
    for (let i = 1; i <= count; i++) {
        weeks.push({
            recordType: 'week',
            topic: `Topic for week ${i}`,
            tasks: `Tasks for week ${i}`,
            courseId: Math.floor(Math.random() * courseCount) + 1
        });
    }
    return weeks;
};

const generateRandomTasks = (count, weekCount) => {
    const tasks = [];
    for (let i = 1; i <= count; i++) {
        tasks.push({
            recordType: 'task',
            title: `Task ${i}`,
            description: `Description for task ${i}`,
            isCompleted: Math.random() > 0.5 ? 'true' : 'false',
            weekId: Math.floor(Math.random() * weekCount) + 1
        });
    }
    return tasks;
};

const generateRandomDeadlines = (count, courseCount) => {
    const deadlines = [];
    for (let i = 1; i <= count; i++) {
        deadlines.push({
            recordType: 'deadline',
            dueDate: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
            courseId: Math.floor(Math.random() * courseCount) + 1
        });
    }
    return deadlines;
};

const generateRandomUserCourses = (count, userCount, courseCount) => {
    const userCourses = [];
    const uniquePairs = new Set();

    for (let i = 1; i <= count; i++) {
        const userId = Math.floor(Math.random() * userCount) + 1;
        const courseId = Math.floor(Math.random() * courseCount) + 1;
        const pairKey = `${userId}-${courseId}`;

        if (uniquePairs.has(pairKey)) {
            continue;
        }

        uniquePairs.add(pairKey);
        userCourses.push({
            recordType: 'userCourse',
            userId,
            courseId
        });
    }
    return userCourses;
};

const generateCsvData = async () => {
    try {
        const userCount = 100;
        const instructorCount = 50;
        const specializationCount = 20;
        const courseCount = 200;
        const reviewCount = 300;
        const weekCount = 150;
        const taskCount = 300;
        const deadlineCount = 200;
        const userCourseCount = 300;

        const users = generateRandomUsers(userCount);
        const instructors = generateRandomInstructors(instructorCount);
        const specializations = generateRandomSpecializations(specializationCount);
        const courses = generateRandomCourses(courseCount, specializationCount);
        const subscriptions = generateRandomSubscriptions(userCount);
        const reviews = generateRandomReviews(reviewCount, userCount, courseCount);
        const weeks = generateRandomWeeks(weekCount, courseCount);
        const tasks = generateRandomTasks(taskCount, weekCount);
        const deadlines = generateRandomDeadlines(deadlineCount, courseCount);
        const userCourses = generateRandomUserCourses(userCourseCount, userCount, courseCount);

        const allData = [
            ...users,
            ...instructors,
            ...specializations,
            ...courses,
            ...subscriptions,
            ...reviews,
            ...weeks,
            ...tasks,
            ...deadlines,
            ...userCourses
        ];

        if (allData.length < 1000) {
            console.log('Generated data is less than 1000 records. Adding more reviews...');
            const additionalReviews = generateRandomReviews(1000 - allData.length, userCount, courseCount);
            allData.push(...additionalReviews);
        }

        console.log(`Total generated records: ${allData.length}`);

        const csvWriter = createObjectCsvWriter({
            path: path.join(__dirname, '../../data/courseraData.csv'),
            header: [
                { id: 'recordType', title: 'recordType' },
                { id: 'name', title: 'name' },
                { id: 'email', title: 'email' },
                { id: 'bio', title: 'bio' },
                { id: 'description', title: 'description' },
                { id: 'rating', title: 'rating' },
                { id: 'time', title: 'time' },
                { id: 'type', title: 'type' },
                { id: 'text', title: 'text' },
                { id: 'date', title: 'date' },
                { id: 'topic', title: 'topic' },
                { id: 'tasks', title: 'tasks' },
                { id: 'title', title: 'title' },
                { id: 'isCompleted', title: 'isCompleted' },
                { id: 'dueDate', title: 'dueDate' },
                { id: 'userId', title: 'userId' },
                { id: 'courseId', title: 'courseId' },
                { id: 'specializationId', title: 'specializationId' },
                { id: 'weekId', title: 'weekId' }
            ]
        });

        const dataDir = path.join(__dirname, '../../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        await csvWriter.writeRecords(allData);

        console.log(`CSV file created successfully at ${path.join(__dirname, '../../data/courseraData.csv')}`);
        return true;
    } catch (error) {
        console.error('Error generating CSV data:', error);
        return false;
    }
};

if (require.main === module) {
    generateCsvData()
        .then(() => {
            console.log('CSV generation completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

module.exports = { generateCsvData };
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const generateRandomUsers = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'user',
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`
    }));
};

const generateRandomInstructors = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'instructor',
        name: `Instructor ${i + 1}`,
        bio: `This is the bio for instructor ${i + 1}`,
        rating: (Math.random() * 5).toFixed(1)
    }));
};

const generateRandomSpecializations = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'specialization',
        name: `Specialization ${i + 1}`,
        description: `Description for specialization ${i + 1}`
    }));
};

const generateRandomCourses = (count, specializationCount) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'course',
        name: `Course ${i + 1}`,
        description: `Description for course ${i + 1}`,
        time: (Math.random() * 40 + 10).toFixed(1),
        rating: (Math.random() * 5).toFixed(1),
        specializationId: Math.floor(Math.random() * specializationCount) + 1
    }));
};

const generateRandomSubscriptions = (userCount) => {
    return Array.from({ length: userCount }, (_, i) => ({
        recordType: 'subscription',
        type: Math.random() > 0.5 ? 'free' : 'paid',
        userId: i + 1
    }));
};

const generateRandomReviews = (count, userCount, courseCount) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'review',
        rating: Math.floor(Math.random() * 5) + 1,
        text: `Review text ${i + 1}`,
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        userId: Math.floor(Math.random() * userCount) + 1,
        courseId: Math.floor(Math.random() * courseCount) + 1
    }));
};

const generateRandomWeeks = (count, courseCount) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'week',
        topic: `Topic for week ${i + 1}`,
        tasks: `Tasks for week ${i + 1}`,
        courseId: Math.floor(Math.random() * courseCount) + 1
    }));
};

const generateRandomTasks = (count, weekCount) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'task',
        title: `Task ${i + 1}`,
        description: `Description for task ${i + 1}`,
        isCompleted: Math.random() > 0.5 ? 'true' : 'false',
        weekId: Math.floor(Math.random() * weekCount) + 1
    }));
};

const generateRandomDeadlines = (count, courseCount) => {
    return Array.from({ length: count }, (_, i) => ({
        recordType: 'deadline',
        dueDate: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
        courseId: Math.floor(Math.random() * courseCount) + 1
    }));
};

const generateRandomUserCourses = (count, userCount, courseCount) => {
    const userCourses = [];
    const uniquePairs = new Set();

    while (userCourses.length < count) {
        const userId = Math.floor(Math.random() * userCount) + 1;
        const courseId = Math.floor(Math.random() * courseCount) + 1;
        const pairKey = `${userId}-${courseId}`;

        if (!uniquePairs.has(pairKey)) {
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

            const allData = [
                ...generateRandomUsers(userCount),
                ...generateRandomInstructors(instructorCount),
                ...generateRandomSpecializations(specializationCount),
                ...generateRandomCourses(courseCount, specializationCount),
                ...generateRandomSubscriptions(userCount),
                ...generateRandomReviews(reviewCount, userCount, courseCount),
                ...generateRandomWeeks(weekCount, courseCount),
                ...generateRandomTasks(taskCount, weekCount),
                ...generateRandomDeadlines(deadlineCount, courseCount),
                ...generateRandomUserCourses(userCourseCount, userCount, courseCount)
            ];

            if (allData.length < 1000) {
                console.log('Generated data is less than 1000 records. Adding more reviews...');
                allData.push(
                    ...generateRandomReviews(1000 - allData.length, userCount, courseCount)
                );
            }

            console.log(`Total generated records: ${allData.length}`);

            const dataDir = path.join(__dirname, '../../data');
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            const csvWriter = createObjectCsvWriter({
                path: path.join(dataDir, 'courseraData.csv'),
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

            console.log(`CSV file created successfully at ${path.join(dataDir, 'courseraData.csv')}`);
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

}

module.exports = { generateCsvData };
const IDataImportService = require('../interfaces/IDataImportService');
const path = require('path');

class DataImportService extends IDataImportService {
    constructor(
        csvDataLoader,
        userRepository,
        subscriptionRepository,
        freeSubscriptionRepository,
        paidSubscriptionRepository,
        instructorRepository,
        courseRepository,
        specializationRepository,
        reviewRepository,
        weekRepository,
        taskRepository,
        deadlineRepository
    ) {
        super();
        this.csvDataLoader = csvDataLoader;
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.freeSubscriptionRepository = freeSubscriptionRepository;
        this.paidSubscriptionRepository = paidSubscriptionRepository;
        this.instructorRepository = instructorRepository;
        this.courseRepository = courseRepository;
        this.specializationRepository = specializationRepository;
        this.reviewRepository = reviewRepository;
        this.weekRepository = weekRepository;
        this.taskRepository = taskRepository;
        this.deadlineRepository = deadlineRepository;
    }

    async importDataFromCsv(filePath) {
        try {
            const data = await this.csvDataLoader.loadData(filePath);

            const users = [];
            const instructors = [];
            const specializations = [];
            const courses = [];
            const subscriptions = [];
            const reviews = [];
            const weeks = [];
            const tasks = [];
            const deadlines = [];
            const userCourses = [];

            for (const record of data) {
                switch (record.recordType) {
                    case 'user':
                        users.push({
                            name: record.name,
                            email: record.email
                        });
                        break;

                    case 'instructor':
                        instructors.push({
                            name: record.name,
                            bio: record.bio,
                            rating: parseFloat(record.rating)
                        });
                        break;

                    case 'specialization':
                        specializations.push({
                            name: record.name,
                            description: record.description
                        });
                        break;

                    case 'course':
                        courses.push({
                            name: record.name,
                            description: record.description,
                            time: parseFloat(record.time),
                            rating: parseFloat(record.rating),
                            SpecializationId: parseInt(record.specializationId)
                        });
                        break;

                    case 'subscription':
                        subscriptions.push({
                            type: record.type,
                            UserId: parseInt(record.userId)
                        });
                        break;

                    case 'review':
                        reviews.push({
                            rating: parseInt(record.rating),
                            text: record.text,
                            date: new Date(record.date),
                            UserId: parseInt(record.userId),
                            CourseId: parseInt(record.courseId)
                        });
                        break;

                    case 'week':
                        weeks.push({
                            topic: record.topic,
                            tasks: record.tasks,
                            CourseId: parseInt(record.courseId)
                        });
                        break;

                    case 'task':
                        tasks.push({
                            title: record.title,
                            description: record.description,
                            isCompleted: record.isCompleted === 'true',
                            WeekId: parseInt(record.weekId)
                        });
                        break;

                    case 'deadline':
                        deadlines.push({
                            dueDate: new Date(record.dueDate),
                            CourseId: parseInt(record.courseId)
                        });
                        break;

                    case 'userCourse':
                        userCourses.push({
                            UserId: parseInt(record.userId),
                            CourseId: parseInt(record.courseId)
                        });
                        break;
                }
            }

            console.log('Importing users...');
            await this.userRepository.bulkCreate(users);

            console.log('Importing instructors...');
            await this.instructorRepository.bulkCreate(instructors);

            console.log('Importing specializations...');
            await this.specializationRepository.bulkCreate(specializations);

            console.log('Importing courses...');
            await this.courseRepository.bulkCreate(courses);

            console.log('Importing subscriptions...');
            const createdSubscriptions = await this.subscriptionRepository.bulkCreate(subscriptions);

            const freeSubscriptions = [];
            const paidSubscriptions = [];

            for (const subscription of createdSubscriptions) {
                if (subscription.type === 'free') {
                    freeSubscriptions.push({ id: subscription.id });
                } else if (subscription.type === 'paid') {
                    paidSubscriptions.push({ id: subscription.id });
                }
            }

            if (freeSubscriptions.length > 0) {
                await this.freeSubscriptionRepository.bulkCreate(freeSubscriptions);
            }

            if (paidSubscriptions.length > 0) {
                await this.paidSubscriptionRepository.bulkCreate(paidSubscriptions);
            }

            console.log('Importing reviews...');
            await this.reviewRepository.bulkCreate(reviews);

            console.log('Importing weeks...');
            await this.weekRepository.bulkCreate(weeks);

            console.log('Importing tasks...');
            await this.taskRepository.bulkCreate(tasks);

            console.log('Importing deadlines...');
            await this.deadlineRepository.bulkCreate(deadlines);

            console.log('Setting up user-course relationships...');

            const { sequelize } = require('../../config/database');
            await sequelize.query(
                `INSERT INTO "UserCourses" ("UserId", "CourseId", "createdAt", "updatedAt") 
         VALUES ${userCourses.map(uc =>
                    `(${uc.UserId}, ${uc.CourseId}, NOW(), NOW())`
                ).join(', ')}`
            );

            console.log('Data import completed successfully');
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            throw error;
        }
    }
}

module.exports = DataImportService;
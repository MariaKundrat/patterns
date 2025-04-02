const IDataImportService = require('../interfaces/IDataImportService');

class DataImportService extends IDataImportService {
    constructor(
        csvDataLoader,
        userRepository,
        subscriptionRepository,
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
        this.instructorRepository = instructorRepository;
        this.courseRepository = courseRepository;
        this.specializationRepository = specializationRepository;
        this.reviewRepository = reviewRepository;
        this.weekRepository = weekRepository;
        this.taskRepository = taskRepository;
        this.deadlineRepository = deadlineRepository;
    }

    async importDataFromCsv(filePath) {
        const { sequelize } = require('../../config/database');
        const transaction = await sequelize.transaction();

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
                            email: record.email,
                        });
                        break;

                    case 'instructor':
                        instructors.push({
                            name: record.name,
                            bio: record.bio,
                            rating: parseFloat(record.rating),
                        });
                        break;

                    case 'specialization':
                        specializations.push({
                            name: record.name,
                            description: record.description,
                        });
                        break;

                    case 'course':
                        courses.push({
                            name: record.name,
                            description: record.description,
                            time: parseFloat(record.time),
                            rating: parseFloat(record.rating),
                        });
                        break;

                    case 'subscription':
                        subscriptions.push({
                            type: record.type,
                        });
                        break;

                    case 'review':
                        reviews.push({
                            rating: parseInt(record.rating),
                            text: record.text,
                            date: new Date(record.date),
                        });
                        break;

                    case 'week':
                        weeks.push({
                            topic: record.topic,
                        });
                        break;

                    case 'task':
                        tasks.push({
                            title: record.title,
                            description: record.description,
                            isCompleted: record.isCompleted === 'true',
                        });
                        break;

                    case 'deadline':
                        deadlines.push({
                            dueDate: new Date(record.dueDate),
                        });
                        break;

                    case 'userCourse':
                        userCourses.push({
                            userId: parseInt(record.userId),
                            courseId: parseInt(record.courseId),
                        });
                        break;
                }
            }

            console.log('Importing users...');
            await this.userRepository.bulkCreate(users, { transaction });

            console.log('Importing instructors...');
            await this.instructorRepository.bulkCreate(instructors, { transaction });

            console.log('Importing specializations...');
            await this.specializationRepository.bulkCreate(specializations, { transaction });

            console.log('Importing courses...');
            await this.courseRepository.bulkCreate(courses, { transaction });

            console.log('Importing subscriptions...');
            await this.subscriptionRepository.bulkCreate(subscriptions, { transaction });

            console.log('Importing reviews...');
            await this.reviewRepository.bulkCreate(reviews, { transaction });

            console.log('Importing weeks...');
            await this.weekRepository.bulkCreate(weeks, { transaction });

            console.log('Importing tasks...');
            await this.taskRepository.bulkCreate(tasks, { transaction });

            console.log('Importing deadlines...');
            await this.deadlineRepository.bulkCreate(deadlines, { transaction });

            console.log('Setting up user-course relationships...');

            for (const userCourse of userCourses) {
                const user = await this.userRepository.findById(userCourse.userId, { transaction });
                const course = await this.courseRepository.findById(userCourse.courseId, { transaction });
                await user.addCourse(course, { transaction });
            }

            await transaction.commit();
            console.log('Data import completed successfully');

        } catch (error) {
            await transaction.rollback();
            console.error('Error importing data:', error);
            throw error;
        }
    }
}

module.exports = DataImportService;
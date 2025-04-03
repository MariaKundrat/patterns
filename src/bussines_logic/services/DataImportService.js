const { AppDataSource } = require('../../../data-source');
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
        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

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
                            specializationId: record.specializationId
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
            await queryRunner.manager.save('User', users);

            console.log('Importing instructors...');
            await queryRunner.manager.save('Instructor', instructors);

            console.log('Importing specializations...');
            await queryRunner.manager.save('Specialization', specializations);

            console.log('Importing courses...');
            await queryRunner.manager.save('Course', courses);

            console.log('Importing subscriptions...');
            await queryRunner.manager.save('Subscription', subscriptions);

            console.log('Importing reviews...');
            await queryRunner.manager.save('Review', reviews);

            console.log('Importing weeks...');
            await queryRunner.manager.save('Week', weeks);

            console.log('Importing tasks...');
            await queryRunner.manager.save('Task', tasks);

            console.log('Importing deadlines...');
            await queryRunner.manager.save('Deadline', deadlines);

            console.log('Setting up user-course relationships...');

            for (const userCourse of userCourses) {
                const user = await queryRunner.manager.findOne('User', { where: { id: userCourse.userId } });
                const course = await queryRunner.manager.findOne('Course', { where: { id: userCourse.courseId } });
                user.courses = [...(user.courses || []), course];
                await queryRunner.manager.save('User', user);
            }

            await queryRunner.commitTransaction();
            console.log('Data import completed successfully');

        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error importing data:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}

module.exports = DataImportService;
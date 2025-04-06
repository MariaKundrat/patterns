const IDataImportService = require("../interfaces/IDataImportService");

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
                case "user":
                    if (record.name && record.email) {
                        users.push({ name: record.name, email: record.email });
                    } else {
                        console.warn(`⚠️ Skipping invalid user record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "instructor":
                    if (record.name && record.bio && !isNaN(parseFloat(record.rating))) {
                        instructors.push({
                            name: record.name,
                            bio: record.bio,
                            rating: parseFloat(record.rating)
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid instructor record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "specialization":
                    if (!isNaN(parseInt(record.specializationId)) && record.name && record.description) {
                        specializations.push({
                            id: parseInt(record.specializationId),
                            name: record.name,
                            description: record.description
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid specialization record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "course":
                    const specializationId = parseInt(record.specializationId);
                    if (record.name && !isNaN(specializationId) && !isNaN(parseFloat(record.time)) && !isNaN(parseFloat(record.rating))) {
                        courses.push({
                            name: record.name,
                            description: record.description,
                            time: parseFloat(record.time),
                            rating: parseFloat(record.rating),
                            specialization: { id: specializationId },
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid course record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "subscription":
                    if (record.type === "free" || record.type === "paid") {
                        subscriptions.push({ type: record.type });
                    } else {
                        console.warn(`⚠️ Skipping invalid subscription record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "review":
                    const reviewUserId = parseInt(record.userId);
                    const reviewCourseId = parseInt(record.courseId);
                    if (
                        !isNaN(parseInt(record.rating)) &&
                        record.text &&
                        !isNaN(Date.parse(record.date)) &&
                        !isNaN(reviewUserId) &&
                        !isNaN(reviewCourseId)
                    ) {
                        reviews.push({
                            rating: parseInt(record.rating),
                            text: record.text,
                            date: new Date(record.date),
                            user: { id: reviewUserId },
                            course: { id: reviewCourseId }
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid review record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "week":
                    const weekCourseId = parseInt(record.courseId);
                    if (record.topic && record.tasks && !isNaN(weekCourseId)) {
                        weeks.push({
                            topic: record.topic,
                            tasks: record.tasks,
                            course: { id: weekCourseId }
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid week record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "task":
                    const taskWeekId = parseInt(record.weekId);
                    if (record.title && record.description && !isNaN(taskWeekId)) {
                        tasks.push({
                            title: record.title,
                            description: record.description,
                            isCompleted: record.isCompleted === "true",
                            week: { id: taskWeekId }
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid task record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "deadline":
                    const deadlineCourseId = parseInt(record.courseId);
                    if (!isNaN(Date.parse(record.dueDate)) && !isNaN(deadlineCourseId)) {
                        deadlines.push({
                            dueDate: new Date(record.dueDate),
                            course: { id: deadlineCourseId }
                        });
                    } else {
                        console.warn(`⚠️ Skipping invalid deadline record: ${JSON.stringify(record)}`);
                    }
                    break;
                case "userCourse":
                    const userId = parseInt(record.userId);
                    const courseId = parseInt(record.courseId);
                    if (!isNaN(userId) && !isNaN(courseId)) {
                        userCourses.push({ userId, courseId });
                    } else {
                        console.warn(`⚠️ Skipping invalid userCourse record: ${JSON.stringify(record)}`);
                    }
                    break;

                default:
                    console.warn(`⚠️ Unknown recordType: ${record.recordType}`);

                    for (const specialization of specializations) {
                        if (!isNaN(specialization.id)) {
                            const existingSpecialization = await this.specializationRepository.findById(specialization.id);
                            if (!existingSpecialization) {
                                await this.specializationRepository.save(specialization);
                            }
                        } else {
                            console.warn(`⚠️ Skipping specialization with invalid ID: ${specialization.id}`);
                        }
                    }
            }
        }

        await this.specializationRepository.save(specializations);
        await this.instructorRepository.save(instructors);
        await this.userRepository.save(users);
        await this.courseRepository.save(courses);
        await this.subscriptionRepository.save(subscriptions);
        await this.reviewRepository.save(reviews);
        await this.weekRepository.save(weeks);
        await this.taskRepository.save(tasks);
        await this.deadlineRepository.save(deadlines);

        for (const uc of userCourses) {
            const user = await this.userRepository.findById(uc.userId);
            const course = await this.courseRepository.findById(uc.courseId);
            if (user && course) {
                user.courses = [...(user.courses || []), course];
                await this.userRepository.save(user);
            }
        }
    }
}

module.exports = DataImportService;
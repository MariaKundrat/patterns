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
                    users.push({ name: record.name, email: record.email });
                    break;
                case "instructor":
                    instructors.push({ name: record.name, bio: record.bio, rating: parseFloat(record.rating) });
                    break;
                case "specialization":
                    specializations.push({ id: parseInt(record.specializationId), name: record.name, description: record.description });
                    break;
                case "course":
                    const specializationId = parseInt(record.specializationId);
                    if (!isNaN(specializationId)) {
                        courses.push({
                            name: record.name,
                            description: record.description,
                            time: parseFloat(record.time),
                            rating: parseFloat(record.rating),
                            specialization: { id: specializationId },
                        });
                    } else {
                        console.warn(`⚠️ Skipping course with invalid specialization ID: ${record.specializationId}`);
                    }
                    break;
                case "subscription":
                    subscriptions.push({ type: record.type });
                    break;
                case "review":
                    reviews.push({
                        rating: parseInt(record.rating),
                        text: record.text,
                        date: new Date(record.date),
                        user: { id: parseInt(record.userId) },
                        course: { id: parseInt(record.courseId) }
                    });
                    break;
                case "week":
                    weeks.push({ topic: record.topic, tasks: record.tasks, course: { id: parseInt(record.courseId) } });
                    break;
                case "task":
                    tasks.push({
                        title: record.title,
                        description: record.description,
                        isCompleted: record.isCompleted === "true",
                        week: { id: parseInt(record.weekId) }
                    });
                    break;
                case "deadline":
                    deadlines.push({
                        dueDate: new Date(record.dueDate),
                        course: { id: parseInt(record.courseId) }
                    });
                    break;
                case "userCourse":
                    userCourses.push({ userId: parseInt(record.userId), courseId: parseInt(record.courseId) });

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

        await this.userRepository.save(users);
        await this.subscriptionRepository.save(subscriptions);
        await this.instructorRepository.save(instructors);
        await this.specializationRepository.save(specializations);
        await this.courseRepository.save(courses);
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
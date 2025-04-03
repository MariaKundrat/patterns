require("dotenv").config();
const path = require("path");
const { AppDataSource } = require("./src/config/data-source");

const CsvDataLoader = require("./src/data-access/csv/csvDataLoader");

const UserRepository = require("./src/data-access/repositories/UserRepository");
const SubscriptionRepository = require("./src/data-access/repositories/SubscriptionRepository");
const InstructorRepository = require("./src/data-access/repositories/InstructorRepository");
const CourseRepository = require("./src/data-access/repositories/CourseRepository");
const SpecializationRepository = require("./src/data-access/repositories/SpecializationRepository");
const ReviewRepository = require("./src/data-access/repositories/ReviewRepository");
const WeekRepository = require("./src/data-access/repositories/WeekRepository");
const TaskRepository = require("./src/data-access/repositories/TaskRepository");
const DeadlineRepository = require("./src/data-access/repositories/DeadlineRepository");

const DataImportService = require("./src/business_logic/services/DataImportService");

AppDataSource.initialize()
    .then(async () => {
        console.log("✅ Database connected");

        const csvPath = path.join(__dirname, "./src/data_generator/data/courseraData.csv");


        const dataImportService = new DataImportService(
            new CsvDataLoader(),
            new UserRepository(AppDataSource),
            new SubscriptionRepository(AppDataSource),
            new InstructorRepository(AppDataSource),
            new CourseRepository(AppDataSource),
            new SpecializationRepository(AppDataSource),
            new ReviewRepository(AppDataSource),
            new WeekRepository(AppDataSource),
            new TaskRepository(AppDataSource),
            new DeadlineRepository(AppDataSource)
        );

        await dataImportService.importDataFromCsv(csvPath);
        console.log("✅ Data import complete");
    })
    .catch((err) => {
        console.error("❌ Failed to initialize database:", err);
    });
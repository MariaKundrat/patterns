require("dotenv").config();
require("reflect-metadata");

const { AppDataSource } = require("./data-source");
const loadUsersFromCSV = require("./src/utils/userCsvLoader");

const UserRepository = require("./src/repository/userRepository");
const UserService = require("./src/bussines_logic/services/userService");

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

AppDataSource.initialize().then(() => {
    loadUsersFromCSV("data/users.csv", userService).then(() => process.exit(0));
});
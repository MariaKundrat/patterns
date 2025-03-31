const express = require("express");
const router = express.Router();

class UserController {
    constructor(userService) {
        this.userService = userService;

        router.get("/", this.getAll.bind(this));
        router.post("/", this.create.bind(this));
    }

    async getAll(req, res) {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async create(req, res) {
        const newUser = await this.userService.createUser(req.body);
        res.status(201).json(newUser);
    }

    getRouter() {
        return router;
    }
}

module.exports = UserController;